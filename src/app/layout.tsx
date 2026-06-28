import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Triple Point Coffee | Specialty Coffee Experience",
  description:
    "A sanctuary for the discerning palate. Single-origin beans, meticulous extraction, and an atmosphere crafted for unhurried moments.",
  keywords: [
    "specialty coffee",
    "triple point coffee",
    "artisan cafe",
    "pour over",
    "espresso",
  ],
  openGraph: {
    title: "Triple Point Coffee",
    description: "Where precision meets warmth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-espresso-950 font-sans text-cream-100 antialiased">
        {children}
      </body>
    </html>
  );
}
