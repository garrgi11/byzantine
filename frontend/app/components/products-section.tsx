export function ProductsSection() {
  return (
    <section className="bg-gradient-to-b from-red-900 to-amber-900 px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-12">
          {/* Drones */}
          <div className="flex flex-col">
            <div className="h-96 bg-gradient-to-br from-gray-800 to-black rounded-lg mb-8 flex items-center justify-center border border-orange-900">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center px-4">Drone Image</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Drones</h3>
            <p className="text-gray-300 leading-relaxed">
              Versatile drones equipped with advanced sensors and thermal imaging. Knighthawk: American-made drone for
              rapid response and reliability.
            </p>
          </div>

          {/* Paladin EXT */}
          <div className="flex flex-col">
            <div className="h-96 bg-gradient-to-br from-gray-800 to-black rounded-lg mb-8 flex items-center justify-center border border-orange-900">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center px-4">Paladin EXT</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Paladin EXT</h3>
            <p className="text-gray-300 leading-relaxed">
              Enables LTE cellular service for extended drone range and reliable operations.
            </p>
          </div>

          {/* Watchtower */}
          <div className="flex flex-col">
            <div className="h-96 bg-gradient-to-br from-gray-800 to-black rounded-lg mb-8 flex items-center justify-center border border-orange-900">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center px-4">Dashboard UI</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Watchtower</h3>
            <p className="text-gray-300 leading-relaxed">
              Command and control software providing real-time drone management and situational awareness.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
