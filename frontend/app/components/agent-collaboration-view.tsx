"use client"

import { useState, useEffect } from "react"
import { Activity, Zap, Brain, GitBranch, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react"

interface AgentState {
  name: string
  status: "active" | "idle" | "error" | "fallback"
  lastUpdate: string
  tasksCompleted: number
  successRate: number
}

interface CollaborationEvent {
  timestamp: string
  type: "analysis" | "decision" | "fallback" | "report"
  spoonOS: string
  gemini: string
  result: string
}

export function AgentCollaborationView() {
  const [spoonOSState, setSpoonOSState] = useState<AgentState>({
    name: "Spoon OS",
    status: "active",
    lastUpdate: new Date().toLocaleTimeString(),
    tasksCompleted: 0,
    successRate: 98.5,
  })

  const [geminiState, setGeminiState] = useState<AgentState>({
    name: "Gemini Fallback",
    status: "idle",
    lastUpdate: new Date().toLocaleTimeString(),
    tasksCompleted: 0,
    successRate: 95.2,
  })

  const [events, setEvents] = useState<CollaborationEvent[]>([
    {
      timestamp: new Date(Date.now() - 30000).toLocaleTimeString(),
      type: "analysis",
      spoonOS: "Detected wildfire in Sector-1",
      gemini: "Confirmed high-severity incident",
      result: "✅ Report to blockchain",
    },
    {
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
      type: "decision",
      spoonOS: "Confidence: 92%",
      gemini: "Reasoning: Multiple factors support reporting",
      result: "✅ Approved by user",
    },
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)

  // Simulate agent activity
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Update Spoon OS
      setSpoonOSState((prev) => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString(),
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3),
      }))

      // Occasionally activate Gemini fallback
      if (Math.random() < 0.1) {
        setGeminiState((prev) => ({
          ...prev,
          status: "active",
          lastUpdate: new Date().toLocaleTimeString(),
          tasksCompleted: prev.tasksCompleted + 1,
        }))

        // Add collaboration event
        setEvents((prev) => [
          {
            timestamp: new Date().toLocaleTimeString(),
            type: "fallback",
            spoonOS: "Analysis timeout",
            gemini: "Took over reasoning",
            result: "✅ Hybrid decision made",
          },
          ...prev.slice(0, 4),
        ])

        // Reset Gemini after a bit
        setTimeout(() => {
          setGeminiState((prev) => ({
            ...prev,
            status: "idle",
          }))
        }, 3000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "idle":
        return "text-gray-400"
      case "error":
        return "text-red-400"
      case "fallback":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 border-green-500/30"
      case "idle":
        return "bg-gray-500/10 border-gray-500/30"
      case "error":
        return "bg-red-500/10 border-red-500/30"
      case "fallback":
        return "bg-yellow-500/10 border-yellow-500/30"
      default:
        return "bg-gray-500/10 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case "idle":
        return <Activity className="w-4 h-4 text-gray-400" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "fallback":
        return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Agent Collaboration System</h2>
              <p className="text-sm text-gray-400">Spoon OS + Gemini Hybrid Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isMonitoring
                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                : "bg-gray-500/20 text-gray-400 border border-gray-500/50"
            }`}
          >
            {isMonitoring ? "🟢 Monitoring" : "⚫ Paused"}
          </button>
        </div>
      </div>

      {/* Agent Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Spoon OS */}
        <div className={`rounded-lg p-4 border ${getStatusBg(spoonOSState.status)}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-white">{spoonOSState.name}</h3>
            </div>
            {getStatusIcon(spoonOSState.status)}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className={`font-semibold capitalize ${getStatusColor(spoonOSState.status)}`}>
                {spoonOSState.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tasks</span>
              <span className="font-semibold text-white">{spoonOSState.tasksCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Success Rate</span>
              <span className="font-semibold text-green-400">{spoonOSState.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Update</span>
              <span className="font-mono text-xs text-gray-500">{spoonOSState.lastUpdate}</span>
            </div>
          </div>
        </div>

        {/* Gemini Fallback */}
        <div className={`rounded-lg p-4 border ${getStatusBg(geminiState.status)}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white">{geminiState.name}</h3>
            </div>
            {getStatusIcon(geminiState.status)}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className={`font-semibold capitalize ${getStatusColor(geminiState.status)}`}>
                {geminiState.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tasks</span>
              <span className="font-semibold text-white">{geminiState.tasksCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Success Rate</span>
              <span className="font-semibold text-green-400">{geminiState.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Update</span>
              <span className="font-mono text-xs text-gray-500">{geminiState.lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration Events */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-b border-gray-700">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Collaboration Events
          </h3>
        </div>

        <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
          {events.map((event, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-semibold capitalize">
                    {event.type}
                  </span>
                  <span className="text-xs text-gray-500">{event.timestamp}</span>
                </div>
                <span className="text-green-400 font-semibold text-sm">{event.result}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-purple-500/10 rounded p-2 border border-purple-500/20">
                  <p className="text-gray-400 mb-1">Spoon OS</p>
                  <p className="text-purple-300">{event.spoonOS}</p>
                </div>
                <div className="bg-blue-500/10 rounded p-2 border border-blue-500/20">
                  <p className="text-gray-400 mb-1">Gemini</p>
                  <p className="text-blue-300">{event.gemini}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
          <p className="text-xs text-gray-400 mb-2">System Health</p>
          <p className="text-2xl font-bold text-green-400">99.9%</p>
          <p className="text-xs text-gray-500 mt-1">Uptime</p>
        </div>

        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
          <p className="text-xs text-gray-400 mb-2">Avg Response Time</p>
          <p className="text-2xl font-bold text-blue-400">1.2s</p>
          <p className="text-xs text-gray-500 mt-1">Hybrid Analysis</p>
        </div>

        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
          <p className="text-xs text-gray-400 mb-2">Fallback Rate</p>
          <p className="text-2xl font-bold text-purple-400">0.8%</p>
          <p className="text-xs text-gray-500 mt-1">Gemini Activation</p>
        </div>
      </div>
    </div>
  )
}
