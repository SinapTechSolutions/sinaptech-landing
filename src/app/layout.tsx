import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SINAPTECH | Inteligência Colaborativa & GovTech",
    template: "%s | SINAPTECH",
  },
  description:
    "Software House Premium especializada em IA Local, SaaS B2B e soluções GovTech. A sinapse perfeita entre visão humana e inteligência colaborativa.",
  keywords: [
    "inteligência artificial",
    "IA local",
    "GovTech",
    "SaaS B2B",
    "software house",
    "desenvolvimento de software",
    "automação",
    "machine learning",
    "soluções governamentais",
  ],
  authors: [{ name: "SINAPTECH" }],
  creator: "SINAPTECH",
  publisher: "SINAPTECH",
  metadataBase: new URL("https://sinaptech.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sinaptech.com.br",
    siteName: "SINAPTECH",
    title: "SINAPTECH | Inteligência Colaborativa & GovTech",
    description:
      "Software House Premium especializada em IA Local, SaaS B2B e soluções GovTech.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SINAPTECH - Inteligência Colaborativa & GovTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SINAPTECH | Inteligência Colaborativa & GovTech",
    description:
      "Software House Premium especializada em IA Local, SaaS B2B e soluções GovTech.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-brand-snow text-brand-ink font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
