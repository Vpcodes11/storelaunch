export interface ReadinessIssue {
  id: string;
  category: string;
  severity: 'critical' | 'warning';
  title: string;
  description: string;
  affectedItems: string[];
}

export function evaluateStoreReadiness(
  storeMeta: {
    has_refund_policy: boolean;
    has_shipping_policy: boolean;
    has_privacy_policy: boolean;
    has_contact_page: boolean;
    has_favicon: boolean;
    has_og_image: boolean;
  },
  products: Array<{
    title: string;
    description_word_count: number;
    has_missing_alt: boolean;
    seo_title: string | null;
    has_images: boolean;
  }>
) {
  const issues: ReadinessIssue[] = [];
  let deductions = 0;

  const noImageProducts = products.filter((p) => !p.has_images).map((p) => p.title);
  if (noImageProducts.length > 0) {
    deductions += 20;
    issues.push({
      id: 'products_without_images',
      category: 'products_without_images',
      severity: 'critical',
      title: `${noImageProducts.length} product(s) have no images`,
      description: 'Google Merchant Center and Meta Shop reject products without primary images.',
      affectedItems: noImageProducts.slice(0, 10),
    });
  }

  const shortDescProducts = products
    .filter((p) => p.description_word_count < 40)
    .map((p) => `${p.title} (${p.description_word_count} words)`);
  if (shortDescProducts.length > 0) {
    deductions += 15;
    issues.push({
      id: 'short_descriptions',
      category: 'short_descriptions',
      severity: 'warning',
      title: `${shortDescProducts.length} product(s) have thin descriptions (< 40 words)`,
      description: 'Shopping feeds rely on detailed materials, sizing, and use-case copy.',
      affectedItems: shortDescProducts.slice(0, 10),
    });
  }

  const missingAltProducts = products.filter((p) => p.has_missing_alt).map((p) => p.title);
  if (missingAltProducts.length > 0) {
    deductions += 10;
    issues.push({
      id: 'missing_alt_text',
      category: 'missing_alt_text',
      severity: 'warning',
      title: `${missingAltProducts.length} product(s) have images missing alt text`,
      description: 'Alt text boosts Google Images & Pinterest discovery and accessibility.',
      affectedItems: missingAltProducts.slice(0, 10),
    });
  }

  const missingSeoProducts = products
    .filter((p) => !p.seo_title || p.seo_title.trim().length < 10)
    .map((p) => p.title);
  if (missingSeoProducts.length > 0) {
    deductions += 10;
    issues.push({
      id: 'missing_seo_titles',
      category: 'missing_seo_titles',
      severity: 'warning',
      title: `${missingSeoProducts.length} product(s) lack dedicated SEO meta titles`,
      description: 'Add descriptive 50-60 character SEO titles including your niche keyword.',
      affectedItems: missingSeoProducts.slice(0, 10),
    });
  }

  const missingPolicies: string[] = [];
  if (!storeMeta.has_refund_policy) missingPolicies.push('Refund Policy');
  if (!storeMeta.has_shipping_policy) missingPolicies.push('Shipping Policy');
  if (!storeMeta.has_privacy_policy) missingPolicies.push('Privacy Policy');
  if (missingPolicies.length > 0) {
    deductions += 20;
    issues.push({
      id: 'missing_policies',
      category: 'missing_policies',
      severity: 'critical',
      title: `Missing legal policies: ${missingPolicies.join(', ')}`,
      description: 'Shopping networks suspend accounts without visible Refund and Shipping policies.',
      affectedItems: missingPolicies,
    });
  }

  if (!storeMeta.has_contact_page) {
    deductions += 15;
    issues.push({
      id: 'missing_contact_page',
      category: 'missing_contact_page',
      severity: 'critical',
      title: 'No Contact Us page detected',
      description: 'Shoppers and reviewers require a clear Contact page.',
      affectedItems: ['/pages/contact'],
    });
  }

  const missingBrandAssets: string[] = [];
  if (!storeMeta.has_favicon) missingBrandAssets.push('Favicon');
  if (!storeMeta.has_og_image) missingBrandAssets.push('Default Social Sharing (OG) Image');
  if (missingBrandAssets.length > 0) {
    deductions += 10;
    issues.push({
      id: 'missing_favicon_og',
      category: 'missing_favicon_og',
      severity: 'warning',
      title: `Missing brand trust assets: ${missingBrandAssets.join(' & ')}`,
      description: 'Links shared on social media look unfinished without favicon and OG preview image.',
      affectedItems: missingBrandAssets,
    });
  }

  const score = Math.max(0, 100 - deductions);
  return { score, issues };
}
