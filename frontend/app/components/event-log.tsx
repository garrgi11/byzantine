"use client"

const LOG_ENTRIES = [
  { time: "14:32:45", level: "info", message: "Drone-001 initialized" },
  { time: "14:32:47", level: "success", message: "Network connection established" },
  { time: "14:33:12", level: "info", message: "Drone-002 calibration complete" },
  { time: "14:33:54", level: "warning", message: "Drone-003 battery at 45%" },
  { time: "14:34:20", level: "info", message: "All systems nominal" },
]

export function EventLog() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-200">
        <p className="text-sm font-semibold text-gray-900">Event Log</p>
      </div>

      <div className="bg-white p-4 font-mono text-xs min-h-64 overflow-y-auto">
        {LOG_ENTRIES.map((entry, idx) => {
          const colorMap: { [key: string]: string } = {
            info: "text-blue-600",
            success: "text-green-600",
            warning: "text-orange-600",
            error: "text-red-600",
          }

          return (
            <div key={idx} className="mb-2 flex gap-2 hover:bg-gray-50 px-2 py-1 rounded transition-colors">
              <span className="text-gray-500 font-semibold">[{entry.time}]</span>
              <span className={`font-bold ${colorMap[entry.level] || "text-gray-900"}`}>{entry.level.toUpperCase()}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-700">{entry.message}</span>
            </div>
          )
        })}
      </div>

      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-600 font-mono">$ _</p>
      </div>
    </div>
  )
}
