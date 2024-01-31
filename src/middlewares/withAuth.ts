import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

/**
 * Middleware that checks if the user is authenticated before executing the next middleware.
 * @param middleware - The next middleware to be executed.
 * @param requireAuth - An array of pathnames that require authentication. If the current pathname matches any of the values in this array, authentication is required.
 * @returns A function that takes in the request and fetch event, and executes the authentication check before calling the next middleware.
 */
const onlyAdmin = ["/admin"];
export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[],
) {
  return async function (req: NextRequest, next: NextFetchEvent) {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        // Redirect to login page
        const url = new URL("/auth/login", req.url);
        // will be used to redirect back to the current page after login
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // Check if user is admin
      if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return middleware(req, next);
  };
}
