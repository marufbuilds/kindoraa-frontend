"use client";
// Before
// import { ThemeProvider, useTheme } from "next-themes";

// After
// import { ThemeProvider, useTheme } from "@teispace/next-themes";
import type { ComponentProps, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider> & {
  children: ReactNode;
};

/**
 * Kindora theme provider.
 *
 * - `attribute="class"` pairs with the `.dark` class strategy in globals.css.
 * - `defaultTheme="system"` + `enableSystem` honor the OS preference on first visit.
 * - The choice is persisted to localStorage (`kindora-theme`) and applied by a
 *   blocking inline script before hydration, so there is no theme flash.
 * - `enableColorScheme` keeps native UI (scrollbars, form controls) in sync.
 */
export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="kindora-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
