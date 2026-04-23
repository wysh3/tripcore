export const dynamic = "force-dynamic";
import { Plus, Tag } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SaleCardActions } from "../components/SaleCardActions";

export default async function SalesPage() {
  const sales = await prisma.sale.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Sales & Offers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage promotional campaigns and seasonal sales.</p>
        </div>
        <Link 
          href="/dashboard/sales/new" 
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Sale
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sales.length === 0 ? (
          <div className="col-span-full py-12 bg-white rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
            No sales campaigns found. Start by creating your first one.
          </div>
        ) : (
          sales.map((sale) => (
            <div key={sale.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
              <div className="h-40 bg-gray-100 relative overflow-hidden">
                {sale.heroImage ? (
                  <img src={sale.heroImage} alt={sale.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tag className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    sale.isActive 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}>
                    {sale.isActive ? "Active" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{sale.name}</h3>
                <p className="text-xs text-gray-400 font-mono mb-3">/{sale.slug}</p>
                <p className="text-sm text-gray-600 line-clamp-2 flex-1">{sale.description || "No description provided."}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <SaleCardActions saleId={sale.id} isActive={sale.isActive} />
                  <Link href={`/dashboard/sales/edit/${sale.id}`} className="text-sm font-semibold text-gray-900 hover:underline">
                    Edit Sale
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
