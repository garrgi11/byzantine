"use client"

import { Zap } from "lucide-react"

export function DronesCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Number of Drones</p>
          <p className="text-3xl font-bold text-gray-900">24</p>
          <p className="text-xs text-gray-500 mt-2">Active in network</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Zap className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Status: <span className="text-green-600 font-medium">Operational</span>
        </p>
      </div>
    </div>
  )
}
