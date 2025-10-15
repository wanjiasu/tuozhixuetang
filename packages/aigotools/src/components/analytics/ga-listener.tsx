"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * GAListener
 * Listens for route changes in Next.js App Router and sends GA4 page_view events.
 * This component assumes GA script has been injected (via <GoogleAnalytics />) and a valid gaId is configured.
 */
export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page_path = pathname || "/";
    const page_location = typeof window !== "undefined" ? window.location.href : page_path;
    const page_title = typeof document !== "undefined" ? document.title : "";

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      // GA4 recommended event for page view
      window.gtag("event", "page_view", {
        page_path,
        page_location,
        page_title,
      });
    }
  }, [pathname, searchParams]);

  // This component does not render any UI
  return null;
}