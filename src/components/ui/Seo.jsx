import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG, SITE_URL } from '../../constants/seo';

function buildAbsoluteUrl(path = '') {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export default function Seo({
  title,
  description,
  keywords,
  image,
  pathname = '',
  type = 'website',
  articlePublishedTime,
  articleModifiedTime,
  author,
  robots = 'index, follow',
}) {
  const pageTitle = title || SEO_CONFIG.defaultTitle;
  const pageDescription = description || SEO_CONFIG.defaultDescription;
  const pageKeywords = keywords || SEO_CONFIG.keywords;
  const pageAuthor = author || SEO_CONFIG.author;

  const canonicalUrl = buildAbsoluteUrl(pathname);

  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : buildAbsoluteUrl(image)
    : SEO_CONFIG.socialImage;

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Soft Tricks Code',
    legalName: 'Soft Tricks Code',
    alternateName: 'SoftTricksCode',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SEO_CONFIG.logo,
      width: 512,
      height: 512,
    },
    description:
      'Soft Tricks Code provides Web Development, AI Solutions, SaaS Development, Mobile App Development, Full Stack Engineering, Cloud Services, and Software Consulting.',
    email: SEO_CONFIG.contactEmail,
    foundingDate: '2026',
    sameAs: SEO_CONFIG.sameAs,
    founder: [
      {
        '@type': 'Person',
        name: 'Md Saif Ali',
        jobTitle: 'Founder & CEO',
        sameAs: [
          'https://www.linkedin.com/in/mdsaifali063',
          'https://github.com/MdSaifAli063',
          'https://www.youtube.com/@SoftTricksCode',
        ],
      },
      {
        '@type': 'Person',
        name: 'Ashwini T Gadad',
        jobTitle: 'Co-Founder & COO',
        sameAs: [
          'https://www.linkedin.com/in/ashwini-gadad-154844378',
        ],
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-90312-28966',
      contactType: 'customer service',
      email: SEO_CONFIG.contactEmail,
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Soft Tricks Code',
    legalName: 'Soft Tricks Code',
    url: SITE_URL,
    logo: SEO_CONFIG.logo,
    email: SEO_CONFIG.contactEmail,
    telephone: '+91-90312-28966',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    description:
      'Software Development Company providing Web Development, Mobile App Development, AI Solutions, SaaS Development and Cloud Services.',
    areaServed: 'Worldwide',
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Soft Tricks Code',
    alternateName: [
      'SoftTricksCode',
      'Soft Tricks Code Agency',
      'SoftTricksCode Studio',
      'Soft Tricks Code LLC',
    ],
    url: `${SITE_URL}/`,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: 'en-US',
  };

  const webpageLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      url: SITE_URL,
      name: SEO_CONFIG.siteName,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
    author: {
      '@type': 'Person',
      name: pageAuthor,
    },
  };

  if (articlePublishedTime) {
    webpageLd.datePublished = articlePublishedTime;
  }

  if (articleModifiedTime) {
    webpageLd.dateModified = articleModifiedTime;
  }

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalUrl} />

      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={pageAuthor} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={`${SEO_CONFIG.siteName} brand image`} />
      {imageUrl === SEO_CONFIG.socialImage && (
        <meta property="og:image:width" content="1200" />
      )}
      {imageUrl === SEO_CONFIG.socialImage && (
        <meta property="og:image:height" content="630" />
      )}
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${SEO_CONFIG.siteName} preview`} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webpageLd)}
      </script>
    </Helmet>
  );
}
