"use client"

import type React from "react"

import { LayoutDashboard, Zap, Coins, Database, Brain } from "lucide-react"

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "#" },
  { label: "Drone Cycle", icon: <Zap className="w-5 h-5" />, href: "#" },
  { label: "NEO DAO", icon: <Coins className="w-5 h-5" />, href: "#" },
  { label: "Spoon OS", icon: <Brain className="w-5 h-5" />, href: "#" },
  { label: "NEO FS", icon: <Database className="w-5 h-5" />, href: "#" },
]

interface SidebarProps {
  activeItem: string
  setActiveItem: (item: string) => void
}

export function Sidebar({ activeItem, setActiveItem }: SidebarProps) {
  return (
    <aside className="w-64 bg-black/50 backdrop-blur-sm border-r border-orange-500/20 p-6 flex flex-col">
      {/* Logo/Brand */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Pattern</h1>
        <p className="text-xs text-orange-400 mt-1">Network Control</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeItem === item.label 
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30" 
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-orange-500/20 pt-4">
        <p className="text-xs text-gray-500">© 2025 Pattern</p>
      </div>
    </aside>
  )
}
