import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display } from "next/font/google";
import "@/styles/globals.scss";
import LayoutClient from "@/components/layout/LayoutClient";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "KRINOK | Creative Agency",
  description: "We are turning ordinary into breathtaking. Thinkers and Makers - Creative Company.",
  keywords: ["creative agency", "digital experience", "immersive shows", "brand content"],
  openGraph: {
    title: "KRINOK | Creative Agency",
    description: "We are turning ordinary into breathtaking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${playfairDisplay.variable}`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

