"use client";

import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    async function finishLogin() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        alert("No authorization code received.");
        return;
      }

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      console.log(data);

      alert("OAuth callback completed!");
      window.location.href = "/";
    }

    finishLogin();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <h1 className="text-2xl">Signing you in...</h1>
    </main>
  );
}
