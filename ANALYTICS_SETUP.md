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
2. Choose **Cloud** or **Self-hosted**
3. Create a new project
4. Copy your **Project API Key** (starts with `phc_`)
5. Copy your **API Host** (usually `https://us.i.posthog.com` or `https://eu.i.posthog.com`)

### 2. Add Environment Variables

**Locally** - Create `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Netlify/Vercel** - Add environment variables:

- **Key 1**: `NEXT_PUBLIC_POSTHOG_KEY` = `phc_your_key_here`
- **Key 2**: `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com`
- Redeploy after adding

### 3. Verify It Works

1. Visit your deployed site
2. Open [PostHog Dashboard](https://app.posthog.com) → **Activity** tab
3. You should see your visit appear in real-time!
4. Click around to see events tracked

## What's Tracked

- **Page views** - Automatic
- **Button clicks** - Resume download, contact buttons
- **Social links** - GitHub, LinkedIn, Email clicks
- **Project links** - External links, live demos
- **Downloads** - Resume and paper PDFs

## Cookie-Free Configuration

The implementation uses **memory persistence** - no cookies, no localStorage:

```tsx
posthog.init("your-key", {
    persistence: "memory", // No cookies! 🎉
    capture_pageview: true,
    autocapture: false // Manual tracking only
});
```

This means:

- ✅ No cookies stored in browser
- ✅ No GDPR consent banner needed
- ✅ Privacy-friendly for visitors
- ⚠️ Sessions reset on page refresh (acceptable trade-off)

## Adding Custom Events

### Option 1: Helper Functions (Recommended)

```typescript
import { analytics } from "@/lib/analytics";

// Track button click
analytics.trackButtonClick("button_name", "section");

// Track external link
analytics.trackExternalLink("https://example.com", "Link text");

// Track download
analytics.trackDownload("filename.pdf", "pdf");
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

## View Analytics Data

| Report         | Location                   | Shows                     |
| -------------- | -------------------------- | ------------------------- |
| **Real-time**  | Activity → Live Events     | Current visitors & events |
| **Insights**   | Product Analytics → Trends | Event trends over time    |
| **Dashboards** | Dashboards                 | Custom analytics views    |
| **Recordings** | Session Replay             | User session recordings   |

## Advanced Features

### Session Recording (Optional)

To enable session replay:

```tsx
// In src/providers/posthog-provider.tsx
posthog.init(posthogKey, {
    // ...
    disable_session_recording: false // Enable recordings
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

- ✅ Check `NEXT_PUBLIC_POSTHOG_KEY` is set correctly (starts with `phc_`)
- ✅ Check `NEXT_PUBLIC_POSTHOG_HOST` matches your PostHog instance
- ✅ Verify environment variables are set on hosting platform
- ✅ Analytics only runs in production, not `npm run dev`
- ✅ Check browser console for errors
- ✅ Verify you're on the correct PostHog project

### Testing Locally

Analytics is disabled in development mode. To test locally, temporarily modify `src/providers/posthog-provider.tsx`:

```typescript
// Change this line:
if (posthogKey && process.env.NODE_ENV === "production") {

// To:
if (posthogKey) {
```

**Remember to revert before committing!**

### EU Data Residency

If you need EU data hosting, use the EU endpoint:

```bash
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

## Implementation Details

### Package Used

```json
{
    "dependencies": {
        "posthog-js": "^1.x"
    }
}
```

### PostHog Provider

```tsx
// src/providers/posthog-provider.tsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function PostHogProvider({ children }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            persistence: "memory", // Cookie-free!
            capture_pageview: true,
            autocapture: false
        });
    }, []);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
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
- Approximate location (IP-based, not stored)
- **No personal identifying information**

### Privacy Best Practices

PostHog is already configured for privacy:

- Anonymous tracking only
- No autocapture (manual events only)
- Memory persistence (no storage)
- No third-party cookies

## Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Next.js Guide](https://posthog.com/docs/libraries/next-js)
- [PostHog React API](https://posthog.com/docs/libraries/react)
- [Privacy & GDPR](https://posthog.com/docs/privacy)

---

**Questions?** Check the [PostHog community](https://posthog.com/questions) or [documentation](https://posthog.com/docs).
