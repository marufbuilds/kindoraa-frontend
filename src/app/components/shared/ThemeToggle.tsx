"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useSyncExternalStore } from "react";

// Hydration detection via useSyncExternalStore: `false` during SSR & the hydration
// render (matches server HTML), `true` on the client afterwards. Avoids both
// hydration mismatches and setState-in-effect cascading renders.
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type ThemeToggleProps = {
  className?: string;
};

/**
 * Kindora theme toggle.
 *
 * Hydration-safe by design: the `.dark` class on <html> is applied by the
 * next-themes inline script *before* React hydrates, so icon visibility is
 * driven purely by CSS (`dark:` variants) — no flash, no mismatch. The `mounted`
 * flag only gates the dynamic aria-label/title text.
 *
 * Toggling briefly adds `.theme-transition` to <html> so globals.css can run a
 * scoped, reduced-motion-aware color cross-fade during the swap.
 */
export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";

  const toggleTheme = () => {
    const root = document.documentElement;

    // Scope a short color cross-fade to the swap (skipped under reduced motion by CSS).
    root.classList.add("theme-transition");
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300);

    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {/* Sun: shown in light mode, rotates & scales away in dark mode */}
      <Sun
        aria-hidden="true"
        className="absolute h-[19px] w-[19px] rotate-0 scale-100 text-primary transition-all duration-300 ease-out dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
      {/* Moon: hidden in light mode, rotates & scales in for dark mode */}
      <Moon
        aria-hidden="true"
        className="absolute h-[19px] w-[19px] rotate-90 scale-0 text-primary opacity-0 transition-all duration-300 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
