# SEO Implementation Guide

This document outlines all SEO optimizations following Next.js 15 best practices.

## ✅ Implemented Features

### 1. **robots.txt** (`src/app/robots.ts`)

- Dynamic robots.txt generation using Next.js Metadata API
- Allows all crawlers to index the site
- Disallows `/api/` and `/_next/` directories
- References sitemap location
- **Reference**: [Next.js Robots Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)

### 2. **sitemap.xml** (`src/app/sitemap.ts`)

- Dynamic sitemap generation
- Includes all main sections with proper priorities:
    - Home page: priority 1.0
    - Featured Projects: priority 0.9
    - About/Skills sections: priority 0.8
    - Resume/Contact: priority 0.6-0.7
- Automatic `lastModified` date updates
- **Reference**: [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

### 3. **OpenGraph Image** (`src/app/opengraph-image.tsx`)

- Dynamic OG image generation using `ImageResponse` API
- 1200x630px (optimal for social sharing)
- Dark theme matching site aesthetic
- Displays name, title, and key technologies
- Automatically used by OpenGraph and Twitter Card metadata
- **Reference**: [Next.js OG Images Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)

### 4. **Enhanced Metadata** (`src/app/layout.tsx`)

#### Added/Enhanced:

- **metadataBase**: Canonical site URL
- **Enhanced title**: "Senior Software Engineer" (more specific)
- **Enhanced description**: Added technologies and specializations
- **Keywords**:
    - Added 40+ targeted keywords including:
        - Location-based: "Warsaw", "Poland"
        - Technology-specific: "WebGL", "WebAssembly", "Three.js"
        - Specializations: "Data Visualization", "Network Analysis"
        - Long-tail variations
- **Robots meta**: Configured for optimal crawling
- **Canonical URL**: Self-referencing canonical
- **OpenGraph**: Complete configuration
    - type, locale, url, siteName
    - OG image with dimensions and alt text
- **Twitter Card**: Large image card with creator handle
- **Verification**: Google Search Console verification support

### 5. **JSON-LD Structured Data** (`src/components/StructuredData.tsx`)

Implemented three schema types:

#### **Person Schema**

- Full professional profile
- Job title, education, credentials
- Social media profiles (sameAs)
- Skills and knowledge areas
- Alumni relationship with University of Warsaw

#### **ProfilePage Schema**

- Identifies the page as a personal profile
- Includes breadcrumb navigation structure
- Links to all main sections

#### **WebSite Schema**

- Site-level information
- Author and language metadata
- Site description

**Reference**: [Next.js JSON-LD Guide](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld)

## 🎯 Target Keywords Strategy

### Primary Keywords

- "Artur Myszkowski"
- "Artur Myszkowski Software Engineer"
- "Senior Software Engineer"
- "React Developer Warsaw"
- "TypeScript Developer"

### Technology Keywords

- "WebGL Developer"
- "WebAssembly Developer"
- "Three.js Developer"
- "Next.js Developer"
- "Data Visualization Developer"

### Location-Based

- "Software Engineer Warsaw"
- "Software Engineer Poland"
- "React Developer Warsaw"
- "React Developer Poland"

### Specialization Keywords

- "High-Performance Web Applications"
- "Interactive Data Visualization"
- "Network Analysis Visualization"
- "Graph Visualization"

### Educational Keywords

- "University of Warsaw"
- "MIMUW"
- "Master's Degree Computer Science"

## 📊 SEO Checklist

- ✅ Title tag (60 characters or less)
- ✅ Meta description (155-160 characters)
- ✅ Keywords (40+ relevant keywords)
- ✅ Canonical URL
- ✅ OpenGraph tags (complete)
- ✅ Twitter Card tags
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Structured data (JSON-LD)
- ✅ OG image (1200x630px)
- ✅ Alt text on images
- ✅ Semantic HTML (h1, h2, sections)
- ✅ Mobile responsive
- ✅ Fast loading (Next.js optimizations)
- ✅ HTTPS ready

## 🔍 How to Verify

### 1. Test OpenGraph Preview

- [OpenGraph.xyz](https://www.opengraph.xyz/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### 2. Test Structured Data

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 3. Test Technical SEO

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Search Console](https://search.google.com/search-console)

### 4. View Generated Files (After Build)

```bash
npm run build
# Check these URLs after deployment:
# https://arturmyszkowski.pl/robots.txt
# https://arturmyszkowski.pl/sitemap.xml
# https://arturmyszkowski.pl/opengraph-image
```

## 🚀 Next Steps

### Optional Enhancements

1. **Google Search Console Setup**
    - Add site property
    - Submit sitemap
    - Add verification code to `.env.local`:
        ```
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
        ```

2. **Google Analytics 4**
    - If needed in addition to PostHog

3. **Blog Section** (Future)
    - When adding blog posts, update sitemap dynamically
    - Add Article schema to blog posts

4. **Project Pages** (Future)
    - Individual project pages with detailed case studies
    - Add SoftwareApplication schema for projects

## 📚 References

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search/docs)
- [Open Graph Protocol](https://ogp.me/)

## 📝 Notes

- All metadata is statically generated at build time for optimal performance
- OpenGraph image is dynamically generated but cached
- Sitemap automatically updates `lastModified` dates
- Keywords are organized by category for easy maintenance
- Structured data follows Schema.org specifications
- All implementations follow Next.js 15 best practices
