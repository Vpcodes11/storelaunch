import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  verifyRazorpayWebhook,
  verifyStripeWebhook,
  PlanTier,
} from '@/lib/payments/gateway';

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

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const razorpaySignature = req.headers.get('x-razorpay-signature');
    const stripeSignature = req.headers.get('stripe-signature');

    const supabase = getSupabaseAdmin();

    // 1. Check for Stripe Webhook
    if (stripeSignature) {
      let event: any;
      try {
        event = verifyStripeWebhook(rawBody, stripeSignature);
      } catch (err: any) {
        console.error('Invalid Stripe signature:', err);
        return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 });
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const sessionId = session.id;
        const storeId = session.metadata?.storeId;
        const planTier = session.metadata?.plan as PlanTier;
        const paymentIntentId =
          (typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.subscription) || null;

        // Update the order record
        const { data: updatedOrder, error: orderErr } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            paid_at: new Date().toISOString(),
            provider_payment_id: paymentIntentId,
          })
          .eq('provider_order_id', sessionId)
          .select('store_id, plan_tier')
          .maybeSingle();

        if (orderErr) {
          console.error('Error updating stripe order status:', orderErr);
        }

        const targetStoreId = storeId || updatedOrder?.store_id;
        const targetPlan = planTier || updatedOrder?.plan_tier;

        if (targetStoreId && targetPlan) {
          const { error: storeErr } = await supabase
            .from('stores')
            .update({
              plan_tier: targetPlan,
              updated_at: new Date().toISOString(),
            })
            .eq('id', targetStoreId);

          if (storeErr) {
            console.error('Error updating store plan_tier:', storeErr);
          }
        }
      }

      return NextResponse.json({ received: true });
    }

    // 2. Check for Razorpay Webhook
    if (razorpaySignature) {
      const isValid = verifyRazorpayWebhook(rawBody, razorpaySignature);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid Razorpay signature' }, { status: 400 });
      }

      const event = JSON.parse(rawBody);

      if (event.event === 'payment.captured' || event.event === 'order.paid') {
        const paymentEntity = event.payload?.payment?.entity;
        const rzOrderId = paymentEntity?.order_id;
        const rzPaymentId = paymentEntity?.id;
        const noteStoreId = paymentEntity?.notes?.store_id;
        const notePlan = paymentEntity?.notes?.plan_tier as PlanTier;

        // Update order status to paid
        let query = supabase
          .from('orders')
          .update({
            status: 'paid',
            paid_at: new Date().toISOString(),
            provider_payment_id: rzPaymentId,
          });

        if (rzOrderId) {
          query = query.eq('provider_order_id', rzOrderId);
        }

        const { data: updatedOrder, error: orderErr } = await query
          .select('store_id, plan_tier')
          .maybeSingle();

        if (orderErr) {
          console.error('Error updating razorpay order status:', orderErr);
        }

        const targetStoreId = noteStoreId || updatedOrder?.store_id;
        const targetPlan = notePlan || updatedOrder?.plan_tier;

        if (targetStoreId && targetPlan) {
          const { error: storeErr } = await supabase
            .from('stores')
            .update({
              plan_tier: targetPlan,
              updated_at: new Date().toISOString(),
            })
            .eq('id', targetStoreId);

          if (storeErr) {
            console.error('Error updating store plan_tier:', storeErr);
          }
        }
      }

      return NextResponse.json({ status: 'ok' });
    }

    return NextResponse.json(
      { error: 'No recognizable webhook signature found (expected Stripe or Razorpay)' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Webhook internal error' },
      { status: 500 }
    );
  }
}
