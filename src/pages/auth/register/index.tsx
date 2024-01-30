import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles the form submission for the registration page.
   * @param e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const data = {
      email: e.currentTarget.email.value,
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    // Make a POST request to the /api/register endpoint.
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // If the response is successful, redirect to the login page.
    if (res.status === 200) {
      setIsLoading(false);
      router.push("/auth/login");
    } else {
      setIsLoading(false);
      setError("*Email already exists");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-6">
      <h1 className="text-2xl font-bold">Register Page</h1>
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
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="rounded border border-slate-400 p-2"
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
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="self-center">
          Have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-blue-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
