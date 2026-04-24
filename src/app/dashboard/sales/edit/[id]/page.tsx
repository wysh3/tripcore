import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SaleEditForm from "./SaleEditForm";


interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSalePage({ params }: Props) {
  const { id } = await params;

  const sale = await prisma.sale.findUnique({
    where: { id },
  });

  if (!sale) {
    notFound();
  }

  const serializedSale = {
    id: sale.id,
    name: sale.name,
    description: sale.description || "",
    heroImage: sale.heroImage || "",
    isActive: sale.isActive ? "true" : "false",
  };

  return <SaleEditForm sale={serializedSale} />;
}
