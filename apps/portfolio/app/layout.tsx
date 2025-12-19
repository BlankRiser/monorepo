import { Footer } from "@/components/common/footer";
import { Providers } from "@/components/providers";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { PortfolioCommandBar } from "@/components/common/portfolio-command-bar";

const defaults = {
  name: "ram.codes",
  description: "Portfolio of Ram Shankar",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ram.codes"),
  title: {
    default: defaults.name,
    template: "%s | ram.codes",
  },
  keywords: [
    "react",
    "react-native",
    "python",
    "javascript",
    "typescript",
    "aws",
  ],
  openGraph: {
    siteName: defaults.name,
    type: "website",
    locale: "en_US",
    url: "https://ram.codes",
    title: defaults.name,
    description: defaults.description,
    images: [
      {
        url: "https://ram.codes/thumbnail.webp",
        width: 1600,
        height: 900,
        alt: "ram.codes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaults.name,
    description: defaults.description,
    creator: "@blank_riser",
    site: "@blank_riser",
    images: [
      {
        url: "https://ram.codes/thumbnail.webp",
        width: 1200,
        height: 630,
        alt: "ram.codes",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://ram.codes",
    types: {
      "application/rss+xml": "https://ram.codes/rss.xml",
    },
  },
  applicationName: defaults.name,
  appleWebApp: {
    title: defaults.name,
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "kPp5_rgQwPy\][o 9HufNkiJBXOR99eZE2sNbqbc22twXrcw",
    // yandex: ['DATA_TODO'],
    other: {
      "msvalidate.01": ["C73F80B652B239B3972D7DEF2D58D0BB"],
      // 'facebook-domain-verification': ['DATA_TODO'],
    },
  },
  icons: {
    icon: [
      {
        url: "/favicons/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/favicons/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-neutral-50 dark:bg-neutral-950 `}
      >
        <Providers>
          <>
            {children}
            <PortfolioCommandBar />
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
