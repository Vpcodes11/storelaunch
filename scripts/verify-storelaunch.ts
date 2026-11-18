import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { encryptToken, decryptToken } from '../src/lib/crypto';
import { evaluateStoreReadiness } from '../src/lib/shopify/readiness';
import { sanitizeEthicalClaims } from '../src/lib/ai/provider';
import { verifyShopifyWebhookHmac } from '../src/lib/shopify/oauth';

process.env.ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
process.env.SHOPIFY_API_SECRET = 'test_shopify_secret_key';

console.log('Running StoreLaunch self-tests...');

const rawToken = 'shpat_live_998877665544332211';
const encrypted = encryptToken(rawToken);
assert.notEqual(encrypted, rawToken);
assert.equal(decryptToken(encrypted), rawToken);
console.log('Test 1 Passed: AES-256-GCM encryption/decryption roundtrip verified.');

const readiness = evaluateStoreReadiness(
  {
    has_refund_policy: false,
    has_shipping_policy: true,
    has_privacy_policy: true,
    has_contact_page: false,
    has_favicon: true,
    has_og_image: false,
  },
  [
    {
      title: 'Handcrafted Linen Shirt',
      description_word_count: 18,
      has_missing_alt: true,
      seo_title: null,
      has_images: false,
    },
  ]
);
assert.equal(readiness.score, 0);
assert.equal(readiness.issues.length, 7);
console.log('Test 2 Passed: 7-point Store Readiness Audit accurately flagged all 7 categories.');

assert.equal(sanitizeEthicalClaims('Crafted from 100% breathable organic cotton in India.'), true);
assert.equal(sanitizeEthicalClaims('Rated 4.9/5 stars by 10,000+ happy customers!'), false);
assert.equal(sanitizeEthicalClaims('Hurry, only 2 left in stock — selling out fast!'), false);
console.log('Test 3 Passed: Ethical AI filter blocks fake ratings, customer counts, and scarcity.');

const body = JSON.stringify({ id: 12345, domain: 'demo.myshopify.com' });
const validHmac = crypto
  .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
  .update(body, 'utf8')
  .digest('base64');

assert.equal(verifyShopifyWebhookHmac(body, validHmac), true);
assert.equal(verifyShopifyWebhookHmac(body, 'short_invalid_sig'), false);
console.log('Test 4 Passed: Webhook HMAC verifier validates authentic payloads and safely rejects malformed headers.');
