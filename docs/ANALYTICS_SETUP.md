# PostHog Analytics Setup Guide

This project uses [PostHog](https://posthog.com) for **cookie-free, privacy-first analytics**. No consent banner required! 🎉

## Why PostHog?

✅ **Cookie-free** - Uses in-memory persistence, no cookies stored  
✅ **Privacy-first** - GDPR compliant by default  
✅ **No consent banner needed** - No personal data tracking  
✅ **Generous free tier** - 1M events/month  
✅ **Open source** - Full transparency  
✅ **Feature-rich** - Session replay, feature flags, heatmaps

## Quick Start

### 1. Create PostHog Account

1. Go to [posthog.com/signup](https://posthog.com/signup)
2. Choose **Cloud** (US or EU region)
3. Create a new project
4. Copy your **Project API Key** (starts with `phc_`)
5. Note your region's **API Host**:
    - US: `https://us.i.posthog.com`
    - EU: `https://eu.i.posthog.com`

### 2. Add Environment Variables

**Locally** - Create `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

**Netlify/Vercel** - Add environment variables in your deployment settings:

- **Key 1**: `NEXT_PUBLIC_POSTHOG_KEY` = `phc_your_key_here`
- **Key 2**: `NEXT_PUBLIC_POSTHOG_HOST` = `https://eu.i.posthog.com` (or US endpoint)
- Redeploy after adding

### 3. Verify It Works

1. Visit your deployed site
2. Open [PostHog Dashboard](https://app.posthog.com) → **Activity** tab
3. You should see your visit appear in real-time!
4. Click around to see events tracked

## Architecture

### Initialization via Instrumentation Hook

The project uses Next.js 15's [instrumentation hook](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) for client-side initialization:

```typescript
// instrumentation-client.ts
import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/relay-p5g",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Cookie-free configuration
    persistence: "memory",
    disable_session_recording: false,
    capture_pageview: true,
    capture_pageleave: true,
    // Privacy settings
    autocapture: false // Manual tracking only
});
```

### Reverse Proxy Setup

PostHog requests are proxied through your domain to avoid ad blockers:

```typescript
// next.config.ts
async rewrites() {
    return [
        {
            source: "/relay-p5g/static/:path*",
            destination: "https://eu-assets.i.posthog.com/static/:path*"
        },
        {
            source: "/relay-p5g/:path*",
            destination: "https://eu.i.posthog.com/:path*"
        }
    ];
}
```

**Benefits:**

- Bypasses ad blockers
- Improves data accuracy
- Uses your first-party domain

## What's Tracked

Current implementation tracks:

- ✅ **Page views** - Automatic on navigation
- ✅ **Page leaves** - When users navigate away
- ✅ **Social links** - GitHub, LinkedIn, Email clicks
- ✅ **Downloads** - Resume PDF downloads
- ✅ **Scroll depth** - How far users scroll (helper available)
- ✅ **Section views** - When sections come into view (helper available)

## Cookie-Free Configuration

The implementation uses **memory persistence** - no cookies, no localStorage:

```typescript
posthog.init(key, {
    persistence: "memory", // No cookies! 🎉
    autocapture: false // Manual tracking only
});
```

**What this means:**

- ✅ No cookies stored in browser
- ✅ No localStorage used
- ✅ No cross-site tracking
- ✅ GDPR compliant by default
- ✅ No consent banner required
- ⚠️ Sessions reset on page refresh (acceptable trade-off for privacy)

## Adding Custom Events

### Option 1: Analytics Helper Functions (Recommended)

The project includes pre-built helpers in `src/lib/analytics.ts`:

```typescript
import { analytics } from "@/lib/analytics";

// Track button click
analytics.trackButtonClick("download_resume", "hero");

// Track external link
analytics.trackExternalLink("https://github.com/username", "GitHub", "contact");

// Track download
analytics.trackDownload("/documents/resume.pdf", "pdf", "experience");

// Track social media click
analytics.trackSocialClick("LinkedIn", "hero");

// Track form submission
analytics.trackFormSubmission("contact_form", "contact", true);

// Track section view
analytics.trackSectionView("about");

// Track scroll depth
analytics.trackScrollDepth(75);
```

### Option 2: Direct PostHog API

```typescript
"use client";
import posthog from "posthog-js";

<button onClick={() => posthog.capture("button_click", { button: "cta" })}>
    Click me
</button>
```

### Option 3: React Hook

```typescript
"use client";
import { usePostHog } from "posthog-js/react";

export function MyComponent() {
    const posthog = usePostHog();

    return (
        <button onClick={() => posthog.capture("custom_event")}>
            Track Event
        </button>
    );
}
```

## Real-World Usage Examples

### Example 1: Track Social Link Clicks

```tsx
// src/components/sections/Hero.tsx
import { analytics } from "@/lib/analytics";

<a href="https://github.com/username" onClick={() => analytics.trackSocialClick("GitHub", "hero")}>
    <Icon />
</a>;
```

### Example 2: Track File Downloads

```tsx
// src/components/sections/Experience.tsx
import { analytics } from "@/lib/analytics";

<a href="/documents/resume.pdf" onClick={() => analytics.trackDownload("/documents/resume.pdf", "pdf", "experience")}>
    Download Resume
</a>;
```

### Example 3: Track Contact Interactions

```tsx
// src/components/sections/Contact.tsx
import { analytics } from "@/lib/analytics";

<a href="mailto:hello@example.com" onClick={() => analytics.trackSocialClick("Email", "contact")}>
    Send Email
</a>;
```

## View Analytics Data

| Report         | Location                   | Shows                     |
| -------------- | -------------------------- | ------------------------- |
| **Real-time**  | Activity → Live Events     | Current visitors & events |
| **Insights**   | Product Analytics → Trends | Event trends over time    |
| **Dashboards** | Dashboards                 | Custom analytics views    |
| **Recordings** | Session Replay             | User session recordings   |

## Advanced Features

### Session Recording

Session recording is **enabled** by default:

```typescript
disable_session_recording: false;
```

To disable it for privacy:

```typescript
// In instrumentation-client.ts
posthog.init(key, {
    // ...
    disable_session_recording: true
});
```

### Feature Flags

```typescript
import { useFeatureFlagEnabled } from "posthog-js/react";

export function MyComponent() {
    const showNewFeature = useFeatureFlagEnabled("new-feature");

    return showNewFeature ? <NewFeature /> : <OldFeature />;
}
```

## Troubleshooting

### Analytics Not Showing Data

✅ **Check environment variables:**

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_...  # Must start with 'phc_'
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com  # Or US endpoint
```

✅ **Verify deployment environment variables** are set on Netlify/Vercel

✅ **Analytics only runs in production mode:**

- Development: Disabled by default
- Production: Enabled when `NODE_ENV === "production"`

✅ **Check browser console** for errors

✅ **Verify PostHog project** in dashboard matches your key

### Testing Locally

Analytics is disabled in development. To test locally, modify `src/lib/analytics.ts`:

```typescript
// Change this:
export const isAnalyticsEnabled = (): boolean => {
    return !!POSTHOG_KEY && process.env.NODE_ENV === "production" && typeof window !== "undefined";
};

// To this temporarily:
export const isAnalyticsEnabled = (): boolean => {
    return !!POSTHOG_KEY && typeof window !== "undefined";
};
```

**⚠️ Remember to revert before committing!**

### EU vs US Data Residency

Your setup uses **EU region** (`eu.i.posthog.com`).

To switch to US:

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

And update `next.config.ts` rewrites:

```typescript
{
    source: "/relay-p5g/:path*",
    destination: "https://us.i.posthog.com/:path*"  // Change to US
}
```

### Ad Blockers Still Blocking?

The reverse proxy setup (`/relay-p5g`) should bypass most ad blockers. If still blocked:

1. Check that rewrites are working: Visit `/relay-p5g/decide`
2. Ensure `skipTrailingSlashRedirect: true` in `next.config.ts`
3. Clear browser cache and test

## Implementation Details

### Package

```json
{
    "dependencies": {
        "posthog-js": "^1.276.0"
    }
}
```

### File Structure

```
src/lib/analytics.ts              # Analytics helpers
instrumentation-client.ts         # PostHog initialization
instrumentation.ts                # Server-side hook
next.config.ts                    # Reverse proxy setup
```

### Analytics Helper API

```typescript
// src/lib/analytics.ts
export const analytics = {
    trackButtonClick: (buttonName: string, location?: string) => void;
    trackExternalLink: (url: string, linkText?: string, location?: string) => void;
    trackDownload: (fileName: string, fileType?: string, location?: string) => void;
    trackFormSubmission: (formName: string, location?: string, success?: boolean) => void;
    trackSocialClick: (platform: string, location?: string, action?: string) => void;
    trackSectionView: (sectionName: string) => void;
    trackScrollDepth: (percentage: number) => void;
};
```

## Privacy & GDPR

### No Cookie Consent Needed

Because we use `persistence: "memory"`:

- ✅ No cookies stored
- ✅ No localStorage used
- ✅ No cross-site tracking
- ✅ GDPR compliant by default
- ✅ No consent banner required

### What PostHog Collects

- Page URLs visited
- Button clicks and custom events
- Browser type and OS
- Approximate location (IP-based, not stored permanently)
- **No personal identifying information**

### Privacy Best Practices

PostHog is configured for maximum privacy:

- ✅ Anonymous tracking only
- ✅ No autocapture (manual events only)
- ✅ Memory persistence (no storage)
- ✅ No third-party cookies
- ✅ First-party domain via reverse proxy

## Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Next.js Guide](https://posthog.com/docs/libraries/next-js)
- [PostHog JavaScript API](https://posthog.com/docs/libraries/js)
- [Next.js Instrumentation](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)
- [Privacy & GDPR](https://posthog.com/docs/privacy)

---

**Questions?** Check the [PostHog community](https://posthog.com/questions) or [documentation](https://posthog.com/docs).
