"use client"

import { Sidebar } from "./dashboard-sidebar"
import { MapSection } from "./map-section"
import { StatsGrid } from "./stats-grid"

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Map Section */}
          <div className="mb-6">
            <MapSection />
          </div>

          {/* Stats Grid */}
          <StatsGrid />
        </div>
      </main>
    </div>
  )
}
