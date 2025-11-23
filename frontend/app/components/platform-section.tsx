export function PlatformSection() {
  return (
    <section className="bg-gradient-to-b from-amber-900 to-red-900 px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-white mb-16 text-center">
          One Platform for <span className="text-orange-400">All Your Needs</span>
        </h2>

        <div className="grid grid-cols-2 gap-12">
          {/* Dock Card */}
          <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-lg p-12 flex flex-col items-center text-center">
            <div className="w-48 h-48 bg-gray-700 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-gray-500 text-sm">3D Dock Image</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Dock</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              DJI Dock 1: Docking station for autonomous or manual deployment & recharging.
            </p>
          </div>

          {/* FAA Compliance Card */}
          <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-lg p-12 flex flex-col items-center text-center">
            <div className="w-48 h-48 bg-gray-700 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-gray-500 text-sm">FAA Document Image</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">FAA Compliance</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              End-to-end support for securing COAs, BVLOS waivers, and ongoing FAA compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
