import type { Metadata } from "next";
import { ivyMode, poppins, cormorant } from "./fonts";
import { Providers } from "@/lib/providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CompareTray } from "@/components/CompareTray";
import { AIConcierge } from "@/components/AIConcierge";
import "../styles/phosphor/regular/style.css";
import "../styles/phosphor/fill/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "betterhomes — Dubai real estate, homegrown since 1986",
  description:
    "Buy, rent, and explore Dubai property with betterhomes. Marina, Downtown, Palm Jumeirah, and beyond — trust better, get better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ivyMode.variable} ${poppins.variable} ${cormorant.variable}`}
    >
      <body>
        <Providers>
          <a href="#main-content" className="bh-skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" style={{ flex: 1, minWidth: 0 }}>
            {children}
          </main>
          <SiteFooter />
          <CompareTray />
          <AIConcierge />
        </Providers>
      </body>
    </html>
  );
}
