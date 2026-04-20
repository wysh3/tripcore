# **SYSTEM ROLE & DIRECTIVE**

Act as a Principal UI/UX Engineer and Lead Full-Stack Architect (equivalent to a Technical Director at an Awwwards-winning studio like Lusion).  
Your objective is to build "The Art of Escape"—a Tier-1 luxury travel agency platform. This project consists of two tightly coupled domains:

1. **The Frontend (The Experience):** A hyper-fluid, WebGL-enhanced, continuous-scroll journey. It must NOT look like a traditional website with stacked sections. It is a single, uninterrupted digital canvas driven by scroll mechanics, GLSL shaders, and spring-physics micro-interactions.  
2. **The Backend (The Engine):** A robust, complex, data-heavy CMS and Booking Engine built directly into the Next.js framework using Prisma Next, managing thousands of packages, dynamic pricing, and concurrent multi-stage booking pipelines.

# **1\. CORE TECHNOLOGY STACK**

## **1.1 Frontend (The Experience)**

* **Framework:** Next.js 15 (App Router \- heavily utilizing Server Components for initial load, Client Components for WebGL/GSAP).  
* **Styling:** Tailwind CSS v3.4+ (using arbitrary values for exact pixel pushing, layered with custom utility classes).  
* **DOM Animation Orchestration:** GSAP (GreenSock) \+ ScrollTrigger. Used for complex timeline staggering, scroll-scrubbing, and horizontal scroll locks.  
* **Micro-Interactions:** Framer Motion. Used for the spring-based magnetic cursor.  
* **Smooth Scrolling:** Lenis (Studio Freight). Mandatory for buttery-smooth interpolation of the user's scroll wheel to drive GSAP and WebGL timelines.  
* **3D / WebGL Layer:** Three.js & React Three Fiber (R3F) \+ Drei.

## **1.2 Backend (The Engine)**

* **Database & ORM:** PostgreSQL accessed via Prisma Next (the new TypeScript-native engine).  
* **Authentication:** NextAuth.js (v5) / Auth.js (Role-based: SuperAdmin, Admin, User).  
* **State Management (Client):** Zustand.  
* **Asset Storage:** AWS S3 or Vercel Blob.

# **2\. GLOBAL DESIGN SYSTEM & AESTHETICS**

