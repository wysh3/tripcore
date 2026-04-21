import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Art of Escape | Luxury Travel Agency",
  description: "A hyper-fluid, WebGL-enhanced journey through the world's most exclusive destinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${roboto.variable}`}>
      <body className="antialiased selection:bg-accent-gold selection:text-white overflow-x-hidden">
        <Providers>
          <CustomScrollbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
