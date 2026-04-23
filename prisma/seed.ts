import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

console.log('--- SEED STARTING ---');

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning database...');
  await prisma.package.deleteMany({})
  await prisma.destination.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.homepageSetting.deleteMany({})

  console.log('Seeding destinations...');
  await prisma.destination.create({
    data: {
      city: 'Udaipur',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1590050752117-23a9d7f66c42?auto=format&fit=crop&q=80',
    }
  })

  console.log('Seeding packages...');
  await prisma.package.createMany({
    data: [
      {
        title: 'Royal Rajasthan Heritage',
        slug: 'royal-rajasthan',
        destination: 'Rajasthan, India',
        durationDays: 7,
        mainImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80',
        sellingPrice: 75000,
        shortDescription: 'Experience the grandeur of palaces and fortresses.',
        tourCategory: 'Luxury',
      },
      {
        title: 'Mediterranean Bliss',
        slug: 'mediterranean-bliss',
        destination: 'Santorini, Greece',
        durationDays: 5,
        mainImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80',
        sellingPrice: 125000,
        shortDescription: 'Sun-drenched views and white-washed wonders.',
        tourCategory: 'Premium',
      }
    ]
  })

  console.log('Seeding reviews and settings...');
  await prisma.review.create({
    data: {
      customerName: 'Aarav Sharma',
      text: 'The Rajasthan tour was absolutely breathtaking. Every detail was handled with perfection.',
      rating: 5,
    }
  })

  await prisma.homepageSetting.create({
    data: {
      key: 'hero_bg',
      value: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80'
    }
  })

  console.log('--- SEED COMPLETED SUCCESSFULLY ---')
}

main()
  .catch((e) => {
    console.error('SEED ERROR:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
