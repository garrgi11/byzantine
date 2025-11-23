"use client"

import { AlertCircle } from "lucide-react"

export function EmergenciesCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Confirmed Emergencies</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-xs text-gray-500 mt-2">Total responses</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Success Rate: <span className="text-green-600 font-medium">98%</span>
        </p>
      </div>
    </div>
  )
}
