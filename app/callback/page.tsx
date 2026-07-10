"use client";

import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    console.log("Deriv callback:", Object.fromEntries(params.entries()));

    alert("Login successful! You can now continue building the trading bot.");

    window.location.href = "/";
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <h1 className="text-2xl">Connecting to Deriv...</h1>
    </main>
  );
}
