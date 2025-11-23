import { Navbar } from "./components/navbar"
import { HeroSection } from "./components/hero"
import { RespondsToSection } from "./components/respond-to-section"
import { DronesSection } from "./components/drones"
import { PlatformSection } from "./components/platform-section"
import { ProductsSection } from "./components/products-section"
import { SolutionSection } from "./components/solution-section"
import { ConnectivitySection } from "./components/connectivity-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Video Background Container for Navbar + Hero */}
      <div className="relative overflow-hidden bg-black">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{ filter: 'brightness(1.3) contrast(1.1)' }}
        >
          <source src="/drone-landing-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay with orange gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-orange-900/50" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
        </div>
      </div>

      <DronesSection />
      <RespondsToSection />
      <SolutionSection />
      {/* <PlatformSection /> */}
      {/* <ProductsSection /> */}
      <ConnectivitySection />
    </main>
  )
}
