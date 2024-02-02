import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the callback URL from the query parameters.
  const callbackUrl: any = router.query.callbackUrl || "/";

  /**
   * Handles the form submission for the registration page.
   * @param e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Sign in the user.
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        callbackUrl,
      });

      if (res?.error) {
        setIsLoading(false);
        setError("*email or password is incorrect");
      } else {
        setIsLoading(false);
        router.push(callbackUrl);
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("*email or password is incorrect");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-6">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <div className="flex w-full max-w-sm flex-col gap-y-4 rounded-xl p-6 shadow-lg shadow-black">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="rounded-md border border-slate-400 p-2"
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="rounded border border-slate-400 p-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="mt-2 rounded-md bg-black px-4 py-2 text-white"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex w-full items-center justify-center">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl,
                redirect: false,
              })
            }
            className="flex w-full items-center justify-center gap-x-2 rounded-md border border-black px-4 py-2 text-black"
          >
            Sign in with Google
          </button>
        </div>
        <p className="self-center">
          {"Don't have an account? "}
          <Link href="/auth/register" className="font-semibold text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
