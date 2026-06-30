"use client";

import { useLayoutEffect } from "react";
import {
  applyTheme,
  persistThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

function readStoredTheme(): Theme {
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme | null) ?? "light";
}

/** Applies stored theme before paint — no <script> tag required (React 19 / static export safe). */
export function ThemeInit() {
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    persistThemePreference(stored);
    applyTheme(resolveTheme(stored));
  }, []);

  return null;
}
