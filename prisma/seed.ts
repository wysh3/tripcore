import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Clear existing data
  await prisma.booking.deleteMany({});
  await prisma.package.deleteMany({});
  await prisma.destination.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.homepageSetting.deleteMany({});
  await prisma.sale.deleteMany({});

  // 2. Destinations
  const destJaipur = await prisma.destination.create({
    data: {
      country: "India",
      city: "Jaipur",
      region: "Rajasthan",
      description: "The Pink City, known for its royal palaces and majestic forts.",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
    },
  });

  const destMaldives = await prisma.destination.create({
    data: {
      country: "Maldives",
      city: "Male",
      region: "Indian Ocean",
      description: "A tropical haven of white sand beaches and crystal clear waters.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    },
  });

  const destTuscany = await prisma.destination.create({
    data: {
      country: "Italy",
      region: "Tuscany",
      description: "Rolling hills, world-class wine, and Renaissance art.",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop",
    },
  });

  const destSwiss = await prisma.destination.create({
    data: {
      country: "Switzerland",
      region: "Alps",
      description: "Breathtaking mountain peaks, serene lakes, and luxury resorts.",
      image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965&auto=format&fit=crop",
    },
  });

  const destAmalfi = await prisma.destination.create({
    data: {
      country: "Italy",
      city: "Positano",
      region: "Amalfi Coast",
      description: "Cliffside villages overlooking the sparkling Mediterranean Sea.",
      image: "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=2070&auto=format&fit=crop",
    },
  });

  const destLeh = await prisma.destination.create({
    data: {
      country: "India",
      city: "Leh",
      region: "Ladakh",
      description: "High-altitude desert landscapes and ancient Buddhist monasteries.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    },
  });

  // 3. Packages
  const pkg1 = await prisma.package.create({
    data: {
      title: "Rajasthan Royal Retreat",
      slug: "rajasthan-royal-retreat",
      destination: "Jaipur, India",
      durationDays: 7,
      maxPersons: 12,
      tourCategory: "Luxury",
      mainImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
      shortDescription: "Experience the grandeur of Rajasthan with stays in authentic royal palaces.",
      highlights: "Stay in heritage hotels\nPrivate guided tours of forts\nExclusive desert safari",
      sellingPrice: 125000,
      originalPrice: 150000,
      discountLabel: "15% Off",
      isCustomizable: true,
      flightsIncluded: false,
      bestPriceGuarantee: true,
      itinerary: [
        { title: "Arrival in Jaipur", duration: "Day 1", description: "Welcome to the Pink City." },
        { title: "Palace Tour", duration: "Day 2", description: "Explore the Amber Fort and City Palace." },
      ],
      galleryImages: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
    },
  });

  const pkg2 = await prisma.package.create({
    data: {
      title: "Amalfi Coast Elegance",
      slug: "amalfi-coast-elegance",
      destination: "Positano, Italy",
      durationDays: 5,
      maxPersons: 8,
      tourCategory: "Honeymoon",
      mainImage: "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=2070&auto=format&fit=crop",
      shortDescription: "A romantic getaway along the stunning cliffs of the Amalfi Coast.",
      sellingPrice: 280000,
      isCustomizable: true,
      flightsIncluded: true,
    },
  });

  const pkg3 = await prisma.package.create({
    data: {
      title: "Tuscan Hills Villa Stay",
      slug: "tuscan-hills-villa-stay",
      destination: "Florence, Italy",
      durationDays: 8,
      maxPersons: 10,
      tourCategory: "Leisure",
      mainImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop",
      shortDescription: "Relax in a private villa surrounded by vineyards and olive groves.",
      sellingPrice: 320000,
      bestPriceGuarantee: true,
    },
  });

  const pkg4 = await prisma.package.create({
    data: {
      title: "Himalayan Peak Expedition",
      slug: "himalayan-peak-expedition",
      destination: "Leh, India",
      durationDays: 10,
      maxPersons: 15,
      tourCategory: "Adventure",
      mainImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
      shortDescription: "A thrilling journey through the rugged terrains of Ladakh.",
      sellingPrice: 85000,
      isCustomizable: false,
      flightsIncluded: false,
    },
  });

  const pkg5 = await prisma.package.create({
    data: {
      title: "Maldivian Ocean Villa",
      slug: "maldivian-ocean-villa",
      destination: "Male, Maldives",
      durationDays: 6,
      maxPersons: 2,
      tourCategory: "Honeymoon",
      mainImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
      shortDescription: "Wake up to the sound of the ocean in your private overwater villa.",
      sellingPrice: 450000,
      flightsIncluded: true,
      bestPriceGuarantee: true,
    },
  });

  const pkg6 = await prisma.package.create({
    data: {
      title: "Swiss Alps Winter Retreat",
      slug: "swiss-alps-winter-retreat",
      destination: "Zurich, Switzerland",
      durationDays: 7,
      maxPersons: 6,
      tourCategory: "Luxury",
      mainImage: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965&auto=format&fit=crop",
      shortDescription: "Experience world-class skiing and luxury alpine resorts.",
      sellingPrice: 380000,
      isCustomizable: true,
    },
  });

  // 4. Reviews (Testimonials)
  await prisma.review.create({
    data: {
      customerName: "Alexander Davies",
      rating: 5,
      text: "A truly bespoke travel experience. The meticulous planning brought our dream vacation to life with a fresh and impactful vision.",
      destinationId: destJaipur.id,
    },
  });

  await prisma.review.create({
    data: {
      customerName: "Eleanor Vance",
      rating: 5,
      text: "Their vision completely transformed our honeymoon. The depth and precision in their itinerary curation are unmatched.",
      packageId: pkg2.id,
    },
  });

  await prisma.review.create({
    data: {
      customerName: "Chen Wei",
      rating: 5,
      text: "Professionalism, creativity, and incredible execution. They did not just plan a trip, they designed an experience.",
      destinationId: destTuscany.id,
    },
  });

  await prisma.review.create({
    data: {
      customerName: "Chloe Isabella",
      rating: 4,
      text: "Flawless execution that brought our luxury escape to life in ways we never imagined. The villa selection was pristine.",
      packageId: pkg5.id,
    },
  });

  await prisma.review.create({
    data: {
      customerName: "Marcus Webb",
      rating: 5,
      text: "An extraordinary journey. Every detail was considered, every moment crafted with intentionality and grace.",
      destinationId: destSwiss.id,
    },
  });

  // 5. Active Sales
  await prisma.sale.create({
    data: {
      name: "Summer European Elegance",
      slug: "summer-europe",
      description: "Exclusive access to our curated European itineraries with complimentary flight upgrades and private transfers for bookings made this month.",
      heroImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop",
      isActive: true,
    },
  });

  // 6. Homepage Settings
  await prisma.homepageSetting.create({
    data: {
      key: 'hero_bg',
      value: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=2070&auto=format&fit=crop'
    }
  });

  console.log("Database restored and seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
