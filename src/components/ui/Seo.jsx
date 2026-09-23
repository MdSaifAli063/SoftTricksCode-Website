import { useEffect } from 'react';
import { SEO_CONFIG, SITE_URL } from '../../constants/seo';

function buildAbsoluteUrl(path = '') {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function setMetaTag(attributeName, attributeValue, content) {
  if (content === undefined || content === null) return;
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  const existing = document.querySelectorAll(selector);
  if (existing.length > 0) {
    existing[0].setAttribute('content', content);
    for (let i = 1; i < existing.length; i++) {
      existing[i].remove();
    }
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute(attributeName, attributeValue);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

function setCanonicalLink(url) {
  if (!url) return;
  const canonicals = document.querySelectorAll('link[rel="canonical"]');
  if (canonicals.length > 0) {
    canonicals[0].setAttribute('href', url);
    for (let i = 1; i < canonicals.length; i++) {
      canonicals[i].remove();
    }
  } else {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
}

function setJsonLdScript(id, data) {
  if (!data) return;
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
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

  useEffect(() => {
    // 1. Manage single <title> tag
    if (pageTitle) {
      document.title = pageTitle;
    }
    const titleElements = document.querySelectorAll('head > title');
    if (titleElements.length > 1) {
      for (let i = 1; i < titleElements.length; i++) {
        titleElements[i].remove();
      }
    }

    // 2. Primary SEO meta tags (upsert & prune duplicates)
    setMetaTag('name', 'description', pageDescription);
    setMetaTag('name', 'keywords', pageKeywords);
    setMetaTag('name', 'author', pageAuthor);
    setMetaTag('name', 'robots', robots);

    if (!pathname || pathname === '/') {
      setMetaTag('name', 'msvalidate.01', '56786DEDABF2F37D95D12490E0F7DDE2');
    }

    // 3. Canonical link (upsert & prune duplicates)
    setCanonicalLink(canonicalUrl);

    // 4. Open Graph tags (upsert & prune duplicates)
    setMetaTag('property', 'og:type', type === 'article' ? 'article' : 'website');
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:image:secure_url', imageUrl);
    setMetaTag('property', 'og:image:type', 'image/png');
    setMetaTag('property', 'og:image:alt', `${SEO_CONFIG.siteName} brand image`);
    if (imageUrl === SEO_CONFIG.socialImage) {
      setMetaTag('property', 'og:image:width', '1200');
      setMetaTag('property', 'og:image:height', '630');
    }
    setMetaTag('property', 'og:site_name', SEO_CONFIG.siteName);
    setMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter Card tags (upsert & prune duplicates)
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', SEO_CONFIG.twitterHandle);
    setMetaTag('name', 'twitter:creator', SEO_CONFIG.twitterHandle);
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    setMetaTag('name', 'twitter:image', imageUrl);
    setMetaTag('name', 'twitter:image:alt', `${SEO_CONFIG.siteName} preview`);

    // 6. Structured Data (JSON-LD)
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
        telephone: '+91-83108-29379',
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
      telephone: '+91-83108-29379',
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

    setJsonLdScript('schema-org', organizationLd);
    setJsonLdScript('schema-local', localBusinessLd);
    setJsonLdScript('schema-website', websiteLd);
    setJsonLdScript('schema-webpage', webpageLd);
  }, [
    pageTitle,
    pageDescription,
    pageKeywords,
    pageAuthor,
    robots,
    pathname,
    canonicalUrl,
    imageUrl,
    type,
    articlePublishedTime,
    articleModifiedTime,
  ]);

  return null;
}
