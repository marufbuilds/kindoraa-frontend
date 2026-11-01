 
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

type ThemeToggleProps = {
  className?: string;
};

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    const root = document.documentElement;

    root.classList.add("theme-transition");

    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current);
    }

    transitionTimer.current = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300);

    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      title={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 ${className}`}
    >
      <Sun
        aria-hidden="true"
        className="absolute h-[1.15rem] w-[1.15rem] rotate-0 scale-100 text-primary transition-all duration-300 ease-out dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />

      <Moon
        aria-hidden="true"
        className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 text-primary opacity-0 transition-all duration-300 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
