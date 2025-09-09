

import type { Metadata, Viewport } from "next";
import "./globals.scss";


export const metadata: Metadata = {
  title: 'LionByte Solutions | 3D Websites & Custom Software Solutions',
  description: 'LionBytes Solutions delivers cutting-edge 3D websites and custom software solutions tailored to your business. Innovation, technology, and design that elevate your digital presence.',
  keywords: [
    "3D websites",
    "custom software solutions",
    "web development",
    "3D design",
    "digital innovation",
    "software development",
    "interactive websites",
  ],
  icons: {
    icon: [
      {url: '/logo.svg', type: 'image/svg+xml'},
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
    
  },
  
  openGraph: {
    title: "LionBytes Solutions | 3D Websites & Custom Software Solutions",
    description:
      "We create immersive 3D websites and tailor-made software solutions that combine innovation and technology to grow your business.",
    url: "https://www.lionbytesolutions.com",
    
    siteName: "LionByte Solutions",
    images: [
      {
        url: "https://www.lionbytesolutions.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LionBytes Solutions Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'black'},
    {media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body >

        {children}

      </body>
    </html>
  );
}
