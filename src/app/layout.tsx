import type { Metadata, Viewport } from "next";
import { Playfair_Display, Mea_Culpa, Cinzel_Decorative, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  subsets: ["latin"],
});

const meaCulpa = Mea_Culpa({
  weight: "400",
  variable: "--font-mea",
  subsets: ["latin"],
});

const cinzelDeco = Cinzel_Decorative({
  weight: "400",
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROSHAN & THISURI | The Emerald Botanical Luxe Wedding",
  description: "You are cordially invited to celebrate the love and union of Roshan & Thisuri on Saturday, December 12, 2026 at The Grand Ballroom, Shangri-La Colombo. Theme: The Emerald Botanical Luxe. Powered by Knexa System.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${meaCulpa.variable} ${cinzelDeco.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-[#02120b] text-[#fdfbf7]">
        {children}
      </body>
    </html>
  );
}


