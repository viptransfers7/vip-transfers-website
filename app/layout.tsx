import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const priceMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-price-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "VIP Transfers Korea | Private Chauffeur Service in Korea",
    template: "%s | VIP Transfers Korea"
  },
  description:
    "Discreet airport transfers, executive roadshows, delegation transport, and private chauffeur service for international VIP travelers visiting Seoul and Korea.",
  metadataBase: new URL("https://viptransferskorea.com")
};

const navItems = [
  ["Services", "/seoul-chauffeur-service"],
  ["Airport", "/incheon-airport-transfer"],
  ["Fleet", "/fleet"],
  ["Booking", "/booking"],
  ["Track", "/track/demo"],
  ["FAQ", "/faq"]
];

const footerGroups = [
  [
    ["Incheon Airport Transfer", "/incheon-airport-transfer"],
    ["Seoul Chauffeur Service", "/seoul-chauffeur-service"],
    ["VIP Protocol Transport", "/vip-protocol-transport-korea"],
    ["Corporate Roadshow Korea", "/corporate-roadshow-korea"]
  ],
  [
    ["Fleet", "/fleet"],
    ["Private Tours Korea", "/private-tours-korea"],
    ["Request Executive Service", "/contact"]
  ]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${priceMono.variable}`}>
      <body className="font-sans antialiased">
        <div className="bg-ink px-4 py-1.5 text-center text-[9px] font-semibold uppercase leading-4 tracking-[0.1em] text-[#e8dfca] md:py-2 md:text-xs md:tracking-[0.16em]">
          SEOUL AND KOREA PRIVATE CHAUFFEUR SERVICE
        </div>
        <header className="sticky top-0 z-50 border-b hairline bg-paper/[0.94] px-4 py-2.5 backdrop-blur-xl md:px-8 md:py-3 lg:px-12">
          <nav className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-3">
            <Link href="/" className="grid min-w-0 gap-0.5">
              <strong className="truncate text-xs font-black tracking-[0.06em] sm:text-sm md:text-base md:uppercase md:tracking-[0.2em]">VIP Transfers Korea</strong>
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500 md:block">Private chauffeur service</span>
            </Link>
            <div className="hidden items-center gap-6 text-sm font-semibold text-neutral-700 lg:flex">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} className="focus-ring rounded-sm transition hover:text-black">
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex">
                <Link href="/contact" className="btn btn-compact">
                  Contact
                </Link>
              </span>
              <Link href="/booking" className="btn btn-dark btn-compact">
                Book
              </Link>
              <details className="group lg:hidden">
                <summary className="btn btn-compact cursor-pointer">Menu</summary>
                <div className="absolute left-0 right-0 top-[calc(100%+12px)] grid gap-1 border hairline bg-paper p-2 shadow-quiet">
                  {navItems.map(([label, href]) => (
                    <Link key={href} href={href} className="min-h-10 px-3 py-2.5 text-sm font-bold text-neutral-700 transition hover:bg-white hover:text-ink">
                      {label}
                    </Link>
                  ))}
                  <Link href="/contact" className="min-h-10 px-3 py-2.5 text-sm font-bold text-neutral-700 transition hover:bg-white hover:text-ink md:hidden">
                    Contact
                  </Link>
                </div>
              </details>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-ink px-5 py-12 text-white md:px-12 md:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.22em] text-champagne">VIP Transfers Korea</div>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/62">
                Discreet private chauffeur service for overseas VIP guests, executives, corporate roadshows, delegations, and luxury private travelers in Korea.
              </p>
            </div>
            {footerGroups.map((group, index) => (
              <div key={index} className="grid content-start gap-3 text-sm text-white/72">
                {group.map(([label, href]) => (
                  <Link key={href} href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-3 border-t dark-hairline pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-white/42 md:flex-row md:items-center md:justify-between">
            <span>Seoul, Incheon, Gimpo, and regional Korea</span>
            <span>Private chauffeur service</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
