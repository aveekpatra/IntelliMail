import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/initial-sync(.*)",
  "/api/aurinko/webhook(.*)",
  "/api/stripe(.*)",
  "/api/auth/callback/gmail(.*)",
  "/privacy",
  "/terms-of-service",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    (await auth()).protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
