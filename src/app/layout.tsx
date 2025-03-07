import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "~/components/footer";
import { PostHogProvider } from "./providers";
import { Navbar } from "~/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Automatas.tech - AI Images",
  description: "Explore a vast collection of unique and breathtaking AI-generated artwork, perfect for any project or inspiration.",
  openGraph: {
    title: "Automatas.tech - AI Images",
    description: "Explore a vast collection of unique and breathtaking AI-generated artwork, perfect for any project or inspiration.",
    images: [
      {
        url: "/images/hero.png",
      },
    ],
    url: "https://automatas.tech",
  },
  twitter: {
    title: "Automatas.tech - AI Images",
    description: "Explore a vast collection of unique and breathtaking AI-generated artwork, perfect for any project or inspiration.",
    images: [
      {
        url: "/images/hero.png",
      },
    ],
    card: "summary",
  },
  metadataBase: new URL("https://automatas.tech"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <Navbar />
          {children}
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
