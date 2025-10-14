import createMiddleware from "next-intl/middleware";

import { localePrefix, locales } from "./navigation";
import { AvailableLocales } from "./lib/locales";

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: AvailableLocales[0],
  localePrefix: localePrefix,
});

export default function middleware(req: any) {
  const nextPathname = req.nextUrl.pathname;

  if (/^\/(api|trpc|sitemap|studio)/.test(nextPathname)) {
    return;
  }

  // Basic Auth for dashboard routes
  const isDashboard =
    /^\/dashboard(\/.*)?$/.test(nextPathname) ||
    /^\/[^/]+\/dashboard(\/.*)?$/.test(nextPathname);

  if (isDashboard) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return new Response("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Dashboard"' },
      });
    }

    const base64Credentials = authHeader.split(" ")[1];
    let decoded = "";
    try {
      decoded = atob(base64Credentials);
    } catch {
      return new Response("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Dashboard"' },
      });
    }

    const [username, password] = decoded.split(":");

    const envUser = process.env.CRAWLER_AUTH_USER as string;
    const envPass = process.env.CRAWLER_AUTH_PASSWORD as string;

    if (!envUser || !envPass || username !== envUser || password !== envPass) {
      return new Response("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Dashboard"' },
      });
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
