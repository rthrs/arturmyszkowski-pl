export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // Server-side instrumentation
        // PostHog will be initialized on the client side via instrumentation-client.ts
    }
}
