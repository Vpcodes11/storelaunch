import crypto from 'crypto';

export function isValidShopDomain(shop: string): boolean {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/.test(shop);
}

export function buildShopifyOAuthUrl(shop: string, state: string): string {
  const clientId = process.env.SHOPIFY_API_KEY!;
  const scopes = process.env.SHOPIFY_SCOPES!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    state,
  });

  return `https://${shop}/admin/oauth/authorize?${params.toString()}`;
}

export function verifyShopifyQueryHmac(query: URLSearchParams): boolean {
  const hmac = query.get('hmac');
  if (!hmac) return false;

  const entries: string[] = [];
  query.forEach((value, key) => {
    if (key !== 'hmac' && key !== 'signature') {
      entries.push(`${key}=${value}`);
    }
  });
  entries.sort();
  const message = entries.join('&');

  const generated = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET!)
    .update(message)
    .digest('hex');

  const a = Buffer.from(hmac, 'utf8');
  const b = Buffer.from(generated, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function verifyShopifyWebhookHmac(rawBody: string, hmacHeader: string | null): boolean {
  if (!hmacHeader) return false;
  const generated = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET!)
    .update(rawBody, 'utf8')
    .digest('base64');

  const a = Buffer.from(hmacHeader, 'utf8');
  const b = Buffer.from(generated, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
