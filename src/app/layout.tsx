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
  title: "SINAPTECH | Inteligência Colaborativa & GovTech",
  description:
    "Software House Premium especializada em IA Local, SaaS B2B e soluções GovTech. A sinapse perfeita entre visão humana e inteligência colaborativa.",
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
