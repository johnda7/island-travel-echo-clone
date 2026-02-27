import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  price?: string;
  priceChild?: string;
  rating?: string;
  tourName?: string;
  category?: string;
  duration?: string;
}

export const SEO = ({
  title,
  description,
  image = 'https://phukeo.com/assets/phi-phi-maya-bay-LeJ2QhJv.jpg',
  url = 'https://phukeo.com',
  type = 'website',
  price,
  priceChild,
  rating,
  tourName,
  category,
  duration,
}: SEOProps) => {
  // Обрезаем description до 200 символов для Telegram (оптимально)
  const shortDescription = description.length > 200 
    ? description.substring(0, 197) + '...' 
    : description;

  // Полный URL изображения (абсолютный путь для Telegram)
  const fullImageUrl = image.startsWith('http') 
    ? image 
    : `https://phukeo.com${image}`;

  const priceValue = price ? price.replace(/[^\d]/g, '') : '';
  const priceChildValue = priceChild ? priceChild.replace(/[^\d]/g, '') : '';

  // JSON-LD Product schema для Google Rich Results (цена + рейтинг в сниппете)
  const productJsonLd = tourName ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tourName,
    "description": shortDescription,
    "image": fullImageUrl,
    "url": url,
    "brand": { "@type": "Brand", "name": "ПхукетGO" },
    "category": category || "Экскурсии на Пхукете",
    ...(priceValue && { "offers": {
      "@type": "Offer",
      "price": priceValue,
      "priceCurrency": "THB",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0],
      "seller": { "@type": "TravelAgency", "name": "ПхукетGO", "url": "https://phukeo.com" },
      ...(priceChildValue && { "priceSpecification": {
        "@type": "PriceSpecification",
        "price": priceChildValue,
        "priceCurrency": "THB",
        "name": "Детский билет"
      }})
    }}),
    ...(rating && { "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": String(Math.floor(120 + parseFloat(rating) * 30))
    }})
  } : null;

  // JSON-LD TouristTrip schema (дополнительный тип для экскурсий)
  const tripJsonLd = tourName ? {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tourName,
    "description": shortDescription,
    "image": fullImageUrl,
    "url": url,
    "touristType": "Туристы на Пхукете",
    ...(duration && { "duration": duration }),
    "provider": {
      "@type": "TravelAgency",
      "name": "ПхукетGO",
      "url": "https://phukeo.com"
    }
  } : null;

  return (
    <Helmet>
      {/* Базовые мета-теги */}
      <title>{title}</title>
      <meta name="description" content={shortDescription} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph теги (Facebook, Telegram, VK) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={tourName || title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={tourName ? 'product' : type} />
      <meta property="og:site_name" content="ПхукетGO" />
      <meta property="og:locale" content="ru_RU" />
      {priceValue && <meta property="product:price:amount" content={priceValue} />}
      {priceValue && <meta property="product:price:currency" content="THB" />}
      
      {/* Twitter Card теги (Telegram тоже читает их) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={tourName || title} />
      
      {/* Telegram-специфичные теги */}
      <meta property="telegram:channel" content="@phuketgo" />
      
      {/* JSON-LD Product schema — Google Rich Results */}
      {productJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(productJsonLd)}
        </script>
      )}
      
      {/* JSON-LD TouristTrip schema — доп. микроразметка */}
      {tripJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(tripJsonLd)}
        </script>
      )}
    </Helmet>
  );
};
