import React from "react";

export default function Container({ className = "", children }) {
  return (
    <div
      className={[
        // Slightly larger side padding so content never hugs edges
        "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

