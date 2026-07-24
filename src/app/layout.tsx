import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import NativeCallBridge from "./components/NativeCallBridge";
import "./globals.css";
import "./process-section.css";
import "./outcome-section.css";
import "./results-section.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VelocityRE.pro | Predictive Seller Leads With a Closing Guarantee",
  description:
    "Reach likely home sellers before they list. Get 50 or 100 contact-ready seller opportunities, protected territory, and a closing guarantee under program terms.",
  keywords: [
    "predictive seller leads",
    "real estate seller leads",
    "likely to list homeowners",
    "AI real estate prospecting",
    "pre-MLS seller opportunities",
    "exclusive real estate territory",
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
      <body style={{ margin: 0, padding: 0 }}>
        <NativeCallBridge />
        {children}
      </body>
    </html>
  );
}
