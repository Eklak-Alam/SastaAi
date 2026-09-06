import { FiGrid } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-100 py-4 px-8 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-violet-600">
          <FiGrid className="text-2xl" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Sasta Ai
        </h1>
      </div>
      {/* Right side removed as requested for a cleaner UI */}
    </header>
  );
}
