
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 bg-black text-blue-200 py-6 px-8 text-center text-sm font-sans mt-16">
      <div>
        &copy; {new Date().getFullYear()} Q-OptiChain | Quantum Supply Chain Optimization — Empowering tomorrow’s logistics.
      </div>
      <div className="mt-2">
        <span className="text-xs opacity-70">Site by Lovable • <a href="https://lovable.dev/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">About</a></span>
      </div>
    </footer>
  )
}
