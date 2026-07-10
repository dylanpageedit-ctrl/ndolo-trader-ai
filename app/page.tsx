"use client";

const APP_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID!;

export default function Home() {
  const connectDemo = () => {
    const redirect = `${window.location.origin}/callback`;

    const url =
      `https://oauth.deriv.com/oauth2/authorize` +
      `?app_id=${APP_ID}` +
      `&redirect_uri=${encodeURIComponent(redirect)}`;

    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        🤖 Ndolo Trader AI
      </h1>

      <div className="bg-slate-900 rounded-xl p-6 mb-6">
        <h2 className="text-gray-400">Connection Status</h2>
        <p className="text-red-400 font-bold">
          Not Connected
        </p>
      </div>

      <button
        onClick={connectDemo}
        className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold text-lg"
      >
        🔐 Connect Demo Account
      </button>

      <div className="mt-8 bg-slate-900 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2">
          AI Trading Bot
        </h2>

        <p className="text-gray-400">
          Connect your Deriv account to begin.
        </p>
      </div>

    </main>
  );
}
