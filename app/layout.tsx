import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sihliconvalley",
  description: "Local. Open. Accountable. Community projects near the Sihl.",
  metadataBase: new URL('https://sihliconvalley.ch'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-brand="sihliconvalley">
      <body
        className={`${playfairDisplay.variable} ${ibmPlexMono.variable} ${permanentMarker.variable} antialiased`}
      >
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
