export default function Header() {
  return (
    <header className="bg-slate-900 p-4 border-b border-slate-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-cyan-400">
          Ndolo Trader AI
        </h1>

        <div className="text-right">
          <p className="text-sm text-gray-400">Status</p>
          <p className="text-green-400 font-bold">● Online</p>
        </div>
      </div>
    </header>
  );
}