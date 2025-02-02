import Link from "next/link"
import { Home, Wind, Activity, Settings } from "lucide-react"

export function Sidebar() {
  return (
    (<div className="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-8">Air Quality Companion</h1>
      <nav className="space-y-4">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          href="/air-quality"
          className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <Wind size={20} />
          <span>Air Quality</span>
        </Link>
        <Link
          href="/activity"
          className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <Activity size={20} />
          <span>Activity</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </div>)
  );
}

