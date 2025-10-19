# Artur Myszkowski - Portfolio

[![Website-Status](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Farturmyszkowski.pl)](https://arturmyszkowski.pl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Personal portfolio website showcasing professional work as a Senior Software Engineer. Built with Next.js 15, TypeScript, WebGL, and modern web technologies.

**Live**: [arturmyszkowski.pl](https://arturmyszkowski.pl)

## Features

- **Interactive 3D Backgrounds**: WebGL-powered animated scenes using React Three Fiber
- **SEO Optimized**: Complete metadata, OpenGraph images, structured data (JSON-LD), sitemap
- **Performance**: Optimized with Next.js 15, code splitting, and lazy loading
- **Responsive Design**: Mobile-first approach with smooth scroll snapping
- **Privacy-First Analytics**: PostHog integration (cookie-free, GDPR compliant)
- **Smooth Animations**: Framer Motion throughout

## Technology Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D Graphics**: React Three Fiber, Three.js
- **Animations**: Framer Motion
- **Analytics**: PostHog
- **Font**: Space Grotesk

## Development

```bash
# Install dependencies
npm install

# Run development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Run linting and formatting
npm run check
npm run fix
```

### Environment Variables

Create `.env.local` for analytics (optional):

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

See [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md) for PostHog setup.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, metadata, SEO
│   ├── page.tsx                # Main page
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   └── opengraph-image.tsx     # Dynamic OG image
├── components/
│   ├── backgrounds/            # WebGL 3D backgrounds
│   ├── sections/               # Page sections
│   ├── ui/                     # Reusable UI components
│   └── StructuredData.tsx      # JSON-LD schemas
├── constants/                  # Site configuration
├── hooks/                      # Custom React hooks
└── lib/                        # Utilities
```

## SEO Implementation

Complete SEO setup following Next.js best practices:

- ✅ Dynamic `robots.txt` and `sitemap.xml`
- ✅ OpenGraph and Twitter Card metadata
- ✅ Dynamic social sharing image (1200×630)
- ✅ JSON-LD structured data (Person, ProfilePage, WebSite schemas)
- ✅ Canonical URLs and meta robots configuration
- ✅ 40+ targeted keywords for search optimization

See [SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md) for details.

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Artur Myszkowski** • [Website](https://arturmyszkowski.pl) • [GitHub](https://github.com/rthrs) • [LinkedIn](https://linkedin.com/in/artur-myszkowski)
