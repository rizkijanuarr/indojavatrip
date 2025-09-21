// Utility to generate dynamic sitemap based on package data
// import packages from '../data/packages.js';

export const generateSitemap = (packageData = []) => {
  const baseUrl = 'https://indojavatrip.com';
  const languages = ['en', 'id', 'ja', 'ms', 'zh'];
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/packages', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' }
  ];

  // Dynamic package pages
  const packagePages = packageData.map(pkg => ({
    url: `/package/${pkg.id || pkg.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: pkg.updatedAt || new Date().toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...packagePages];

  // Generate XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  allPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

    // Add hreflang for multi-language support (for main pages)
    if (staticPages.find(p => p.url === page.url)) {
      languages.forEach(lang => {
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${page.url}?lang=${lang}"/>`;
      });
    }

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Function to save sitemap to public folder
export const saveSitemap = (packageData = []) => {
  const sitemapContent = generateSitemap(packageData);
  
  // In a real implementation, you'd write this to public/sitemap.xml
  console.log('Generated sitemap:', sitemapContent);
  
  return sitemapContent;
};

// SEO helper functions
export const getSEOCanonicalUrl = (path, lang) => {
  const baseUrl = 'https://indojavatrip.com';
  return `${baseUrl}${path}${lang ? `?lang=${lang}` : ''}`;
};

export const getAlternateUrls = (path) => {
  const languages = ['en', 'id', 'ja', 'ms', 'zh'];
  const baseUrl = 'https://indojavatrip.com';
  
  return languages.map(lang => ({
    hreflang: lang,
    href: `${baseUrl}${path}?lang=${lang}`
  }));
};