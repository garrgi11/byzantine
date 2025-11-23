"use client"

export function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 bg-white rounded flex items-center justify-center">
            <div className="text-black font-bold text-xs sm:text-sm">N</div>
          </div>
          <div className="text-lg sm:text-xl font-bold text-white tracking-wide">NEOGUARD</div>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <button className="hidden md:block text-white text-xs sm:text-sm font-medium hover:text-orange-500 transition-colors">Products</button>
          <button className="hidden md:block text-white text-xs sm:text-sm font-medium hover:text-orange-500 transition-colors">The FAA</button>
          <button className="hidden lg:block text-white text-xs sm:text-sm font-medium hover:text-orange-500 transition-colors">About Us</button>
          <button className="hidden lg:block text-white text-xs sm:text-sm font-medium hover:text-orange-500 transition-colors">Blog</button>
          <button className="hidden md:block text-white text-xs sm:text-sm font-medium hover:text-orange-500 transition-colors">Contact</button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}
