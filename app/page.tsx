import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { SearchBar } from "@/components/shared/search-bar";
import { PropertyCard } from "@/components/properties/property-card";
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NestFinder — Find Your Next Home in the UAE",
  description:
    "Browse verified property listings across Dubai, Abu Dhabi and beyond. Rent, buy or invest.",
  openGraph: {
    title: "NestFinder — UAE Property Search",
    description: "Find verified properties across Dubai, Abu Dhabi and beyond.",
    type: "website",
  },
};

function getAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
async function getFeaturedProperties() {
  const supabase = getAdmin();
  const { data } = await supabase
    .from("properties")
    .select("*, agents(name, agency, phone, avatar_url)")
    .eq("is_featured", true)
    .limit(6);
  return data ?? [];
}

async function getStats() {
  const supabase = getAdmin();
  const [{ count: propCount }, { count: agentCount }] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase.from("agents").select("*", { count: "exact", head: true }),
  ]);
  return { properties: propCount ?? 0, agents: agentCount ?? 0 };
}

const CITIES = [
  {
    name: "Dubai",
    tagline: "City of the Future",
    image: "/images/dubai.png",
    count: "8,400+ listings",
    href: "/properties?q=Dubai",
  },
  {
    name: "Abu Dhabi",
    tagline: "Capital of Ambition",
    image: "/images/abu-dhabi.png",
    count: "3,200+ listings",
    href: "/properties?q=Abu+Dhabi",
  },
  {
    name: "Sharjah",
    tagline: "Cultural Heart of the UAE",
    image: "/images/sharjah.png",
    count: "1,100+ listings",
    href: "/properties?q=Sharjah",
  },
];

const NEIGHBOURHOODS = [
  {
    name: "Dubai Marina",
    type: "Waterfront",
    href: "/properties?neighbourhood=Dubai+Marina",
  },
  {
    name: "Downtown Dubai",
    type: "Urban Core",
    href: "/properties?neighbourhood=Downtown+Dubai",
  },
  {
    name: "Palm Jumeirah",
    type: "Island Living",
    href: "/properties?neighbourhood=Palm+Jumeirah",
  },
  {
    name: "Business Bay",
    type: "City Centre",
    href: "/properties?neighbourhood=Business+Bay",
  },
  { name: "JBR", type: "Beachfront", href: "/properties?neighbourhood=JBR" },
  {
    name: "Arabian Ranches",
    type: "Suburban Villa",
    href: "/properties?neighbourhood=Arabian+Ranches",
  },
  {
    name: "DIFC",
    type: "Financial District",
    href: "/properties?neighbourhood=DIFC",
  },
  {
    name: "Jumeirah",
    type: "Prestige Living",
    href: "/properties?neighbourhood=Jumeirah",
  },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Verified listings only",
    desc: "Every property is verified by our team before going live. No ghost listings.",
  },
  {
    icon: Zap,
    title: "Real-time updates",
    desc: "Prices and availability update instantly. What you see is what's available.",
  },
  {
    icon: Users,
    title: "Licensed agents",
    desc: "All agents are DLD-licensed and background checked for your peace of mind.",
  },
  {
    icon: TrendingUp,
    title: "Market insights",
    desc: "AI-powered neighbourhood summaries and price trend data on every listing.",
  },
];

const PROPERTY_TYPES = [
  {
    type: "Apartment",
    emoji: "🏢",
    href: "/properties?property_type=apartment",
  },
  { type: "Villa", emoji: "🏡", href: "/properties?property_type=villa" },
  {
    type: "Townhouse",
    emoji: "🏘️",
    href: "/properties?property_type=townhouse",
  },
  { type: "Studio", emoji: "🛋️", href: "/properties?property_type=studio" },
  {
    type: "Penthouse",
    emoji: "🌆",
    href: "/properties?property_type=penthouse",
  },
];

