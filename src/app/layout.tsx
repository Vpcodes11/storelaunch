import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StoreLaunch — The Visual Launch & Distribution Engine for Shopify Stores',
  description: 'Audit store readiness, discover 40+ curated distribution channels, and launch with Pinterest-level curation and ethical AI copy.',
  openGraph: {
    title: 'StoreLaunch — Launch Your Shopify Store Everywhere',
    description: '7-point readiness audit + 40 curated multi-tier launch channels for new Shopify brands.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-[#FAF7F2]">
      <body className="antialiased min-h-screen selection:bg-pinred-500 selection:text-white bg-[#FAF7F2] text-warmnoir-900">
        {children}
      </body>
    </html>
  );
}
