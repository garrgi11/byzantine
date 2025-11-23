"use client"

import React, { useState } from 'react'
import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Plane, Wifi, ShieldAlert, History, Settings, User, Menu, X, Battery, Signal } from 'lucide-react'

// Map Styles
const STYLE_DARK = 'mapbox://styles/mapbox/dark-v11'
const STYLE_SATELLITE = 'mapbox://styles/mapbox/satellite-streets-v12'

// Mock Drone Data
const DRONES = [
  { id: 1, lat: 38.9072, lng: -77.0369, status: 'active', battery: 82, signal: 'Strong' },
  { id: 2, lat: 38.8951, lng: -77.0364, status: 'active', battery: 45, signal: 'Weak' },
  { id: 3, lat: 38.9101, lng: -77.0200, status: 'alert', battery: 12, signal: 'Critical' },
]

export function MapSection() {
  const [viewState, setViewState] = useState({
    latitude: 38.9072,
    longitude: -77.0369,
    zoom: 13
  })
  const [mapStyle, setMapStyle] = useState(STYLE_DARK)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedDrone, setSelectedDrone] = useState<number | null>(null)

  return (
    <div className="flex h-[600px] w-full bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden rounded-lg border border-gray-800">
      {/* --- LEFT SIDEBAR --- */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-[#111111] border-r border-gray-800 transition-all duration-300 flex flex-col z-20`}>
        {/* Sidebar Icons Strip */}
        <div className="flex flex-row h-full">
          <div className="w-16 flex flex-col items-center py-6 space-y-8 border-r border-gray-800 bg-[#0f0f0f]">
            <div className="p-2 bg-green-900/20 rounded-lg text-green-500 mb-4">
              <Plane size={24} />
            </div>
            <Wifi size={20} className="hover:text-white cursor-pointer transition-colors" />
            <ShieldAlert size={20} className="hover:text-white cursor-pointer transition-colors" />
            <History size={20} className="hover:text-white cursor-pointer transition-colors" />
            <div className="flex-grow" />
            <Settings size={20} className="mb-4 hover:text-white cursor-pointer" />
          </div>

          {/* Expanded Content Area */}
          {sidebarOpen && (
            <div className="flex-1 flex flex-col">
              <div className="p-5 border-b border-gray-800 flex justify-between items-center">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <Plane size={18} className="text-green-500"/>
                  Drone Fleet
                </h2>
                <X size={16} className="cursor-pointer hover:text-white" onClick={() => setSidebarOpen(false)} />
              </div>

              <div className="p-4">
                <div className="flex gap-4 text-sm mb-6 border-b border-gray-800 pb-2">
                  <span className="text-green-500 border-b-2 border-green-500 pb-2 cursor-pointer">Active Nodes</span>
                  <span className="text-gray-500 cursor-pointer hover:text-gray-300">Whitelisted (3)</span>
                </div>

                <div className="space-y-3">
                  {DRONES.map(drone => (
                    <div
                      key={drone.id}
                      onClick={() => setSelectedDrone(drone.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedDrone === drone.id 
                          ? 'bg-gray-800 border-green-500' 
                          : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-mono text-xs">UNIT-{drone.id.toString().padStart(3, '0')}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          drone.status === 'alert' 
                            ? 'bg-red-900 text-red-400' 
                            : 'bg-green-900 text-green-400'
                        }`}>
                          {drone.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Battery size={10}/> {drone.battery}%
                        </div>
                        <div className="flex items-center gap-1">
                          <Signal size={10}/> {drone.signal}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Header / HUD */}
        <div className="h-14 bg-[#111111]/90 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 z-10 absolute top-0 left-0 right-0 w-full">
          <div className="flex items-center gap-4">
            {!sidebarOpen && <Menu size={20} className="cursor-pointer" onClick={() => setSidebarOpen(true)} />}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">NeoGuard //</span>
              <span className="text-white font-bold tracking-wider">SENTINEL GRID</span>
              <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/30">
                CONNECTED
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Standard/Satellite Toggle */}
            <div className="bg-black rounded-full p-1 flex text-xs font-medium border border-gray-700">
              <button
                onClick={() => setMapStyle(STYLE_DARK)}
                className={`px-3 py-1 rounded-full transition-all ${
                  mapStyle === STYLE_DARK 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setMapStyle(STYLE_SATELLITE)}
                className={`px-3 py-1 rounded-full transition-all ${
                  mapStyle === STYLE_SATELLITE 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Satellite
              </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
              <User size={14} />
            </div>
          </div>
        </div>

        {/* --- MAPBOX CONTAINER --- */}
        <div className="flex-1 w-full h-full relative bg-black">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle={mapStyle}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            attributionControl={false}
          >
            <NavigationControl position="bottom-right" />
            <FullscreenControl position="bottom-right" />
            <GeolocateControl position="bottom-right" />

            {/* Drone Markers */}
            {DRONES.map(drone => (
              <Marker
                key={drone.id}
                latitude={drone.lat}
                longitude={drone.lng}
                anchor="center"
                onClick={e => {
                  e.originalEvent.stopPropagation()
                  setSelectedDrone(drone.id)
                }}
              >
                <div className="relative group cursor-pointer">
                  {/* Pulsing Effect */}
                  <div className={`absolute -inset-2 rounded-full opacity-40 animate-ping ${
                    drone.status === 'alert' ? 'bg-red-500' : 'bg-green-500'
                  }`}></div>

                  {/* The Icon */}
                  <div className={`relative z-10 p-1.5 rounded-full border-2 shadow-xl ${
                    drone.status === 'alert' 
                      ? 'bg-red-900 border-red-500 text-red-100' 
                      : 'bg-black border-green-500 text-green-400'
                  } transition-transform group-hover:scale-110`}>
                    <Plane size={16} className="rotate-45" />
                  </div>

                  {/* Hover Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Unit {drone.id}
                  </div>
                </div>
              </Marker>
            ))}
          </Map>
        </div>
      </div>
    </div>
  )
}
