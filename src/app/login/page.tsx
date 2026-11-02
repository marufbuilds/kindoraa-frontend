 
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartHandshake,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const FRONTEND_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isSubmitting = isLoading || isGoogleLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { error } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        callbackURL: `${FRONTEND_URL}/`,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back to Kindora!");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Email login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

const handleGoogleLogin = async () => {
  try {
    setIsGoogleLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${FRONTEND_URL}/`,
      errorCallbackURL: `${FRONTEND_URL}/login`,
    });

    if (error) {
      toast.error(error.message || "Google login failed.");
      setIsGoogleLoading(false);
    }
  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Unable to sign in with Google.");
    setIsGoogleLoading(false);
  }
};

  return (
    <main className="mt-20 mb-20 min-h-screen bg-[#F8F7F2] text-[#173B26] dark:bg-[#101B14] dark:text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1200px] lg:grid-cols-2">
        {/* Left Side */}
        <section className="hidden flex-col justify-between bg-[#174B2B] p-12 text-white lg:flex xl:p-16">
          <Link href="/" className="flex w-fit items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <HeartHandshake size={25} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Kindora
            </span>
          </Link>

          <div className="max-w-md">
            <span className="mb-5 inline-block rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
              Together We Grow
            </span>

            <h1 className="text-5xl font-bold leading-tight xl:text-6xl">
              Welcome back.
              <span className="mt-2 block text-[#D9E8D6]">
                Your community needs you.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-8 text-white/70">
              Sign in to discover meaningful events, connect with volunteers,
              and continue making a positive difference.
            </p>
          </div>

          <p className="text-sm text-white/60">
            Small actions. Stronger communities.
          </p>
        </section>

        {/* Right Side */}
        <section className="flex min-h-screen flex-col justify-center px-5 py-12 sm:px-10 lg:px-14 xl:px-20">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="mb-12 flex w-fit items-center gap-3 lg:hidden"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#174B2B] text-white dark:bg-[#D9E8D6] dark:text-[#174B2B]">
              <HeartHandshake size={25} />
            </div>
            <span className="text-2xl font-bold">Kindora</span>
          </Link>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6D9876]">
                Welcome Back
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B756C] dark:text-gray-400">
                Enter your details to continue your Kindora journey.
              </p>
            </div>

            {/* Email Login */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-13 w-full rounded-xl border border-[#E3E7DF] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#478657] focus:ring-2 focus:ring-[#478657]/15 dark:border-white/10 dark:bg-[#18251C]"
                  />
                </div>
              </div>
  
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-13 w-full rounded-xl border border-[#E3E7DF] bg-white pl-12 pr-12 text-sm outline-none transition focus:border-[#478657] focus:ring-2 focus:ring-[#478657]/15 dark:border-white/10 dark:bg-[#18251C]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#174B2B] dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#174B2B] px-5 text-sm font-semibold text-white transition hover:bg-[#216238] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E3E7DF] dark:bg-white/10" />
              <span className="text-xs font-medium text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-[#E3E7DF] dark:bg-white/10" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-[#E3E7DF] bg-white text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#18251C] dark:hover:bg-[#223328]"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.23 5.6c4.22-3.9 7.53-9.65 7.53-17.25Z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.45 14.45 0 0 1 9.75 24c0-1.59.28-3.13.78-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.23-5.6c-2.01 1.35-4.58 2.15-8.68 2.15-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>

              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-[#6B756C] dark:text-gray-400">
              Dont have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#174B2B] hover:underline dark:text-[#A8D5B1]"
              >
                Create an account
              </Link>
            </p>

            <Link
              href="/"
              className="mt-8 block text-center text-sm font-medium text-[#6B756C] transition hover:text-[#174B2B] dark:text-gray-400 dark:hover:text-white"
            >
              ← Back to home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
