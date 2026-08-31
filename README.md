# Soft Tricks Code Website

Premium software agency website — React, Vite, Tailwind, Framer Motion, Three.js.

## Local development

```bash
npm install
npm run dev
```


## Deploy on Vercel

### 1. Push to GitHub

Create a repo and push the **`softtrickscode`** folder (this directory).

If your repo root is the parent folder (`SoftTricsCode Website`), set this in Vercel:

| Setting | Value |
|--------|--------|
| **Root Directory** | `softtrickscode` |
| **Framework Preset** | Vite (auto-detected) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

`vercel.json` in this folder already configures SPA routing for React Router.


### 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Confirm settings above, then **Deploy**

### 3. Environment variables (optional — for live forms)

In Vercel: **Project → Settings → Environment Variables**

Add the same keys as `.env.example` (enable for **Production** and **Preview**):

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_BOOKING_TEMPLATE_ID` (optional)
- `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID` (optional)

Redeploy after adding variables. Without them, forms still show success toasts but emails are not sent.

### 4. Custom domain (optional)

**Project → Settings → Domains** → add your domain and follow DNS instructions.

### 5. After deploy

Update `public/robots.txt` sitemap URL to your real domain.

## EmailJS (local)


Copy `.env.example` → `.env` and fill in keys from [emailjs.com](https://www.emailjs.com).

## Build locally


```bash
npm run build
npm run preview
```

© 2026 Soft Tricks Code — Md Saif Ali & Ashwini T Gadad
