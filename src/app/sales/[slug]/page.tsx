import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SalePage({ params }: Props) {
  const { slug } = await params;

  const sale = await prisma.sale.findUnique({ where: { slug } });

  if (!sale || !sale.isActive) notFound();

  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans">
      {/* Hero */}
      {sale.heroImage && (
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={sale.heroImage}
            alt={sale.name}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-10 md:left-20 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
              Limited Time Offer
            </p>
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-none">
              {sale.name}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 md:px-16 py-20">
        {!sale.heroImage && (
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-10">
            {sale.name}
          </h1>
        )}

        {sale.description && (
          <p className="text-black/60 leading-relaxed text-lg mb-12">
            {sale.description}
          </p>
        )}

        <Link
          href="/enquiry"
          className="inline-block bg-black text-white px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-black/80 transition-colors"
        >
          Book This Deal
        </Link>
      </div>
    </main>
  );
}
