"use client"

export function RespondsToSection() {
  const categories = [
    { title: "Active Fires", image: "/active-fires.jpeg" },
    { title: "Mass Casualty Incident", image: "/mass-casualty-incident.jpeg" },
    { title: "Traffic Violations", image: "/traffic-violation.jpeg" },
    { title: "Car Crashes", image: "/car-crashes.jpeg" },
    { title: "SWAT & Technical", image: "/swat-and-technical.jpeg" },
    { title: "Fleeing Suspect", image: "/fleeing-suspect.jpeg" },
    { title: "Natural Disasters", image: "/natural-disasters.jpeg" },
  ]

  // Duplicate the array for seamless loop
  const duplicatedCategories = [...categories, ...categories]

  return (
    <section className="bg-white pb-20 px-8 overflow-hidden">
      <div className="mx-auto max-w-6xl mb-16">
        <h2 className="text-5xl font-bold text-center">We Respond To...</h2>
      </div>

      {/* Scrolling Container */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left">
          {duplicatedCategories.map((category, index) => (
            <div key={`${category.title}-${index}`} className="flex-shrink-0 w-64">
              <div className="bg-gray-900 rounded-2xl aspect-square mb-4 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-black text-center">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
