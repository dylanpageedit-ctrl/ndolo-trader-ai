"use client";

import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    async function finishLogin() {
      try {
        const params = new URLSearchParams(window.location.search);

        const code = params.get("code");
        const state = params.get("state");

        if (!code) {
          alert("No authorization code received.");
          return;
        }

        if (state !== sessionStorage.getItem("oauth_state")) {
          alert("Invalid OAuth state.");
          return;
        }

        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            codeVerifier: sessionStorage.getItem("code_verifier"),
          }),
        });

        const data = await response.json();

        if (data.access_token) {
          // Save the token so the app remembers you're connected
          localStorage.setItem("deriv_token", data.access_token);

          alert("Connected successfully!");

          window.location.href = "/";
        } else {
          alert(JSON.stringify(data));
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
