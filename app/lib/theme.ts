export type Theme = "dark" | "light";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ||
    document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  
  if (next === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }

  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage unavailable (private mode) */
  }
  
  window.dispatchEvent(new Event("theme-change"));
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

/** For useSyncExternalStore */
export function subscribeTheme(callback: () => void) {
  window.addEventListener("theme-change", callback);
  return () => window.removeEventListener("theme-change", callback);
}