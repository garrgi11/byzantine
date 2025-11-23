"use client"

import { useState, useEffect } from "react"
import { Activity, AlertTriangle, CheckCircle2, Zap, Radio } from "lucide-react"

interface SpoonOSStatus {
  isRunning: boolean
  agentName: string
  role: string
  incidentsDetected: number
  incidentsReported: number
  lastCheck: string
  confidenceThreshold: number
  checkInterval: number
}

interface SpoonOSMonitorProps {
  onStartAgent?: () => void
  onStopAgent?: () => void
}

export function SpoonOSMonitor({ onStartAgent, onStopAgent }: SpoonOSMonitorProps) {
  const [status, setStatus] = useState<SpoonOSStatus>({
    isRunning: false,
    agentName: "NeoGuard Sentinel 01",
    role: "Disaster Response Coordinator",
    incidentsDetected: 0,
    incidentsReported: 0,
    lastCheck: "Never",
    confidenceThreshold: 0.85,
    checkInterval: 5,
  })

  const [isStarting, setIsStarting] = useState(false)

  const handleStartAgent = async () => {
    setIsStarting(true)
    setStatus((prev) => ({ ...prev, isRunning: true }))
    onStartAgent?.()
    // Simulate agent startup
    setTimeout(() => setIsStarting(false), 1000)
  }

  const handleStopAgent = () => {
    setStatus((prev) => ({ ...prev, isRunning: false }))
    onStopAgent?.()
  }

  const successRate =
    status.incidentsDetected > 0
      ? ((status.incidentsReported / status.incidentsDetected) * 100).toFixed(1)
      : "0.0"

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg border border-purple-500/20 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-6 py-4 border-b border-purple-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Zap className="w-6 h-6 text-purple-400" />
            <div
              className={`absolute inset-0 rounded-full animate-pulse ${
                status.isRunning ? "bg-purple-400/30" : "bg-gray-400/30"
              }`}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Spoon OS Agent</h3>
            <p className="text-xs text-gray-400">{status.agentName}</p>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status.isRunning
              ? "bg-green-500/20 text-green-400 border border-green-500/50"
              : "bg-gray-500/20 text-gray-400 border border-gray-500/50"
          }`}
        >
          {status.isRunning ? "🟢 ACTIVE" : "⚫ OFFLINE"}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Agent Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Role</p>
            <p className="text-sm font-semibold text-white">{status.role}</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Confidence Threshold</p>
            <p className="text-sm font-semibold text-white">{(status.confidenceThreshold * 100).toFixed(0)}%</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Check Interval</p>
            <p className="text-sm font-semibold text-white">{status.checkInterval}s</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Last Check</p>
            <p className="text-sm font-semibold text-white">{status.lastCheck}</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <p className="text-xs text-gray-400">Detected</p>
            </div>
            <p className="text-2xl font-bold text-red-400">{status.incidentsDetected}</p>
          </div>

          <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <p className="text-xs text-gray-400">Reported</p>
            </div>
            <p className="text-2xl font-bold text-green-400">{status.incidentsReported}</p>
          </div>

          <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-gray-400">Success Rate</p>
            </div>
            <p className="text-2xl font-bold text-blue-400">{successRate}%</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Radio className={`w-4 h-4 ${status.isRunning ? "text-green-400 animate-pulse" : "text-gray-500"}`} />
            <p className="text-sm font-semibold text-white">
              {status.isRunning ? "Monitoring Active" : "Agent Offline"}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {status.isRunning
              ? "Spoon OS is continuously monitoring drone feeds for disasters and will automatically report incidents to the Neo blockchain."
              : "Start the agent to begin autonomous monitoring and incident reporting."}
          </p>
        </div>

        {/* Network Info */}
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Network</p>
          <p className="text-sm font-mono text-blue-400">Neo N3 Testnet</p>
          <p className="text-xs text-gray-500 mt-1">https://testnet1.neo.coz.io:443</p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700 flex gap-3">
        <button
          onClick={handleStartAgent}
          disabled={status.isRunning || isStarting}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium text-sm"
        >
          {isStarting ? "Starting..." : "Start Agent"}
        </button>
        <button
          onClick={handleStopAgent}
          disabled={!status.isRunning}
          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium text-sm"
        >
          Stop Agent
        </button>
      </div>
    </div>
  )
}
