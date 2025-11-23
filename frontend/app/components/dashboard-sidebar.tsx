"use client"

import type React from "react"

import { useState } from "react"
import { LayoutDashboard, Zap, Coins, Database } from "lucide-react"

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "#" },
  { label: "Drone Cycle", icon: <Zap className="w-5 h-5" />, href: "#" },
  { label: "NEO DAO", icon: <Coins className="w-5 h-5" />, href: "#" },
  { label: "NEO FS", icon: <Database className="w-5 h-5" />, href: "#" },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* Logo/Brand */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Pattern</h1>
        <p className="text-xs text-gray-500 mt-1">Network Control</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeItem === item.label ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-500">© 2025 Pattern</p>
      </div>
    </aside>
  )
}
