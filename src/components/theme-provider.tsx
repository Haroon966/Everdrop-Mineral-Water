"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  applyTheme,
  persistThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const themeListeners = new Set<() => void>();

function subscribeTheme(onStoreChange: () => void) {
  themeListeners.add(onStoreChange);
  return () => themeListeners.delete(onStoreChange);
}

function readStoredTheme(): Theme {
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme | null) ?? "light";
}

function notifyThemeChange() {
  themeListeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readStoredTheme,
    () => "light" as Theme
  );

  const resolvedTheme = useSyncExternalStore(
    subscribeTheme,
    () => resolveTheme(readStoredTheme()),
    () => "light" as const
  );

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => notifyThemeChange();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    persistThemePreference(next);
    applyTheme(resolveTheme(next));
    notifyThemeChange();
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
