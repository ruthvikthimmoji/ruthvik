"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme } from "@/app/lib/theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark" as const);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-hairline-strong hover:text-ink ${className}`}
    >
      {theme === "dark" ? (
        <Moon size={15} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Sun size={15} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
