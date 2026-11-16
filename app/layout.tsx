import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/content/site";
import { navItems } from "@/lib/content";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Joel Ibabao" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#F7F5EF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = navItems();
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header nav={nav} email={site.email} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer nav={nav} email={site.email} />
      </body>
    </html>
  );
}
