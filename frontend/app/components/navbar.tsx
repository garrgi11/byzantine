"use client"

export function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white rounded flex items-center justify-center">
            <div className="text-black font-bold text-sm">N</div>
          </div>
          <div className="text-xl font-bold text-white tracking-wide">NEOGUARD</div>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-8">
          <button className="text-white text-sm font-medium hover:text-orange-500 transition-colors">Products</button>
          <button className="text-white text-sm font-medium hover:text-orange-500 transition-colors">The FAA</button>
          <button className="text-white text-sm font-medium hover:text-orange-500 transition-colors">About Us</button>
          <button className="text-white text-sm font-medium hover:text-orange-500 transition-colors">Blog</button>
          <button className="text-white text-sm font-medium hover:text-orange-500 transition-colors">Contact</button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded text-sm font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}
