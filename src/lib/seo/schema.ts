import config from '@/config';

export interface SchemaData {
  name?: string;
  description?: string;
  image?: string;
  url?: string;
  author?: {
    name: string;
    url?: string;
  };
  datePublished?: string;
  applicationCategory?: string;
  rating?: {
    ratingValue: string;
    ratingCount: string;
  };
  offers?: {
    price: string;
    priceCurrency: string;
  }[];
}

export function generateSoftwareAppSchema({
  name = config.appName,
  description = "60 to 180 characters",
  image = `https://${config.domainName}/logo.png`,
  url = `https://${config.domainName}/`,
  author = { name: "Marc Lou" },
  datePublished = "2023-08-01",
  applicationCategory = "EducationalApplication",
  rating = {
    ratingValue: "4.8",
    ratingCount: "12",
  },
  offers = [
    {
      price: "9.00",
      priceCurrency: "USD",
    },
  ],
}: SchemaData = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    image,
    url,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    datePublished,
    applicationCategory,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      ratingCount: rating.ratingCount,
    },
    offers: offers.map(offer => ({
      "@type": "Offer",
      price: offer.price,
      priceCurrency: offer.priceCurrency,
    })),
  };
}