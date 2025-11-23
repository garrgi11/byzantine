"use client"

import { useEffect, useRef, useState } from 'react'

export function ConnectivitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      if (rect.top < windowHeight * 0.7 && !isVisible) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-gray-900 via-gray-800 to-black px-8 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className={`text-5xl font-bold text-white text-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Extend Your Range with <br />
          Cellular Connectivity
        </h2>

        {/* Range Visualization Chart */}
        <div className="relative mb-16">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex justify-between px-4">
            {[0, 0.5, 1, 3, 4, 5].map((mile, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-64 w-px bg-white/20"></div>
                <span className="text-xs text-gray-400 mt-2 font-medium">{mile} mi</span>
              </div>
            ))}
          </div>

          {/* Range Bars */}
          <div className="relative pt-8 pb-16">
            {/* Radio Frequency Bar (short) */}
            <div className="relative mb-12">
              <div 
                className={`h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-r-lg shadow-lg border border-gray-600 transition-all duration-1000 ${
                  isVisible ? 'w-[16.67%]' : 'w-0'
                }`}
              >
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📡</span>
                    <div>
                      <div className="text-sm font-bold text-white">Radio Frequency</div>
                      <div className="text-xs text-gray-400">.5 miles range</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cellular Bar (long) */}
            <div className="relative">
              <div 
                className={`h-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-r-lg shadow-lg shadow-orange-500/20 border border-orange-400 transition-all duration-1500 delay-300 ${
                  isVisible ? 'w-full' : 'w-0'
                }`}
              >
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 border border-orange-500 rounded-lg px-4 py-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📶</span>
                    <div>
                      <div className="text-sm font-bold text-orange-400">With Cellular</div>
                      <div className="text-xs text-gray-300">5+ miles range</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📡</span>
              <h4 className="text-lg font-bold text-white">Radio Frequency</h4>
            </div>
            <p className="text-gray-300 text-sm">
              The limitations of radio frequency range being only .5 miles max.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-orange-500/30 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📶</span>
              <h4 className="text-lg font-bold text-orange-400">Extended Range</h4>
            </div>
            <p className="text-gray-300 text-sm">
              With LTE you get unlimited range — 3—5 miles on a single charge.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🚁</span>
              <h4 className="text-lg font-bold text-white">Autonomous Deployment</h4>
            </div>
            <p className="text-gray-300 text-sm">
              With LTE-enabled drones, you can deploy autonomously from any location.
            </p>
          </div>
        </div>

        {/* T-Mobile Partnership */}
        <div className="text-center text-sm text-gray-400">
          With a partnership with T-Mobile drones can last even further.{" "}
          <span className="font-bold text-white">T-MOBILE FOR GOVERNMENT</span>
        </div>
      </div>
    </section>
  )
}
