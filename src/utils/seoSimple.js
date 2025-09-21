// SEO utility functions for IndoJavaTrip
// Simple utilities without external dependencies

export const getSEOCanonicalUrl = (path = '/', lang = '') => {
  const baseUrl = 'https://indojavatrip.com';
  if (typeof window !== 'undefined') {
    // Client side - use current location
    return window.location.origin + path + (lang ? `?lang=${lang}` : '');
  }
  // Server side or fallback
  return `${baseUrl}${path}${lang ? `?lang=${lang}` : ''}`;
};

export const getAlternateUrls = (path = '/') => {
  const languages = ['en', 'id', 'ja', 'ms', 'zh'];
  const baseUrl = 'https://indojavatrip.com';
  
  return languages.map(lang => ({
    hreflang: lang,
    href: `${baseUrl}${path}?lang=${lang}`
  }));
};