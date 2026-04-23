export const dynamic = "force-dynamic";
import { TopPackages } from "@/components/sections/TopPackages";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { Destinations } from "@/components/sections/Destinations";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { prisma } from "@/lib/prisma";
import type { Package, Destination, Review, HomepageSetting } from "@prisma/client";

export default async function Home() {
  const [rawPackages, rawDestinations, rawReviews, settingsData] =
    await Promise.all([
      prisma.package.findMany({ take: 10, orderBy: { id: "desc" } }),
      prisma.destination.findMany({ take: 6, orderBy: { id: "asc" } }),
      prisma.review.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.homepageSetting.findMany(),
    ]);

  const settings = settingsData.reduce(
    (acc: Record<string, string>, curr: HomepageSetting) => {
      acc[curr.key] = curr.value;
      return acc;
    },
    {}
  );

  const packages = rawPackages.map((p: Package) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: p.sellingPrice ? `₹${p.sellingPrice.toLocaleString("en-IN")}` : "Contact us",
    location: p.destination || "",
    image: p.mainImage || "/images/rajasthan.png",
  }));

  const destinations = rawDestinations.map((d: Destination) => ({
    title: d.city ? `${d.city}, ${d.country}` : d.country,
    image: d.image || "/images/rajasthan.png",
    category: d.country.toLowerCase() === "india" ? "Domestic" : "International",
  }));

  const reviews = rawReviews.map((r: Review) => ({
    id: r.id,
    name: r.customerName,
    role: "Traveller",
    location: "Verified Guest",
    content: r.text || "An unforgettable journey.",
    image: "/images/rajasthan.png",
  }));

  return (
    <main className="relative">
      <Navbar />
      <Hero backgroundImage={settings.hero_bg} />
      <AboutUs bannerImage={settings.feature_banner} />
      <TopPackages packages={packages} />
      <Destinations destinations={destinations} />
      <Services />
      <Testimonials reviews={reviews} />
      <Footer />
    </main>
  );
}
