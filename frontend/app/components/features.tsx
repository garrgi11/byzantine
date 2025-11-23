export function Features() {
  return (
    <section className="bg-gradient-to-b from-background to-sky-50 px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-4xl font-bold tracking-tight">
          Complete airspace awareness in one platform
        </h2>

        {/* Feature Pills */}
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <div className="rounded-full border-2 border-sky-300 bg-sky-50 px-6 py-3 text-center text-lg font-bold text-sky-900 shadow-sm transition-all hover:shadow-md hover:scale-105">
            🎙 Voice communications
          </div>
          <div className="rounded-full border-2 border-sky-300 bg-sky-50 px-6 py-3 text-center text-lg font-bold text-sky-900 shadow-sm transition-all hover:shadow-md hover:scale-105">
            📡 ADS-B Tracking
          </div>
          <div className="rounded-full border-2 border-sky-300 bg-sky-50 px-6 py-3 text-center text-lg font-bold text-sky-900 shadow-sm transition-all hover:shadow-md hover:scale-105">
            🛸 Drone Detection
          </div>
          <div className="rounded-full border-2 border-sky-300 bg-sky-50 px-6 py-3 text-center text-lg font-bold text-sky-900 shadow-sm transition-all hover:shadow-md hover:scale-105">
            ✈️ Airspace Data
          </div>
        </div>

        {/* Connection diagram */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border-2 border-sky-400 bg-gradient-to-br from-sky-100 to-blue-100 px-10 py-6 shadow-xl">
            <span className="text-3xl">🛰️</span>
            <span className="text-3xl font-bold tracking-tight text-sky-900">PATTERN</span>
            <span className="text-3xl">📡</span>
          </div>
        </div>

        <p className="text-center text-lg leading-relaxed text-foreground">
          Pattern is the unified platform for airport professionals to monitor ATC activity and airspace. 
          It seamlessly aggregates{" "}
          <span className="font-semibold text-sky-700">voice communications, ADS-B radar data, drone detection,</span> and{" "}
          <span className="font-semibold text-sky-700">flight tracking information</span> into a single, comprehensive system for
          real-time awareness and historical analysis.
        </p>
      </div>
    </section>
  )
}
