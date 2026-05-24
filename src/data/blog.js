export const blogPosts = [
  {
    slug: 'react-best-practices-2025',
    title: 'React Best Practices for Production Apps in 2025',
    excerpt:
      'Essential patterns, performance tips, and architecture decisions for building scalable React applications.',
    category: 'Web Dev',
    cover:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    date: '2025-03-15',
    readTime: '8 min read',
    author: 'Md Saif Ali',
    content: `
## Introduction

Building production-ready React applications requires more than knowing hooks and components.

## Component Architecture

Keep components small, focused, and reusable. Use composition over inheritance.

## Performance

Leverage \`React.memo\`, \`useMemo\`, and code splitting with \`React.lazy\` for optimal bundle sizes.

## State Management

Choose the right tool: Context for simple state, Zustand or Redux for complex global state.

## Conclusion

Following these practices will help you ship faster and maintain code quality long-term.
    `.trim(),
  },
  {
    slug: 'ai-chatbots-for-business',
    title: 'How AI Chatbots Transform Customer Support',
    excerpt:
      'Learn how custom GPT-powered chatbots reduce response times and improve customer satisfaction.',
    category: 'AI',
    cover:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    date: '2025-02-28',
    readTime: '6 min read',
    author: 'Md Saif Ali',
    content: `
## Why AI Chatbots?

24/7 availability, instant responses, and scalable support without hiring more staff.

## Implementation

Integrate OpenAI APIs with your knowledge base for accurate, contextual answers.

## ROI

Businesses see 30–50% reduction in support tickets within the first quarter.
    `.trim(),
  },
  {
    slug: 'healthcare-software-guide',
    title: 'Building HIPAA-Aware Healthcare Software',
    excerpt:
      'A practical guide to security, compliance, and architecture for healthcare applications.',
    category: 'Case Studies',
    cover:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop',
    date: '2025-01-20',
    readTime: '10 min read',
    author: 'Md Saif Ali',
    content: `
## Compliance First

Healthcare software demands encryption, audit logs, and access controls from day one.

## Architecture

Use secure APIs, role-based access, and regular penetration testing.

## Patient Experience

Balance security with intuitive UX for patients and healthcare staff.
    `.trim(),
  },
  {
    slug: 'vite-vs-webpack-2025',
    title: 'Why We Choose Vite Over Webpack in 2025',
    excerpt:
      'Faster dev server, smaller bundles, and better DX — here is why Vite wins for modern projects.',
    category: 'Tips & Tricks',
    cover:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
    date: '2025-01-05',
    readTime: '5 min read',
    author: 'Md Saif Ali',
    content: `
## Speed

Vite's ESM-based dev server starts in milliseconds compared to webpack's slower cold starts.

## Ecosystem

First-class React, Vue, and Svelte support with minimal configuration.

## Production Builds

Rollup-powered production builds deliver optimized, tree-shaken output.
    `.trim(),
  },
];