export default async function HomePage() {
  const [featured, stats] = await Promise.all([
    getFeaturedProperties(),
    getStats(),
  ]);

  return (
    <>
      {/* CSS-variable-based hover states (no JS handlers needed) */}
      <style>{`
        .neighbourhood-card {
          border: 1px solid var(--border);
          background: var(--card);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .neighbourhood-card:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 15%, transparent);
        }
        .type-card {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          transition: border-color 0.2s, background 0.2s;
        }
        .type-card:hover {
          border-color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
        }
      `}</style>
      <div className="flex flex-col">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section
          className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6"
          style={{ background: "var(--primary)" }}
        >
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Accent glow blobs */}
          <div
            className="pointer-events-none absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{
              background: "color-mix(in srgb, var(--accent) 18%, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full blur-[100px]"
            style={{
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
            }}
          />

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8">
            {/* Live pill */}
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span className="text-xs font-semibold text-white/80 tracking-wide">
                {stats.properties.toLocaleString()}+ active listings across the
                UAE
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-syne text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              Find Your Perfect
              <br />
              <span
                className="relative inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--accent) 0%, #ffaa55 60%, var(--accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Home in the UAE
              </span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
              Rent, buy or invest across Dubai, Abu Dhabi and beyond. Verified
              listings. Licensed agents. Zero hassle.
            </p>

            {/* Search bar */}
            <div className="w-full max-w-3xl">
              <Suspense>
                <SearchBar />
              </Suspense>
            </div>

            {/* Quick-search chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Apartments for rent",
                "Villas for sale",
                "Studios in Marina",
                "Penthouses",
              ].map((q) => (
                <Link
                  key={q}
                  href={`/properties?q=${encodeURIComponent(q)}`}
                  className="rounded-full px-4 py-1.5 text-xs font-medium text-white/70 transition-all hover:text-white"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="absolute bottom-0 left-0 right-0 backdrop-blur-md"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(4,31,96,0.85)",
            }}
          >
            <div
              className="mx-auto grid max-w-4xl grid-cols-3 divide-x"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {[
                {
                  value: `${stats.properties.toLocaleString()}+`,
                  label: "Active listings",
                },
                {
                  value: `${stats.agents.toLocaleString()}+`,
                  label: "Licensed agents",
                },
                { value: "8", label: "Prime neighbourhoods" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-4 sm:py-5"
                >
                  <span
                    className="font-syne text-lg font-bold sm:text-2xl"
                    style={{ color: "var(--accent)" }}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-white/50 mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITIES ───────────────────────────────────────── */}
        <section
          className="px-4 py-20 sm:px-6"
          style={{ background: "var(--background)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--accent)" }}
                >
                  Where do you want to live?
                </p>
                <h2
                  className="font-syne mt-2 text-3xl font-extrabold sm:text-4xl"
                  style={{ color: "var(--foreground)" }}
                >
                  Explore by city
                </h2>
              </div>
              <Link
                href="/properties"
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--muted-foreground)" }}
              >
                View all listings <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Dubai — large card */}
              <Link
                href={CITIES[0].href}
                className="group relative overflow-hidden rounded-2xl"
                style={{ height: "420px" }}
              >
                <Image
                  src={CITIES[0].image}
                  alt={CITIES[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {/* Accent stripe */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: "var(--accent)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--accent)" }}
                  >
                    {CITIES[0].tagline}
                  </p>
                  <h3 className="font-syne mt-1 text-3xl font-extrabold text-white">
                    {CITIES[0].name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-white/70">
                      {CITIES[0].count}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                </div>
              </Link>

              {/* Abu Dhabi + Sharjah stacked */}
              <div
                className="grid grid-cols-1 gap-4"
                style={{ height: "420px" }}
              >
                {CITIES.slice(1).map((city) => (
                  <Link
                    key={city.name}
                    href={city.href}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: "var(--accent)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p
                        className="text-xs font-bold"
                        style={{ color: "var(--accent)" }}
                      >
                        {city.tagline}
                      </p>
                      <h3 className="font-syne mt-0.5 text-xl font-extrabold text-white">
                        {city.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-white/70">
                          {city.count}
                        </span>
                        <ArrowRight
                          className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                          style={{ color: "var(--accent)" }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROPERTIES ──────────────────────────── */}
        {featured.length > 0 && (
          <section
            className="px-4 py-20 sm:px-6"
            style={{ background: "var(--muted)" }}
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "var(--accent)" }}
                  >
                    Hand-picked
                  </p>
                  <h2
                    className="font-syne mt-2 text-3xl font-extrabold sm:text-4xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    Featured properties
                  </h2>
                </div>
                <Link
                  href="/properties?is_featured=true"
                  className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  See all featured <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((property) => (
                  <PropertyCard key={property.id} property={property as any} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── NEIGHBOURHOODS ───────────────────────────────── */}
        <section
          className="px-4 py-20 sm:px-6"
          style={{ background: "var(--background)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                Dubai's finest
              </p>
              <h2
                className="font-syne mt-2 text-3xl font-extrabold sm:text-4xl"
                style={{ color: "var(--foreground)" }}
              >
                Browse by neighbourhood
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {NEIGHBOURHOODS.map((n) => (
                <Link
                  key={n.name}
                  href={n.href}
                  className="neighbourhood-card group flex flex-col gap-1.5 rounded-xl px-4 py-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {n.type}
                    </span>
                    <ChevronRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </div>
                  <span
                    className="font-syne text-sm font-bold sm:text-base"
                    style={{ color: "var(--foreground)" }}
                  >
                    {n.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROPERTY TYPES ───────────────────────────────── */}
        <section
          className="px-4 py-20 sm:px-6"
          style={{ background: "var(--primary)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                What are you looking for?
              </p>
              <h2 className="font-syne mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Browse by type
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PROPERTY_TYPES.map(({ type, emoji, href }) => (
                <Link
                  key={type}
                  href={href}
                  className="type-card group flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center"
                >
                  <span className="text-3xl">{emoji}</span>
                  <span className="font-syne text-sm font-bold text-white">
                    {type}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY NESTFINDER ───────────────────────────────── */}
        <section
          className="px-4 py-20 sm:px-6"
          style={{ background: "var(--background)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                Why NestFinder?
              </p>
              <h2
                className="font-syne mt-2 text-3xl font-extrabold sm:text-4xl"
                style={{ color: "var(--foreground)" }}
              >
                The smarter way to find property
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-sm sm:text-base"
                style={{ color: "var(--muted-foreground)" }}
              >
                We built the platform we wished existed — transparent, fast, and
                actually useful.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_US.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 rounded-2xl p-6"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: "var(--primary)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-syne text-sm font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────── */}
        <section
          className="relative overflow-hidden px-4 py-20 sm:px-6"
          style={{ background: "var(--primary)" }}
        >
          {/* Noise/grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
          {/* Orange glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{
              background: "color-mix(in srgb, var(--accent) 15%, transparent)",
            }}
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <Star
                className="h-3.5 w-3.5"
                style={{ color: "var(--accent)", fill: "var(--accent)" }}
              />
              <span className="text-xs font-semibold text-white/80">
                Trusted by 50,000+ UAE residents
              </span>
            </div>

            <h2 className="font-syne text-3xl font-extrabold text-white sm:text-5xl">
              Ready to find your
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--accent), #ffaa55)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                perfect home?
              </span>
            </h2>

            <p className="max-w-md text-sm text-white/60 sm:text-base">
              Join thousands of happy homeowners and tenants who found their
              ideal property through NestFinder.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-foreground)",
                }}
              >
                Browse all properties
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/properties?listing_type=sale"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                }}
              >
                Properties for sale
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
