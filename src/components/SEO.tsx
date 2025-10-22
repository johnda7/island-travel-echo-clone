import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  price?: string;
  rating?: string;
  tourName?: string;
}

export const SEO = ({
  title,
  description,
  image = 'https://phukeo.com/assets/phi-phi-maya-bay-LeJ2QhJv.jpg',
  url = 'https://phukeo.com',
  type = 'website',
  price,
  rating,
  tourName,
}: SEOProps) => {
  // Обрезаем description до 200 символов для Telegram (оптимально)
  const shortDescription = description.length > 200 
    ? description.substring(0, 197) + '...' 
    : description;

  // Полный URL изображения (абсолютный путь для Telegram)
  const fullImageUrl = image.startsWith('http') 
    ? image 
    : `https://phukeo.com${image}`;

  // JSON-LD структурированные данные для поисковиков
  const jsonLd = tourName ? {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": tourName,
    "description": shortDescription,
    "image": fullImageUrl,
    "url": url,
    ...(price && { "offers": {
      "@type": "Offer",
      "price": price.replace(/[^\d]/g, ''),
      "priceCurrency": "THB"
    }}),
    ...(rating && { "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "bestRating": "5"
    }})
  } : null;

  return (
    <Helmet>
      {/* Базовые мета-теги */}
      <title>{title}</title>
      <meta name="description" content={shortDescription} />
      
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
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ПхукетGO" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card теги (Telegram тоже читает их) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={tourName || title} />
      
      {/* Telegram-специфичные теги */}
      <meta property="telegram:channel" content="@phuketgo" />
      
      {/* JSON-LD структурированные данные */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
