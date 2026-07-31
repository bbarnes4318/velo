import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VelocityRE.pro | Off-Market Seller Conversations for Realtors",
  description:
    "We identify off-market seller opportunities, create property-specific conversations, and help real estate agents generate listing appointments.",
  keywords: [
    "predictive seller opportunities",
    "real estate seller leads",
    "listing agent prospecting",
    "pre-MLS seller opportunities",
    "protected real estate territory",
  ],
  authors: [{ name: "VelocityRE.pro" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body style={{ margin: 0, padding: 0, fontFamily: "var(--font-plus-jakarta), Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
