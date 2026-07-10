"use client";

import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      alert("No token received.");
      window.location.href = "/";
      return;
    }

    localStorage.setItem("deriv_token", token);

    alert("Connected successfully!");

    window.location.href = "/";
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <h1>Connecting...</h1>
    </main>
  );
}
