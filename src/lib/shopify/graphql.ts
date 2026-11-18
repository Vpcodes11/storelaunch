import { decryptToken } from '@/lib/crypto';

const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

export async function shopifyGraphQL<T>(
  shopDomain: string,
  encryptedAccessToken: string,
  query: string,
  variables: Record<string, unknown> = {},
  attempt = 1
): Promise<T> {
  const accessToken = decryptToken(encryptedAccessToken);
  const endpoint = `https://${shopDomain}/admin/api/${API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 429 && attempt <= 4) {
    const retryAfter = Number(response.headers.get('Retry-After') || 2);
    await new Promise((r) => setTimeout(r, retryAfter * 1000 * attempt));
    return shopifyGraphQL<T>(shopDomain, encryptedAccessToken, query, variables, attempt + 1);
  }

  const json = await response.json();
  const isThrottled = json.errors?.some((e: any) => e.extensions?.code === 'THROTTLED');
  if (isThrottled && attempt <= 4) {
    const restoreRate = json.extensions?.cost?.throttleStatus?.restoreRate || 50;
    const waitMs = Math.ceil((250 / restoreRate) * 1000) * attempt;
    await new Promise((r) => setTimeout(r, waitMs));
    return shopifyGraphQL<T>(shopDomain, encryptedAccessToken, query, variables, attempt + 1);
  }

  if (json.errors && json.errors.length > 0) {
    throw new Error(`Shopify GraphQL Error: ${json.errors.map((e: any) => e.message).join('; ')}`);
  }

  const available = json.extensions?.cost?.throttleStatus?.currentlyAvailable;
  const restoreRate = json.extensions?.cost?.throttleStatus?.restoreRate;
  if (typeof available === 'number' && available < 150 && restoreRate) {
    await new Promise((r) => setTimeout(r, Math.ceil(((150 - available) / restoreRate) * 1000)));
  }

  return json.data as T;
}

export async function syncStoreAndProducts(shopDomain: string, encryptedToken: string) {
  const shopQuery = `
    query GetShopReadiness {
      shop {
        name
        email
        currencyCode
        primaryDomain { url }
        shopPolicies { type body }
      }
      pages(first: 25) {
        nodes { title handle bodySummary }
      }
    }
  `;

  const shopData: any = await shopifyGraphQL(shopDomain, encryptedToken, shopQuery);

  let hasFavicon = false;
  let hasOgImage = false;
  try {
    const storefrontRes = await fetch(shopData.shop.primaryDomain.url, { next: { revalidate: 0 } });
    const html = await storefrontRes.text();
    hasFavicon = /<link[^>]+rel=["'](?:shortcut )?icon["']/i.test(html);
    hasOgImage = /<meta[^>]+property=["']og:image["'][^>]+content=["']http/i.test(html);
  } catch {}

  const policies = shopData.shop.shopPolicies || [];
  const hasRefundPolicy = policies.some((p: any) => p.type === 'REFUND_POLICY' && p.body?.trim().length > 50);
  const hasShippingPolicy = policies.some((p: any) => p.type === 'SHIPPING_POLICY' && p.body?.trim().length > 50);
  const hasPrivacyPolicy = policies.some((p: any) => p.type === 'PRIVACY_POLICY' && p.body?.trim().length > 50);
  const hasContactPage = (shopData.pages?.nodes || []).some(
    (p: any) => /contact/i.test(p.handle) || /contact/i.test(p.title)
  );

  const productsQuery = `
    query GetProducts($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id title handle status descriptionHtml
          seo { title description }
          collections(first: 10) { nodes { title } }
          priceRangeV2 {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          media(first: 10) {
            nodes {
              ... on MediaImage { alt image { url } }
            }
          }
        }
      }
    }
  `;

  const allProducts: any[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const page: any = await shopifyGraphQL(shopDomain, encryptedToken, productsQuery, { cursor });
    for (const node of page.products.nodes || []) {
      const plainText = (node.descriptionHtml || '').replace(/<[^>]*>/g, ' ').trim();
      const wordCount = plainText ? plainText.split(/\s+/).length : 0;
      const images = (node.media?.nodes || [])
        .filter((m: any) => m.image?.url)
        .map((m: any) => ({ url: m.image.url, altText: m.alt || null }));

      allProducts.push({
        shopify_product_id: node.id,
        title: node.title,
        handle: node.handle,
        status: node.status,
        description_html: node.descriptionHtml || '',
        description_word_count: wordCount,
        seo_title: node.seo?.title || null,
        seo_description: node.seo?.description || null,
        collections: (node.collections?.nodes || []).map((c: any) => c.title),
        price_min: parseFloat(node.priceRangeV2?.minVariantPrice?.amount || '0'),
        price_max: parseFloat(node.priceRangeV2?.maxVariantPrice?.amount || '0'),
        currency: node.priceRangeV2?.minVariantPrice?.currencyCode || shopData.shop.currencyCode,
        images,
        has_images: images.length > 0,
        has_missing_alt: images.length > 0 && images.some((img: any) => !img.altText || img.altText.trim() === ''),
      });
    }
    hasNextPage = page.products.pageInfo.hasNextPage;
    cursor = page.products.pageInfo.endCursor;
  }

  return {
    shopInfo: {
      shop_name: shopData.shop.name,
      shop_email: shopData.shop.email,
      currency: shopData.shop.currencyCode,
      has_refund_policy: hasRefundPolicy,
      has_shipping_policy: hasShippingPolicy,
      has_privacy_policy: hasPrivacyPolicy,
      has_contact_page: hasContactPage,
      has_favicon: hasFavicon,
      has_og_image: hasOgImage,
    },
    products: allProducts,
  };
}
