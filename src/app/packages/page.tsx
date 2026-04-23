import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans">
      <div className="py-24 px-10 md:px-20">
        <h1 className="text-[7vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-black/90 uppercase mb-16">
          ALL PACKAGES
        </h1>

        {packages.length === 0 ? (
          <p className="text-black/40 text-lg">
            No packages available yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Link key={pkg.id} href={`/packages/${pkg.slug}`}>
                <div className="group relative rounded-2xl overflow-hidden bg-white aspect-[10/13] cursor-pointer">
                  <img
                    src={pkg.mainImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/50 text-[9px] uppercase tracking-widest mb-1">
                      {pkg.destination} · {pkg.durationDays}D
                    </p>
                    <h3 className="text-2xl font-serif text-white leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-2">
                      From ₹{pkg.sellingPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
