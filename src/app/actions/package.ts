"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPackage(formData: any) {
  try {
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newPackage = await prisma.package.create({
      data: {
        title: formData.title,
        slug,
        destination: formData.destination,
        durationDays: Number(formData.durationDays),
        maxPersons: Number(formData.maxPersons),
        tourCategory: formData.tourCategory,
        tourTypes: formData.tourTypes, // Added
        accommodation: formData.accommodation, // Added
        citiesRoute: formData.citiesRoute, // Added
        ageRange: formData.ageRange,
        isCustomizable: formData.isCustomizable,
        flightsIncluded: formData.flightsIncluded,
        bestPriceGuarantee: formData.bestPriceGuarantee,
        mainImage: formData.mainImage || "",
        mapImage: formData.mapImage,
        shortDescription: formData.shortDescription || "",
        highlights: formData.highlights,
        specialNotes: formData.specialNotes,
        tags: formData.tags,
        sellingPrice: Number(formData.sellingPrice) || 0,
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        discountLabel: formData.discountLabel,
        pdfBrochure: formData.pdfBrochure,
        itinerary: formData.itineraryDays,
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        cancellationPolicy: formData.cancellationPolicy,
        galleryImages: formData.galleryImages,
        departureType: formData.departureType,
        departurePoints: formData.departurePoints,
        departures: {
          create: formData.departures
            .filter((d: any) => d.startDate)
            .map((d: any) => ({
              startDate: new Date(d.startDate),
              seatsLeft: Number(d.seatsLeft) || 0,
              dynamicPrice: d.priceOverride ? Number(d.priceOverride) : null,
            })),
        },
      },
    });

    // Create Activity Log
    await prisma.activityLog.create({
      data: {
        action: "Package Created",
        details: `New package "${formData.title}" was added to the platform.`
      }
    });

    revalidatePath("/dashboard/packages");
    revalidatePath("/dashboard");
    return { success: true, id: newPackage.id };
  } catch (error) {
    console.error("Error creating package:", error);
    return { success: false, error: "Failed to create package" };
  }
}
