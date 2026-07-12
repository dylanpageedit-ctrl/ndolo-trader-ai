"use client";

import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const url = window.location.href;
    const search = window.location.search;
    const hash = window.location.hash;

    alert(
      `FULL URL:\n${url}\n\nSEARCH:\n${search}\n\nHASH:\n${hash}`
    );

    console.log("FULL URL:", url);
    console.log("SEARCH:", search);
    console.log("HASH:", hash);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <h1>Connecting...</h1>
    </main>
  );
}
