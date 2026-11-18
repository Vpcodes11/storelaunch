import { NextRequest, NextResponse } from 'next/server';
import { verifyShopifyWebhookHmac } from '@/lib/shopify/oauth';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
    const topic = req.headers.get('x-shopify-topic');
    const shopDomain = req.headers.get('x-shopify-shop-domain');

    if (!verifyShopifyWebhookHmac(rawBody, hmacHeader)) {
      return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 });
    }

    const supabase = createAdminClient();
    const payload = rawBody ? JSON.parse(rawBody) : {};

    switch (topic) {
      case 'orders/create': {
        if (!shopDomain) break;

        const { data: store } = await supabase
          .from('stores')
          .select('id')
          .eq('shop_domain', shopDomain)
          .single();

        if (!store) break;

        const landingSite = payload.landing_site || payload.referring_site || '';
        let utmSource: string | null = null;
        let utmMedium: string | null = null;
        let utmCampaign: string | null = null;

        try {
          if (landingSite.startsWith('http')) {
            const url = new URL(landingSite);
            utmSource = url.searchParams.get('utm_source');
            utmMedium = url.searchParams.get('utm_medium');
            utmCampaign = url.searchParams.get('utm_campaign');
          }
        } catch {
          // Fallback regex if URL parsing fails
          const matchSource = landingSite.match(/[?&]utm_source=([^&]+)/i);
          if (matchSource) utmSource = decodeURIComponent(matchSource[1]);
        }

        let channelId: string | null = null;
        if (utmSource) {
          const { data: channel } = await supabase
            .from('channels')
            .select('id')
            .or(`slug.eq.${utmSource.toLowerCase()},name.ilike.%${utmSource}%`)
            .limit(1)
            .single();

          if (channel) {
            channelId = channel.id;
          }
        }

        await supabase.from('attributed_orders').upsert(
          {
            store_id: store.id,
            channel_id: channelId,
            shopify_order_id: String(payload.id),
            order_name: payload.name || `#${payload.order_number}`,
            total_price: parseFloat(payload.total_price || '0'),
            currency: payload.currency || 'USD',
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            referring_site: payload.referring_site || null,
            landing_site: payload.landing_site || null,
            ordered_at: payload.created_at || new Date().toISOString(),
          },
          { onConflict: 'store_id,shopify_order_id' }
        );
        break;
      }

      case 'app/uninstalled': {
        if (!shopDomain) break;
        await supabase
          .from('stores')
          .update({
            installed: false,
            access_token_encrypted: null,
            updated_at: new Date().toISOString(),
          })
          .eq('shop_domain', shopDomain);
        break;
      }

      // Mandatory Shopify App Store GDPR webhooks
      case 'customers/data_request': {
        console.log(`[Shopify GDPR] Data request received for shop: ${shopDomain}`);
        break;
      }

      case 'customers/redact': {
        console.log(`[Shopify GDPR] Customer redact request for shop: ${shopDomain}`);
        break;
      }

      case 'shop/redact': {
        console.log(`[Shopify GDPR] Shop redact request for shop: ${shopDomain}`);
        if (shopDomain) {
          await supabase
            .from('stores')
            .update({
              installed: false,
              access_token_encrypted: null,
            })
            .eq('shop_domain', shopDomain);
        }
        break;
      }

      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error handling Shopify webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
