import React from "react";

export default function BrandLogo({
  className = "h-5 w-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M 0 22.74 C 28 31, 55 44, 69.1 59.78 L 93.78 59.78 C 87 50, 78 44, 65.24 38.99 C 88 37.5, 100 31, 99.6 24.5 C 99.2 12, 65 -1.5, 21.67 1.1 C 52 2.5, 76 11.5, 75.75 21.5 C 75.5 29.5, 45 31, 0 22.74 Z" />
    </svg>
  );
}