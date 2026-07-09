"use client";

import { useState } from "react";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Stopped");
  const [profit, setProfit] = useState(0);

  const connect = () => {
    setConnected(true);
  };

  const startBot = () => {
    setStatus("Running");
    setProfit(25.35);
  };

  const stopBot = () => {
    setStatus("Stopped");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 border-b border-slate-800 p-4">
        <h1 className="text-3xl font-bold text-cyan-400">
          🤖 Ndolo Trader AI
        </h1>

        <p className="text-gray-400">
          {connected ? "🟢 Connected" : "🔴 Not Connected"}
        </p>
      </header>

      <div className="p-5">

        {/* Navigation */}
        <div className="flex gap-2 overflow-x-auto mb-5">
          <button className="bg-cyan-600 rounded-lg px-4 py-2">
            Dashboard
          </button>

          <button className="bg-slate-800 rounded-lg px-4 py-2">
            Markets
          </button>

          <button className="bg-slate-800 rounded-lg px-4 py-2">
            AI Bot
          </button>

          <button className="bg-slate-800 rounded-lg px-4 py-2">
            History
          </button>
        </div>

        {/* Balance */}
        <div className="rounded-xl bg-slate-900 p-5 mb-4">
          <h2 className="text-gray-400">Demo Balance</h2>

          <p className="text-4xl font-bold text-green-400">
            $10,000.00
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-gray-400 text-sm">Profit Today</p>

            <h2 className="text-2xl font-bold text-green-400">
              ${profit.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-gray-400 text-sm">Bot Status</p>

            <h2
              className={`text-xl font-bold ${
                status === "Running"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {status}
            </h2>
          </div>
        </div>

        <button
          onClick={connect}
          className="w-full bg-blue-600 rounded-xl p-4 font-bold mb-3"
        >
          🔐 Connect Demo Account
        </button>

        <button
          onClick={startBot}
          className="w-full bg-green-600 rounded-xl p-4 font-bold mb-3"
        >
          ▶ Start Trading Bot
        </button>

        <button
          onClick={stopBot}
          className="w-full bg-red-600 rounded-xl p-4 font-bold mb-5"
        >
          ■ Stop Trading Bot
        </button>

        <div className="rounded-xl bg-slate-900 p-5 mb-5">
          <h2 className="text-xl font-bold text-cyan-400 mb-3">
            📈 Live Trading Chart
          </h2>

          <div className="h-64 rounded-lg bg-slate-800 flex items-center justify-center">
            <p className="text-gray-400">
              TradingView chart coming soon...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl bg-slate-900 p-5">
            📊<br />
            Charts
          </button>

          <button className="rounded-xl bg-slate-900 p-5">
            🤖<br />
            AI Signals
          </button>

          <button className="rounded-xl bg-slate-900 p-5">
            📜<br />
            Trades
          </button>

          <button className="rounded-xl bg-slate-900 p-5">
            ⚙️<br />
            Settings
          </button>
        </div>

      </div>
    </main>
  );
}