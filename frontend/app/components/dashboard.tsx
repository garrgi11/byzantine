"use client"

import { useState } from "react"
import { Sidebar } from "./dashboard-sidebar"
import { MapSection } from "./map-section"
import { StatsGrid } from "./stats-grid"
import WalletConnect from "./wallet-connect"
import { DroneProvider } from "./drone-context"
import { EmergencyWorkflow } from "./emergency-workflow"
import { DroneRegistrationForm } from "./drone-registration-form"
import { SpoonOSMonitor } from "./spoon-os-monitor"
import { HybridAgentPanel } from "./hybrid-agent-panel"
import { AgentCollaborationView } from "./agent-collaboration-view"

export function Dashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [showDroneRegistration, setShowDroneRegistration] = useState(false)

  return (
    <DroneProvider>
      <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-black via-gray-900 to-orange-950/20">
        {/* Sidebar */}
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeItem === "Drone Cycle" ? (
            // Drone Cycle Page - Wallet Connect or Registration
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 sm:p-6 md:p-8">
              {showDroneRegistration ? (
                <div className="w-full">
                  <button
                    onClick={() => setShowDroneRegistration(false)}
                    className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    ← Back to Wallet
                  </button>
                  <DroneRegistrationForm 
                    onRegistrationComplete={() => {
                      setShowDroneRegistration(false)
                      setActiveItem("Dashboard")
                    }}
                  />
                </div>
              ) : (
                <WalletConnect onRegisterDrone={() => setShowDroneRegistration(true)} />
              )}
            </div>
          ) : activeItem === "NEO DAO" ? (
            // NEO DAO Page - Emergency Workflow
            <EmergencyWorkflow />
          ) : activeItem === "Spoon OS" ? (
            // Spoon OS Page - Agent Monitoring
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Spoon OS Agent System</h1>
                <p className="text-gray-400">Autonomous disaster detection and blockchain reporting</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpoonOSMonitor />
                <HybridAgentPanel />
              </div>
              <div>
                <AgentCollaborationView />
              </div>
            </div>
          ) : (
            // Dashboard Page - Map and Stats
            <div className="p-4 sm:p-6 md:p-8">
              <div className="mb-6">
                <MapSection />
              </div>
              <StatsGrid />
            </div>
          )}
        </main>
      </div>
    </DroneProvider>
  )
}
