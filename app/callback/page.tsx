"use client";

import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    alert(window.location.href);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <h1>Connecting...</h1>
    </main>
  );
}
