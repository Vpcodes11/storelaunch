import crypto from 'crypto';
import Stripe from 'stripe';

export type PlanTier = 'launch_kit' | 'dfy' | 'growth';

export const PLAN_PRICING: Record<
  PlanTier,
  { name: string; inrPaise: number; usdCents: number; mode: 'payment' | 'subscription' }
> = {
  launch_kit: { name: 'Launch Kit (One-Time)', inrPaise: 149900, usdCents: 1900, mode: 'payment' },
  dfy: { name: 'Done-For-You Launch Setup', inrPaise: 599900, usdCents: 7900, mode: 'payment' },
  growth: { name: 'Growth Monthly Plan', inrPaise: 149900, usdCents: 1900, mode: 'subscription' },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20' as any,
});

export function verifyRazorpayWebhook(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest('hex');
  const a = Buffer.from(signature, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function verifyStripeWebhook(rawBody: string, signature: string | null) {
  if (!signature) throw new Error('Missing Stripe signature');
  return stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
}
