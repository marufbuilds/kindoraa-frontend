 
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ProfileDialog from "@/app/components/shared/ProfileDialog";
import {
  ArrowUpRight,
  HeartHandshake,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import ThemeToggle from "@/app/components/shared/ThemeToggle";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Explore Events" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/events/manage", label: "Manage Event" },
];

type UserAvatarProps = {
  image?: string | null;
  name?: string | null;
  size?: string;
};

function UserAvatar({
  image,
  name,
  size = "h-9 w-9",
}: UserAvatarProps) {
  const initial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <span
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5f1e5] text-sm font-bold text-[#166534] dark:bg-[#263b2c] dark:text-[#a8d5b1]`}
    >
      {image ? (
        <img
          src={image}
          alt={`${name || "User"} profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        initial
      )}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const openProfileDialog = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(true);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to log out.");
        return;
      }

      setIsMenuOpen(false);
      setIsProfileOpen(false);
      toast.success("You have logged out successfully.");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8eee8] bg-[#fffefa]/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#101b14]/95">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#166534] text-white shadow-md shadow-green-900/15 transition-transform group-hover:rotate-[-6deg]">
            <HeartHandshake size={25} strokeWidth={2.2} />
          </div>

          <div className="flex flex-col">
            <span className="text-[25px] font-extrabold leading-none tracking-tight text-[#174b2b] dark:text-white">
              kindora<span className="text-[#f59e0b]">.</span>
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[2px] text-[#7b897d]">
              TOGETHER WE GROW
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-[#edf1eb] bg-[#f7f8f3] p-1.5 dark:border-white/10 dark:bg-[#18251c] lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                  active
                    ? "bg-white text-[#166534] shadow-sm dark:bg-[#263b2c] dark:text-[#a8d5b1]"
                    : "text-[#66746a] hover:bg-white/70 hover:text-[#166534] dark:text-gray-300 dark:hover:bg-[#263b2c]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {!isPending && user ? (
            <>
              <button
                type="button"
                onClick={openProfileDialog}
                aria-label="Open profile"
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#36533e] transition-colors hover:bg-[#f0f5ef] dark:text-gray-200 dark:hover:bg-[#263b2c]"
              >
                <UserAvatar image={user.image} name={user.name} />
                <span className="max-w-[110px] truncate">
                  {user.name || "My Profile"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 rounded-full border border-[#e3e9e1] px-4 py-2.5 text-sm font-semibold text-[#36533e] transition-colors hover:bg-[#f0f5ef] disabled:opacity-60 dark:border-white/10 dark:text-gray-200 dark:hover:bg-[#263b2c]"
              >
                <LogOut size={16} />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : !isPending ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#36533e] transition-colors hover:bg-[#f0f5ef] dark:text-gray-200 dark:hover:bg-[#263b2c]"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#166534] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#125329]"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="h-10 w-32 animate-pulse rounded-full bg-[#edf1eb] dark:bg-[#263b2c]" />
          )}

          <Link
            href="/events/create"
            className="group inline-flex items-center gap-2 rounded-full bg-[#166534] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-green-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#125329] hover:shadow-lg"
          >
            Get Involved
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5ebe4] text-[#174b2b] transition-colors hover:bg-[#f0f5ef] dark:border-white/10 dark:text-white dark:hover:bg-[#263b2c]"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-[#e8eee8] bg-[#fffefa] px-5 pb-6 pt-4 shadow-lg dark:border-white/10 dark:bg-[#101b14] lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#edf5ed] text-[#166534] dark:bg-[#263b2c] dark:text-[#a8d5b1]"
                      : "text-[#59685d] hover:bg-[#f5f7f2] dark:text-gray-300 dark:hover:bg-[#263b2c]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="my-3 border-t border-[#e8eee8] dark:border-white/10" />

            {!isPending && user ? (
              <>
                <button
                  type="button"
                  onClick={openProfileDialog}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#36533e] hover:bg-[#f0f5ef] dark:text-gray-200 dark:hover:bg-[#263b2c]"
                >
                  <UserAvatar image={user.image} name={user.name} size="h-10 w-10" />

                  <span>
                    {user.name || "My Profile"}
                    <span className="block text-xs font-normal text-gray-500">
                      {user.email}
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#dce7dc] px-4 py-3 text-sm font-semibold text-[#36533e] hover:bg-[#f0f5ef] disabled:opacity-60 dark:border-white/10 dark:text-gray-200 dark:hover:bg-[#263b2c]"
                >
                  <LogOut size={17} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : !isPending ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl border border-[#dce7dc] px-4 py-3 text-center text-sm font-semibold text-[#36533e] transition-colors hover:bg-[#f0f5ef] dark:border-white/10 dark:text-gray-200 dark:hover:bg-[#263b2c]"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 rounded-xl bg-[#166534] px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#125329]"
                >
                  Create an account
                </Link>
              </>
            ) : (
              <div className="h-12 animate-pulse rounded-xl bg-[#edf1eb] dark:bg-[#263b2c]" />
            )}

            <Link
              href="/events/create"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#166534] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#125329]"
            >
              Get Involved
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      )}

      {/* Profile Dialog */}
      <ProfileDialog
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
}
