"use client";

// The page is prerendered once per deploy; read the year in the browser so
// the copyright line doesn't go stale on January 1st.
export default function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
