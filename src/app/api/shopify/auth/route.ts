import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { isValidShopDomain, buildShopifyOAuthUrl } from '@/lib/shopify/oauth';

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop')?.trim().toLowerCase();
  if (!shop || !isValidShopDomain(shop)) {
    return NextResponse.json(
      { error: 'Invalid shop domain. Use your-store.myshopify.com' },
      { status: 400 }
    );
  }

  const state = crypto.randomBytes(16).toString('hex');
  const authUrl = buildShopifyOAuthUrl(shop, state);

  const res = NextResponse.redirect(authUrl);
  res.cookies.set('shopify_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });
  return res;
}
