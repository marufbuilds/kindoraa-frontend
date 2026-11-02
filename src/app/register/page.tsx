 
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
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const FRONTEND_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isSubmitting = isLoading || isGoogleLoading;

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        callbackURL: `${FRONTEND_URL}/`,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!", {
        description: "Welcome to the Kindora community.",
      });

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
  try {
    setIsGoogleLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${FRONTEND_URL}/`,
      errorCallbackURL: `${FRONTEND_URL}/register`,
    });

    if (error) {
      toast.error(error.message || "Google sign-up failed.");
    }
  } catch (error) {
    console.error("Google registration error:", error);
    toast.error("Unable to continue with Google.");
  } finally {
    setIsGoogleLoading(false);
  }
};

  return (
    <main className="mt-20 mb-20 min-h-screen bg-[#F8F7F2] dark:bg-[#101B14]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] lg:grid-cols-2">
        {/* Left Brand Panel */}
        <section className="relative hidden overflow-hidden bg-[#174B2B] px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <HeartHandshake size={28} />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Kindora
              </span>
            </Link>

            <div className="mt-28 max-w-lg">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">
                Together We Grow
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-[1.15] xl:text-6xl">
                Be part of
                <br />
                something
                <br />
                <span className="text-[#F59E0B]">meaningful.</span>
              </h1>

              <p className="mt-7 max-w-md text-lg leading-8 text-green-100/80">
                Every small action creates a bigger impact. Join a community
                of people working together to make the world a better place.
              </p>
            </div>
          </div>

          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 -right-28 h-[440px] w-[440px] rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-12 h-[300px] w-[300px] rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-24 top-28 h-5 w-5 rounded-full bg-[#F59E0B]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-40 left-20 h-3 w-3 rounded-full bg-green-300"
          />

          <div className="relative z-10 flex items-center gap-3 text-sm text-green-100/70">
            <span className="h-px w-10 bg-[#F59E0B]" />
            Discover. Participate. Make an impact.
          </div>
        </section>

        {/* Right Registration Panel */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-20">
          <div className="w-full max-w-[460px]">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#174B2B] text-white">
                <HeartHandshake size={25} />
              </div>

              <span className="text-2xl font-bold text-[#174B2B] dark:text-white">
                Kindora
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#166534] dark:text-green-400">
                Join our community
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Start making a difference. Create your Kindora account today.
              </p>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-[#18251C] dark:text-gray-200 dark:hover:bg-[#203126]"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.98 46.98 31.8 46.98 24.55Z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>

              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs font-medium text-gray-400">
                OR REGISTER WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                    maxLength={100}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 dark:border-gray-700 dark:bg-[#18251C] dark:text-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
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
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 dark:border-gray-700 dark:bg-[#18251C] dark:text-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 dark:border-gray-700 dark:bg-[#18251C] dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 dark:border-gray-700 dark:bg-[#18251C] dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#174B2B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating account..." : "Create Account"}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#166534] hover:underline dark:text-green-400"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
              By creating an account, you agree to use Kindora respectfully
              and help build a welcoming community.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
