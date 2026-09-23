import { founders } from "./founders.js";

const saif = founders.find((f) => f.id === "saif");

export const defaultAuthor = {
  name: saif?.name ?? "Md Saif Ali",
  avatar: saif?.photo ?? "/founder-saif.png",
};

export const blogPosts = [
  {
    slug: "react-best-practices-2025",
    title: "React Best Practices for Production Apps in 2025",
    excerpt:
      "Essential patterns, performance tips, and architecture decisions for building scalable React applications.",
    category: "Web Dev",
    cover:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=720&h=400&q=75",
    date: "2025-03-15",
    readTime: "8 min read",
    author: defaultAuthor.name,
    authorAvatar: defaultAuthor.avatar,
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
    slug: "ai-chatbots-for-business",
    title: "How AI Chatbots Transform Customer Support",
    excerpt:
      "Learn how custom GPT-powered chatbots reduce response times and improve customer satisfaction.",
    category: "AI",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=720&h=400&q=75",
    date: "2025-02-28",
    readTime: "6 min read",
    author: defaultAuthor.name,
    authorAvatar: defaultAuthor.avatar,
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
    slug: "healthcare-software-guide",
    title: "Building HIPAA-Aware Healthcare Software",
    excerpt:
      "A practical guide to security, compliance, and architecture for healthcare applications.",
    category: "Case Studies",
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=720&h=400&q=75",
    date: "2025-01-20",
    readTime: "10 min read",
    author: defaultAuthor.name,
    authorAvatar: defaultAuthor.avatar,
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
    slug: "vite-vs-webpack-2025",
    title: "Why We Choose Vite Over Webpack in 2025",
    excerpt:
      "Faster dev server, smaller bundles, and better DX — here is why Vite wins for modern projects.",
    category: "Tips & Tricks",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=720&h=400&q=75",
    date: "2025-01-05",
    readTime: "5 min read",
    author: defaultAuthor.name,
    authorAvatar: defaultAuthor.avatar,
    content: `
## Speed

Vite's ESM-based dev server starts in milliseconds compared to webpack's slower cold starts.

## Ecosystem

First-class React, Vue, and Svelte support with minimal configuration.

## Production Builds

Rollup-powered production builds deliver optimized, tree-shaken output.
    `.trim(),
  },
  {
    slug: "building-dailydoubt-offline-first-shop-ledger",
    title: "Building Dailydoubt: Offline-First Shop Ledger for Indian Retailers",
    excerpt:
      "How we engineered Dailydoubt to solve daily bookkeeping, automated GST tax calculations, and trilingual accounting for Indian merchants.",
    category: "Products",
    cover: "/images/products/dailydoubt.webp",
    date: "2025-02-15",
    readTime: "7 min read",
    author: defaultAuthor.name,
    authorAvatar: defaultAuthor.avatar,
    content: `
## The Challenge with Paper Bahi-Khatas

For generations, traditional Indian kirana store owners and retail merchants have tracked accounts with manual paper notebooks. These bahi-khatas are easily lost, impossible to search, and lack automatic calculations for net profits after daily home and business expenses.

## The 3-Number Ledger Philosophy

When building Dailydoubt, our product team focused on extreme simplicity. Instead of overwhelming merchants with double-entry accounting jargon, we distilled daily finances down to 3 inputs: Daily Collections, Shop Business Expenses, and Home Expenses. Dailydoubt instantly computes true daily and monthly net profit.

## Automated GST Invoicing & WhatsApp Sharing

Indian retail merchants need fast, compliant billing. We built a smart invoicing engine that splits CGST and SGST automatically, generates professional parchment invoices with sequential numbering, and lets shopkeepers send PDF receipts via WhatsApp in a single tap.

## Offline-First Architecture & Trilingual Support

Retail storefronts frequently experience network dips. Dailydoubt uses an embedded SQLite database that operates 100% offline and syncs securely when connectivity returns. Native localization in English, Hindi (हिंदी), and Kannada (ಕನ್ನಡ) ensures every merchant can onboard effortlessly.
    `.trim(),
  },
  {
    slug: "from-services-to-software-products-innovation-lab",
    title: "From Services to Software Products: Building Our In-House Lab",
    excerpt:
      "Why Soft Tricks Code invests in proprietary software products alongside client engineering, and how firsthand product ownership elevates every client project.",
    category: "Products",
    cover: "/images/products/products-lab-preview.webp",
    date: "2025-01-25",
    readTime: "6 min read",
    author: defaultAuthor.name,
    authorAvatar: defaultAuthor.avatar,
    content: `
## The Dual-Engine Engineering Model

Most digital agencies operate exclusively on client billable hours. At Soft Tricks Code, we deliberately maintain an active in-house product laboratory. This dual engine empowers our engineers to continuously explore new architectures, deploy independent tools, and maintain true production ownership.

## Moving from Delivery to Ownership

Agency projects prioritize fast delivery against sprint scopes. Building proprietary software—such as Dailydoubt and STC UI Builder—demands end-to-end accountability: user onboarding optimization, schema migrations, offline caching, database scaling, and customer support loops.

## How Product Ownership Elevates Client Solutions

When clients partner with Soft Tricks Code, they get more than developers writing code to spec. They work with engineers who run live production products. We bring practical knowledge in app store submissions, cloud cost containment, payment gateways, and conversion-focused UX to every client engagement.

## Looking Forward: Our Innovation Pipeline

Our product laboratory continues to build and incubate next-generation tools, focusing on developer productivity, merchant SaaS, and modern web builders. Dogfooding our own software ensures our engineering standards remain sharp, battle-tested, and ahead of the curve.
    `.trim(),
  },
];
