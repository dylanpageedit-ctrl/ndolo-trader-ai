"use client";

import { useEffect, useState } from "react";
import { createPKCE } from "../lib/pkce";

const CLIENT_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID!;

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState("--");
  const [accountId, setAccountId] = useState("--");
  const [currency, setCurrency] = useState("--");

  useEffect(() => {
    const token = localStorage.getItem("deriv_token");

    if (token) {
      setConnected(true);

      fetch("/api/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((account) => {
          setBalance(String(account.balance ?? "--"));
          setAccountId(account.loginid ?? "--");
          setCurrency(account.currency ?? "--");
        })
        .catch((err) => {
          console.error(err);
          setBalance("Error");
          setAccountId("-");
          setCurrency("-");
        });
    }
  }, []);

  const connectDemo = async () => {
    const { codeVerifier, codeChallenge } = await createPKCE();

    sessionStorage.setItem("code_verifier", codeVerifier);

    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);

    const redirectUri = `${window.location.origin}/callback`;

    const url =
      `https://auth.deriv.com/oauth2/auth` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256` +
      `&scope=trade account_manage` +
      `&state=${state}`;

    window.location.href = url;
  };

  const disconnect = () => {
    localStorage.removeItem("deriv_token");
    setConnected(false);
    setBalance("--");
    setAccountId("--");
    setCurrency("--");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        🤖 Ndolo Trader AI
      </h1>

      <div className="bg-slate-900 rounded-xl p-6 mb-6">
        <h2 className="text-gray-400">Connection Status</h2>

        <p className={connected ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
          {connected ? "✅ Connected" : "❌ Not Connected"}
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Account</h2>

        <p>💰 Balance: {balance}</p>
        <p>👤 Account ID: {accountId}</p>
        <p>💱 Currency: {currency}</p>
      </div>

      {!connected ? (
        <button
          onClick={connectDemo}
          className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold"
        >
          🔐 Connect Demo Account
        </button>
      ) : (
        <button
          onClick={disconnect}
          className="w-full bg-red-600 hover:bg-red-700 p-4 rounded-xl font-bold"
        >
          Disconnect
        </button>
      )}
    </main>
  );
}
