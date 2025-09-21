import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getSEOCanonicalUrl, getAlternateUrls } from '../../utils/seo';

const Meta = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  locale,
  path = '/'
}) => {
  const { t, i18n } = useTranslation();
  
  const currentLanguage = i18n.language;
  const siteName = 'IndoJavaTrip';
  const defaultTitle = t('meta.defaultTitle', 'Explore Java Island - Best Travel Packages | IndoJavaTrip');
  const defaultDescription = t('meta.defaultDescription', 'Discover the beauty of Java Island with our curated travel packages. Experience culture, nature, and adventure in Indonesia.');
  const defaultKeywords = t('meta.defaultKeywords', 'java travel, indonesia tourism, java packages, borobudur, yogyakarta, jakarta, travel agency');
  const defaultImage = '/src/assets/images/logo.png';
  
  const metaTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const canonicalUrl = url || getSEOCanonicalUrl(path, currentLanguage);
  const alternateUrls = getAlternateUrls(path);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="IndoJavaTrip" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={currentLanguage} />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale || currentLanguage} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@indojavatrip" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate language links */}
      {alternateUrls.map(alt => (
        <link 
          key={alt.hreflang}
          rel="alternate" 
          hreflang={alt.hreflang} 
          href={alt.href} 
        />
      ))}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": siteName,
          "description": metaDescription,
          "url": canonicalUrl,
          "logo": metaImage,
          "sameAs": [
            "https://www.facebook.com/indojavatrip",
            "https://www.instagram.com/indojavatrip",
            "https://www.twitter.com/indojavatrip"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "ID",
            "addressRegion": "Java"
          }
        })}
      </script>
    </Helmet>
  );
};

export default Meta;