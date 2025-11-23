"use client"

import { DronesCard } from "./drones-card"
import { EventLog } from "./event-log"
import { EmergenciesCard } from "./emergencies-card"

export function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Drones Count */}
      <DronesCard />

      {/* Event Log */}
      <EventLog />

      {/* Emergencies */}
      <EmergenciesCard />
    </div>
  )
}