* **The "Sectionless" Flow:** There are no standard HTML \<section\> tags with hard background color breaks. The background is a fixed, fullscreen WebGL \<canvas\>. As the user scrolls, the shader organically morphs base colors to match the content overlay.  
* **Color Tokens (2026 Luxury Palette):**  
  * *Base Canvas:* Warm Bone (\#F5F2ED) morphing into Golden Hour Elite (\#FEF4D5).  
  * *Typography & Deep Space:* Midnight Opulence (\#1A1A2E) and Deep Charcoal (\#1A1A1A).  
  * *Accents:* Dusty Gold (\#D4AF37) for ribbon tags and active states.  
* **Typographic Deliberate Friction:**  
  * *Display:* Cormorant Garamond. High stroke contrast and hairline serifs for massive, emotional headlines.  
  * *Technical / UI:* Jost (Weight 200, Uppercase, Wide Tracking). The geometric coldness against the serif's warmth creates an editorial luxury tension.  
* **Magnetic Tactile Cursor:** A global 8px dot using Framer Motion's useMagneticPull hook. When hovering over destinations, the cursor scales up, applying mix-blend-mode: difference, and gently pulls the DOM element toward the mouse center.

# **3\. LUSION-STYLE WEBGL & MOTION PIPELINE**

To achieve absolute top-tier motion without compromising mobile performance, implement the following architectural patterns:

### **3.1 The Houdini-to-WebGL Asset Pipeline**

For any complex 3D transitions or cloth-like fluid simulations in the background, precompute the simulations in SideFX Houdini. Do not export heavy geometry caches. Instead, store positional and velocity data as 16-bit integer data packed into PNG images using LZW compression (disabling standard PNG optimization to retain full math precision). A custom vertex shader will read this PNG as a lookup table to interpolate the mesh vertices in real-time, allowing 66 frames of complex 3D animation to be driven by just 11 keyframes.

### **3.2 GLSL Liquid Mask Reveals**

Standard CSS opacity fades are banned. Images (like the "About Us" architectural shots) must emerge from the canvas using a custom GLSL shader.

* **Vertex Shader:** Calculate the distance to the center, then apply a sine wave to the Z-axis that decays as the reveal progress completes: float wave \= (1.0 \- uProgress) \* sin(distanceToCenter \* 20.0 \- uProgress \* 5.0); newPosition.z \+= wave;.  
* **Fragment Shader:** Displace the UVs using a 3D Perlin noise function (cnoise), combined with a radial gradient based on the distance from the center. Clamp and invert the value to dictate the alpha channel, making the image bleed into existence like ink in water.

### **3.3 Cinematic Post-Processing**

Apply a global post-processing pass to the R3F canvas to mimic physical film:

* **Volumetric Film Grain:** Generate simulated 3D Perlin noise. Calculate the luminance of the background pixel (luma(backgroundColor)), and reduce the noise strength in extreme highlights/shadows using smoothstep(0.05, 0.5, luminance) so the grain sits naturally in the mid-tones.  
* **Chromatic Aberration:** Displace the red and blue color channels slightly based on the pixel's distance from the center of the viewport to simulate physical lens dispersion.

### **3.4 GSAP \+ Lenis \+ Next.js 15 Synchronization**

To prevent React hydration errors and memory leaks:

1. **Single GSAP Config:** Create lib/gsapConfig.ts to register ScrollTrigger only once, checking if it exists in gsap.core.globals.  
2. **Strict Scoping:** Use the @gsap/react useGSAP hook for all DOM animations to ensure automated cleanup on unmount.  
3. **Ticker Sync:** Wrap the application in a Lenis provider. Set Lenis to autoRaf: false. Force GSAP to drive Lenis by adding it to the GSAP ticker: gsap.ticker.add((time) \=\> { lenis.raf(time \* 1000); });.  
4. Disable GSAP's lag smoothing (gsap.ticker.lagSmoothing(0)) to prevent easing conflicts between the scroll wheel and the animation timeline.

# **4\. FRONTEND ARCHITECTURE: THE CONTINUOUS SCROLL JOURNEY**

### **Phase 1: The Immersion (Hero)**

* **Visual:** Full-bleed, warm-toned architectural photography of a sun-soaked villa ("THE ART OF ESCAPE").  
* **Mechanics:** Headline enters via GSAP SplitText stagger (drifting up the Y-axis with a blur-to-focus effect). Mouse movement triggers a localized WebGL liquid displacement shader on the underlying texture.

### **Phase 2: The Organic Flow (About Us)**

* **Visual:** Typography ("ABOUT US") floats above an organically shaped, asymmetrical image of a colonial building.  
* **Mechanics:** As the user scrolls, the image doesn't slide in; it reveals itself using the GLSL Liquid Mask (Section 3.2). The text utilizes a slow, smooth parallax y transform relative to the scroll velocity.

### **Phase 3: The Horizontal Discovery (Top Packages & Destinations)**

* **Visual:** High-end travel packages ("Rajasthan Royal", "Amalfi Coast") presented as tall, elegant cards with gold ribbon pricing tags.  
* **Mechanics:**  
  * ScrollTrigger pins the main wrapper container, locking the vertical scroll.  
  * The user's vertical mouse wheel input is translated into a horizontal x translation of the package cards.  
  * Hovering a card triggers the Framer Motion magnetic cursor and applies a subtle R3F MeshTransmissionMaterial glass distortion to the card itself.

### **Phase 4: The Serene Conclusion (Services & Connect)**

* **Visual:** A sharp typographic grid for "Services" melting into the dark, gold-accented "LET'S CONNECT" footer.  
* **Mechanics:** The global WebGL background shader slowly transitions its base uniform color from the warm bone \#F5F2ED to the deep midnight \#1A1A2E. The "Testimonials" feature translucent glassmorphism cards that stack and peel away on the Z-axis as the user reaches the bottom.

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

*Begin execution by providing the complete schema.prisma file and the lib/gsapConfig.ts file.*

#### **Works cited**

1\. 9 Luxury Color Palettes That Define High-End Design in 2025 \- Brandlic, https://brandlic.studio/9-luxury-color-palettes-that-define-high-end-design-in-2025/ 2\. 10 Font Pairings So Good They Feel Like a Secret \- DEV Community, https://dev.to/web\_dev-usman/10-font-pairings-so-good-they-feel-like-a-secret-8c3 3\. Introducing magnetic and zoning features in Motion+ Cursor \- Motion Magazine, https://motion.dev/magazine/introducing-magnetic-cursors-in-motion-cursor 4\. Case Study of Lusion by Lusion: Winner of Site of the Month May \- Awwwards, https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html 5\. How to Code a Shader Based Reveal Effect with React Three Fiber & GLSL | Codrops, https://tympanus.net/codrops/2024/12/02/how-to-code-a-shader-based-reveal-effect-with-react-three-fiber-glsl/ 6\. mattdesl/glsl-film-grain: natural looking film grain using noise functions \- GitHub, https://github.com/mattdesl/glsl-film-grain 7\. Optimizing GSAP Animations in Next.js 15: Best Practices for Initialization and Cleanup | by Thomas Augot | Medium, https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232 8\. How to implement Lenis in Next.js \- Bridger Tower, https://bridger.to/lenis-nextjs
