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
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    }
    return middleware(req, next);
  };
}
