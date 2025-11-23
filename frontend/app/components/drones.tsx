"use client"

import { useEffect, useRef, useState } from 'react'

export function DronesSection() {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!videoContainerRef.current || !contentRef.current) return
      
      const rect = contentRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Trigger when section is in view
      if (rect.top < windowHeight * 0.8 && !isVisible) {
        setIsVisible(true)
        contentRef.current.classList.add('animate-slide-in-left')
        videoContainerRef.current.classList.add('animate-slide-in-right')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <section className="bg-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="opacity-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              We Send Autonomous Drones to 911 Calls
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
              Paladin is the all-in-one Drone as First Responder (DFR) solution for Public Safety.
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-orange-500">90 sec</div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Average response time once a 911 call comes in</p>
              </div>
              <div className="hidden sm:block text-gray-300">/</div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-orange-500">670+</div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Emergency calls supported per client</p>
              </div>
              <div className="hidden sm:block text-gray-300">/</div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-orange-500">30,000+</div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Miles logged by clients</p>
              </div>
            </div>
          </div>

          {/* Right - Video Container */}
          <div 
            ref={videoContainerRef}
            className="relative bg-black rounded-2xl aspect-square overflow-hidden opacity-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(1.3) contrast(1.1)' }}
            >
              <source src="/drone-landing-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-orange-900/40" />
          </div>
        </div>
      </div>
    </section>
  )
}
