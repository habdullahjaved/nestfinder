import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* ── TOP SECTION ───────────────── */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="NestFinder Logo"
                width={100}
                height={100}
                className=" w-auto"
              />
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover your perfect home in the UAE. Buy, rent, or list
              properties with ease on NestFinder.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/properties?listing_type=rent"
                  className="text-muted-foreground hover:text-accent"
                >
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?listing_type=sale"
                  className="text-muted-foreground hover:text-accent"
                >
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/properties/new"
                  className="text-muted-foreground hover:text-accent"
                >
                  List Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-accent"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-accent"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-accent"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-accent"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-accent"
                >
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── DIVIDER ───────────────── */}
        <div className="my-10 border-t border-border" />

        {/* ── BOTTOM SECTION ───────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NestFinder. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-accent">
              Facebook
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-accent">
              Twitter
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-accent">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
