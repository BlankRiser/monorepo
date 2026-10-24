import "katex/dist/katex.min.css";
import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10 sm:py-16">
      {children}
    </div>
  );
}
