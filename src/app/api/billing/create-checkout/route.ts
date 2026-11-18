import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { PLAN_PRICING, PlanTier } from '@/lib/payments/gateway';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase configuration missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20' as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, storeId, currency = 'USD' } = body as {
      plan: PlanTier;
      storeId: string;
      currency?: 'USD' | 'INR';
    };

    if (!plan || !PLAN_PRICING[plan]) {
      return NextResponse.json({ error: 'Invalid or missing plan' }, { status: 400 });
    }

    if (!storeId) {
      return NextResponse.json({ error: 'Missing storeId' }, { status: 400 });
    }

    const planInfo = PLAN_PRICING[plan];
    const supabase = getSupabaseAdmin();

    // Fetch store to get associated user_id and shop domain
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id, user_id, shop_domain')
      .eq('id', storeId)
      .single();

    if (storeError || !store) {
      return NextResponse.json(
        { error: 'Store not found or inaccessible', details: storeError?.message },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (currency === 'INR') {
      const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
      const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

      if (!razorpayKeyId || !razorpaySecret) {
        return NextResponse.json(
          { error: 'Razorpay credentials not configured' },
          { status: 500 }
        );
      }

      const basicAuth = Buffer.from(`${razorpayKeyId}:${razorpaySecret}`).toString('base64');
      const orderPayload = {
        amount: planInfo.inrPaise,
        currency: 'INR',
        receipt: `sl_${store.id.substring(0, 8)}_${Date.now()}`,
        notes: {
          store_id: storeId,
          plan_tier: plan,
          user_id: store.user_id,
        },
      };

      const rzResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!rzResponse.ok) {
        const errText = await rzResponse.text();
        return NextResponse.json(
          { error: 'Razorpay order creation failed', details: errText },
          { status: 502 }
        );
      }

      const rzOrder = await rzResponse.json();

      // Record pending order in database
      await supabase.from('orders').insert({
        user_id: store.user_id,
        store_id: storeId,
        provider: 'razorpay',
        provider_order_id: rzOrder.id,
        plan_tier: plan,
        amount: planInfo.inrPaise / 100,
        currency: 'INR',
        status: 'pending',
      });

      return NextResponse.json({
        orderId: rzOrder.id,
        amount: rzOrder.amount,
        currency: 'INR',
        key: razorpayKeyId,
      });
    }

    // Default to USD / Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe secret key not configured' },
        { status: 500 }
      );
    }

    const isSubscription = planInfo.mode === 'subscription';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: isSubscription ? 'subscription' : 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planInfo.name,
              description: `StoreLaunch plan for ${store.shop_domain || 'Shopify Store'}`,
            },
            unit_amount: planInfo.usdCents,
            ...(isSubscription
              ? { recurring: { interval: 'month' as const } }
              : {}),
          },
          quantity: 1,
        },
      ],
      metadata: {
        storeId,
        plan,
        userId: store.user_id,
      },
      success_url: `${appUrl}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard?payment=cancelled`,
    });

    // Record pending order in database
    await supabase.from('orders').insert({
      user_id: store.user_id,
      store_id: storeId,
      provider: 'stripe',
      provider_order_id: session.id,
      plan_tier: plan,
      amount: planInfo.usdCents / 100,
      currency: 'USD',
      status: 'pending',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Create checkout error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
