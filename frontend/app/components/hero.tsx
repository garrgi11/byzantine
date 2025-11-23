"use client"

import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-slide-up">
            Building the Future
            <br />
            <span className="text-orange-500">of First Response</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4 animate-slide-up-delay">
            Equipped with the latest in LTE-enabled drone technology, First Responders can increase their situational
            awareness, operate more effectively, and save lives.
          </p>
        </div>

        <Link href="/dashboard">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded text-base sm:text-lg font-medium transition-all hover:scale-105 animate-fade-in-delay">
            Get Started →
          </button>
        </Link>
      </div>
    </section>
  )
}
