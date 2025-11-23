"use client"

import { useEffect, useRef, useState } from 'react'

export function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress through the section
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Start when section enters viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Calculate progress (0 to 1) as user scrolls through section
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight / 2)))
        
        // Map progress to steps (0-3 for steps 1-4)
        const step = Math.floor(scrollProgress * 4)
        setActiveStep(Math.min(step, 3))
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const steps = [
    {
      title: "Spoon Agent Awakens",
      description: "Drone is deployed from department"
    },
    {
      title: "Consensus En Route",
      description: "Drone gets deployed from department"
    },
    {
      title: "Vision & Verification",
      description: "Drone gets placed in route"
    },
    {
      title: "on-Chain Finality",
      description: "Pilot hits the \"return to home\" button & drone returns"
    }
  ]

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-slate-900 via-orange-950 to-black px-4 sm:px-6 md:px-8 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="flex flex-col">
            <p className="text-orange-400 text-sm font-semibold mb-2 uppercase tracking-wider">All-in-one NeoGuard DePIN Technology</p>
            <p className="text-gray-300 text-base mb-8">Revolutionizing Disaster Response with Spoon OS & Neo N3.</p>

            <div className="relative bg-black rounded-lg h-96 overflow-hidden border-2 border-orange-900">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/Futuristic_Drone_Lands_On_Logo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right: Process Steps */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 mb-6 sm:mb-8">
              An Autonomous <span className="text-orange-400">Sentinel Grid</span>
            </h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex gap-6 items-start transition-all duration-500 ${
                    activeStep >= index ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div 
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-500 ${
                      activeStep === index 
                        ? 'bg-orange-500 scale-110 shadow-lg shadow-orange-500/50' 
                        : activeStep > index
                        ? 'bg-orange-700'
                        : 'bg-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
                      activeStep >= index ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`transition-colors duration-500 ${
                      activeStep >= index ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
