
# **5\. BACKEND & DATABASE ARCHITECTURE (PRISMA NEXT)**

*The backend relies on the newly rewritten TypeScript-native Prisma Next engine to handle high-concurrency booking logic.*

## **5.1 The Core Package Engine**

`model Package {`  
  `id                String   @id @default(cuid())`  
  `title             String   // e.g., "Amalfi Coast"`  
  `slug              String   @unique`  
  `durationDays      Int`  
    
  `// Pricing & Toggles`  
  `sellingPrice      Float`  
  `isCustomizable    Boolean  @default(false)`  
  `flightsIncluded   Boolean  @default(false)`  
    
  `// Content`  
  `mainImage         String`  
  `shortDescription  Text`  
    
  `// Relations`  
  `departures        DepartureDate`  
  `bookings          Booking`  
    
  `@@map("packages")`  
`}`

`model DepartureDate {`  
  `id           String   @id @default(cuid())`  
  `packageId    String`  
  `package      Package  @relation(fields: [packageId], references: [id], onDelete: Cascade)`  
  `startDate    DateTime`  
  `seatsLeft    Int`  
  `dynamicPrice Float?`  
`}`

## **5.2 High-Concurrency Booking (Optimistic Concurrency Control)**

Because luxury packages (like specific villas) are highly contested, the system must use version-based locking to prevent double-booking during checkout without locking the entire database table.  
`model LuxuryInventoryItem {`  
  `id          String   @id @default(cuid())`  
  `packageId   String`  
  `type        String   // e.g., 'VILLA_SUITE'`  
  `version     Int      @default(1) // Used for OCC locking`  
  `claimedById String?`  
  `claimedBy   User?    @relation(fields:, references: [id])`  
`}`

`model Booking {`  
  `id              String   @id @default(cuid())`  
  `userId          String`  
  `user            User     @relation(fields: [userId], references: [id])`  
  `status          String   @default("PENDING") // PENDING, CONFIRMED`  
  `totalAmount     Float`  
  `createdAt       DateTime @default(now())`  
`}`

*Note for implementation: When processing a booking, the update query MUST include where: { id: itemId, version: currentVersion } and data: { version: { increment: 1 } }. If it fails, the item was snagged by another user.*

# **6\. EXECUTION DIRECTIVE (HOW TO BUILD THIS)**

*AI Assistant, process this prompt and execute the build in the following strict order:*

1. **Phase 1: Foundation & Data Layer.** Initialize Next.js 15\. Set up Tailwind, Prisma Next, and the database schema.  
2. **Phase 2: The WebGL Canvas.** Establish the global R3F \<Canvas\> in the root layout. Implement the Volumetric Film Grain and Chromatic Aberration post-processing stack.  
3. **Phase 3: GSAP/Lenis Sync.** Create lib/gsapConfig.ts. Wrap the application in the Lenis provider with autoRaf: false and inject the GSAP ticker synchronization logic.  
4. **Phase 4: The Liquid Flow.** Build the frontend "Act" components (Hero, About Us, Top Packages horizontal slider). Use the useGSAP hook for all DOM staggering and implement the GLSL liquid mask shader for image reveals.  
5. **Phase 5: Tactile Interactions.** Add the Framer Motion magnetic cursor.
