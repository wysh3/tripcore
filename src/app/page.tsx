import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { TopPackages } from "@/components/sections/TopPackages";
import { Destinations } from "@/components/sections/Destinations";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <AboutUs />
      <TopPackages />
      <Destinations />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  );
}
