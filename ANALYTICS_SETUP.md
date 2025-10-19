# Google Analytics 4 Setup Guide

This project uses [Next.js's official `@next/third-parties` package](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics) for optimal GA4 integration.

## Quick Start

### 1. Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon) → **Create Property**
3. Set property name (e.g., "arturmyszkowski.pl")
4. Under **Data Streams**, click **Add stream** → **Web**
5. Enter your website URL
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add Environment Variable

**Locally** - Create `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Netlify/Vercel** - Add environment variable:

- **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Value**: `G-XXXXXXXXXX`
- Redeploy after adding

### 3. Verify It Works

1. Visit your deployed site
2. Open [Google Analytics](https://analytics.google.com) → **Reports** → **Realtime**
3. You should see your visit appear!
4. Click around to see events tracked

## What's Tracked

- **Page views** - Automatic
- **Button clicks** - Resume download, contact buttons
- **Social links** - GitHub, LinkedIn, Email clicks
- **Project links** - External links, live demos
- **Downloads** - Resume and paper PDFs

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

### Option 2: Direct API

```typescript
"use client";
import { sendGAEvent } from "@next/third-parties/google";

<button onClick={() => sendGAEvent("event", "button_click", { value: "cta" })}>
    Click me
</button>
```

## View Analytics Data

| Report           | Location                      | Shows                       |
| ---------------- | ----------------------------- | --------------------------- |
| **Real-time**    | Reports → Realtime            | Current visitors & events   |
| **Page Views**   | Reports → Engagement → Pages  | Most visited pages          |
| **Events**       | Reports → Engagement → Events | All tracked interactions    |
| **Demographics** | Reports → User → Demographics | Location, devices, browsers |

## Troubleshooting

### Analytics Not Showing Data

- ✅ Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly (starts with `G-`)
- ✅ Verify environment variable is set on hosting platform
- ✅ Analytics only runs in production, not `npm run dev`
- ✅ Disable ad blockers when testing
- ✅ Check browser console for errors

### Testing Locally

Analytics is disabled in development mode. To test locally, temporarily modify `src/lib/analytics.ts`:

```typescript
export const isGAEnabled = (): boolean => {
    return !!GA_MEASUREMENT_ID; // Remove production check
};
```

**Remember to revert before committing!**

## Why @next/third-parties?

- ✅ **Official Next.js solution** - Maintained by Vercel
- ✅ **Performance optimized** - Automatic script loading strategy
- ✅ **Best practices** - Follows [Next.js recommendations](https://nextjs.org/docs/messages/next-script-for-ga)
- ✅ **Simple API** - Easy `sendGAEvent` function

## Resources

- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Sending Custom Events](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#sending-events)

---

**Privacy Note**: GA4 uses cookies. Consider adding a cookie consent banner if required by GDPR/CCPA in your jurisdiction.
