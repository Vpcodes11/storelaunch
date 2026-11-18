import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { isValidShopDomain, verifyShopifyQueryHmac } from '@/lib/shopify/oauth';
import { encryptToken } from '@/lib/crypto';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const searchParams = req.nextUrl.searchParams;

  const code = searchParams.get('code');
  const shop = searchParams.get('shop')?.trim().toLowerCase();
  const state = searchParams.get('state');

  const errorRedirect = (reason: string) => {
    console.error(`Shopify OAuth callback failed: ${reason}`);
    const url = new URL('/?error=auth_failed', req.nextUrl.origin);
    const res = NextResponse.redirect(url);
    res.cookies.delete('shopify_oauth_state');
    return res;
  };

  try {
    // 1. Validate required query params
    if (!code || !shop || !state) {
      return errorRedirect('missing_parameters');
    }

    // 2. Validate shop domain format
    if (!isValidShopDomain(shop)) {
      return errorRedirect('invalid_shop_domain');
    }

    // 3. Validate HMAC signature
    if (!verifyShopifyQueryHmac(searchParams)) {
      return errorRedirect('hmac_verification_failed');
    }

    // 4. Validate state parameter against saved cookie
    const savedState = cookieStore.get('shopify_oauth_state')?.value;
    if (!savedState || savedState !== state) {
      return errorRedirect('state_mismatch');
    }

    // 5. Exchange code for access token with Shopify
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      return errorRedirect(`token_exchange_failed: ${tokenResponse.status} ${errText}`);
    }

    const tokenData = await tokenResponse.json();
    const rawAccessToken = tokenData.access_token;
    if (!rawAccessToken) {
      return errorRedirect('missing_access_token');
    }

    // 6. Encrypt access token
    const encryptedToken = encryptToken(rawAccessToken);

    // 7. Initialize Supabase SSR client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createServerClient(supabaseUrl, supabaseServiceKey, {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore cookie set errors in Server Component/route contexts
            }
          },
        },
      });

      // Retrieve authenticated user if present
      let userId: string | null = null;
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.id) {
          userId = user.id;
        }
      } catch (e) {
        // Auth session may not be present yet
      }

      // If no active session, check for existing store user_id or first profile
      if (!userId) {
        const { data: existingStore } = await supabase
          .from('stores')
          .select('user_id')
          .eq('shop_domain', shop)
          .maybeSingle();

        if (existingStore?.user_id) {
          userId = existingStore.user_id;
        } else {
          const { data: defaultProfile } = await supabase
            .from('profiles')
            .select('id')
            .limit(1)
            .maybeSingle();
          if (defaultProfile?.id) {
            userId = defaultProfile.id;
          }
        }
      }

      // 8. Upsert store record into database
      const storePayload: Record<string, any> = {
        shop_domain: shop,
        access_token_encrypted: encryptedToken,
        installed: true,
        updated_at: new Date().toISOString(),
      };

      if (userId) {
        storePayload.user_id = userId;
      }

      const { error: upsertError } = await supabase
        .from('stores')
        .upsert(storePayload, { onConflict: 'shop_domain' });

      if (upsertError) {
        console.error('Failed to upsert store into database:', upsertError);
      }
    }

    // 9. Redirect to dashboard on success and clear state cookie
    const dashboardUrl = new URL('/dashboard', req.nextUrl.origin);
    const response = NextResponse.redirect(dashboardUrl);
    response.cookies.delete('shopify_oauth_state');
    return response;
  } catch (err) {
    return errorRedirect(`unhandled_exception: ${err instanceof Error ? err.message : String(err)}`);
  }
}
