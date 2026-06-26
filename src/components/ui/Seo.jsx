import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG, SITE_URL } from '../../constants/seo';

const buildAbsoluteUrl = (pathname) => {
  const cleanPath = pathname?.startsWith('/') ? pathname : `/${pathname || ''}`;
  return `${SITE_URL.replace(/\/$/, '')}${cleanPath}`;
};

export default function Seo({
  title,
  description,
  pathname = '/',
  image,
  keywords,
  author,
  type = 'website',
  robots = 'index, follow',
  articlePublishedTime,
  articleModifiedTime,
}) {
  const pageTitle = title?.trim() || SEO_CONFIG.defaultTitle;
  const pageDescription = description?.trim() || SEO_CONFIG.defaultDescription;
  const pageKeywords = keywords?.trim() || SEO_CONFIG.keywords;
  const pageAuthor = author?.trim() || SEO_CONFIG.author;

  const canonicalUrl = buildAbsoluteUrl(pathname);

  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : buildAbsoluteUrl(image)
    : SEO_CONFIG.socialImage;

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SoftTricksCode',
    url: SITE_URL,
    logo: SEO_CONFIG.logo,
    description:
      'Software Development, AI Solutions, Mobile App Development, SaaS Development and Cloud Services.',
    email: SEO_CONFIG.contactEmail,
    foundingDate: '2026',
    sameAs: SEO_CONFIG.sameAs,
    founder: [
      {
        '@type': 'Person',
        name: 'Md Saif Ali',
      },
      {
        '@type': 'Person',
        name: 'Ashwini T Gadad',
      },
    ],
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SoftTricksCode',
    url: SITE_URL,
    logo: SEO_CONFIG.logo,
    email: SEO_CONFIG.contactEmail,
    description:
      'Software Development Company providing Web Development, Mobile App Development, AI Solutions, SaaS Development and Cloud Services.',
    areaServed: 'Worldwide',
  };

  const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SEO_CONFIG.siteName,
  alternateName: 'SoftTricksCode',
  url: SITE_URL,
  description: SEO_CONFIG.defaultDescription,
  publisher: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    logo: {
      '@type': 'ImageObject',
      url: SEO_CONFIG.logo,
    },
  },
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
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:site_name" content="SoftTricksCode" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify([
          organizationLd,
          localBusinessLd,
          websiteLd,
          webpageLd,
        ])}
      </script>
    </Helmet>
  );
}