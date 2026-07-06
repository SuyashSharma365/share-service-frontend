# DropCode Frontend

A production-ready React + TypeScript frontend for DropCode, an anonymous file and text sharing platform.

## Features

- Upload files and optional text
- Retrieve content with a 4-digit key
- File preview for images, PDF, and text
- Toast notifications and skeleton loading states
- Responsive layout with modern branding
- SEO-ready HTML and JSON-LD
- Cookie consent banner and policy pages

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- React Hook Form
- Axios
- Framer Motion
- Lucide React icons

## Setup

1. Install dependencies

```bash
npm install
```

2. Add environment variables

Create a `.env` file in the project root with:

```env
VITE_API_BASE_URL=https://YOUR_EC2_PUBLIC_IP_OR_DOMAIN
```

3. Start development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview production build

```bash
npm run preview
```

## Project Structure

- `src/components` — shared UI components
- `src/pages` — route pages
- `src/hooks` — API hooks and React Query logic
- `src/lib` — Axios API client and utilities
- `src/styles.css` — global styles and Tailwind setup
- `public` — static assets and PWA manifest

## SEO & PWA

- `index.html` includes meta tags, OG tags, Twitter card tags, canonical URL, and JSON-LD schema
- `public/manifest.json` is configured for PWA support
- `robots.txt` and `sitemap.xml` are included for search engines

## Notes

- The upload endpoint is `POST /api/upload` using multipart/form-data
- The retrieve endpoint is `GET /api/retrieve` with `object-Id` header
- If the backend returns `objectId` or `key`, the app uses whichever value is provided
- No browser alerts are used; errors appear through toast notifications
