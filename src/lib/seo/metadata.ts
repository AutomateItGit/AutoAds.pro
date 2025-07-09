import type { Metadata } from 'next';
import config from '@/config';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalSlug?: string;
  ogImage?: string;
  ogUrl?: string;
  noIndex?: boolean;
}

const defaults = {
  title: `up to 50 characters | ${config.appName}`,
  description: '60 to 180 characters',
  keywords: `${config.appName}, some other keywords if needed`,
  ogImage: `https://${config.domainName}/shareMain.png`,
  ogUrl: `https://${config.domainName}/`,
};

export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonicalSlug,
  ogImage,
  ogUrl,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const finalTitle = title || defaults.title;
  const finalDescription = description || defaults.description;
  const finalOgImage = ogImage || defaults.ogImage;
  const finalOgUrl = ogUrl || defaults.ogUrl;
  const canonicalUrl = canonicalSlug 
    ? `https://${config.domainName}/${canonicalSlug}` 
    : `https://${config.domainName}/`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: keywords || defaults.keywords,
    
    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },
    
    // Open Graph
    openGraph: {
      type: 'website',
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      url: finalOgUrl,
      siteName: config.appName,
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      creator: '@marc_louvion',
      title: finalTitle,
      description: finalDescription,
      images: [finalOgImage],
    },
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}