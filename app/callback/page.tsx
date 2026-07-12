"use client";

import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    async function finishLogin() {
      try {
        const params = new URLSearchParams(window.location.search);

        const code = params.get("code");
        const state = params.get("state");

        const savedState = sessionStorage.getItem("oauth_state");

        if (!code) {
          alert("No authorization code received.");
          return;
        }

        if (state !== savedState) {
          alert("Invalid OAuth state.");
          return;
        }

        const codeVerifier = sessionStorage.getItem("code_verifier");

        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            codeVerifier,
          }),
        });

        const data = await response.json();

        console.log(data);

        if (data.access_token) {
          alert("Connected successfully!");
          window.location.href = "/";
        } else {
          alert(JSON.stringify(data, null, 2));
        }
      } catch (err: any) {
        alert(err.message || "Unknown error");
      }
    }

    finishLogin();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <h1>Connecting...</h1>
    </main>
  );
}
