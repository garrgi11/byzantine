"use client"

export function MapSection() {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7.711"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 20l5.447-2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.553-.894L15 7.711"
              />
            </svg>
            <p className="text-sm font-medium">Network Map</p>
            <p className="text-xs">Real-time drone locations</p>
          </div>
        </div>
      </div>
    </div>
  )
}
