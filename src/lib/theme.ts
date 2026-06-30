export const THEME_STORAGE_KEY = "everdrop-theme";

export type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Resolve stored preference to light or dark. */
export function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

export function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

export function persistThemePreference(theme: Theme) {
  document.cookie = `${THEME_STORAGE_KEY}=${theme};path=/;max-age=31536000;SameSite=Lax`;
}
