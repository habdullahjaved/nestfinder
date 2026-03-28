# 🏠 NestFinder — UAE Property Search Platform

> A full-stack property search platform built for the UAE market. Browse, filter, and discover verified rental and sale listings across Dubai, Abu Dhabi, and Sharjah — powered by AI neighbourhood summaries, an interactive map, and a seamless search experience.

**Live Demo:** [nestfinderae.vercel.app](https://nestfinderae.vercel.app)

---

## ✨ Features

- 🗺️ **Map-synced listings** — Mapbox GL JS with real-time property markers synced to search results
- 🔍 **URL-persisted filters** — search state lives in URL params via `nuqs` (shareable, bookmarkable searches)
- 🤖 **AI neighbourhood summaries** — streaming Groq (Llama 3.3 70B) summaries on every property detail page
- 🧮 **Mortgage calculator** — live monthly payment estimates with adjustable rate and term
- 🔐 **Authentication** — Google OAuth + email/password via Auth.js v5, with Next.js 16 Proxy-protected routes
- 💾 **Saved properties** — authenticated users can save and manage favourite listings from their dashboard
- 🏘️ **Browse by city, neighbourhood & type** — curated entry points across Dubai, Abu Dhabi, and Sharjah
- ⚡ **ISR + SSG** — featured listings statically generated, pages revalidated on demand
- 📱 **Fully responsive** — mobile-first design with dark/light theme support

---

## 🛠 Tech Stack

### Frontend

| Technology                                                                | Purpose                           |
| ------------------------------------------------------------------------- | --------------------------------- |
| [Next.js 16](https://nextjs.org/) App Router                              | Full-stack React framework        |
| [React 19](https://react.dev/)                                            | UI library                        |
| [TypeScript](https://www.typescriptlang.org/)                             | Strict type safety throughout     |
| [Tailwind CSS v4](https://tailwindcss.com/)                               | Utility-first styling             |
| [shadcn/ui](https://ui.shadcn.com/)                                       | Accessible component primitives   |
| [Zustand](https://zustand-demo.pmnd.rs/)                                  | Client-side state management      |
| [TanStack Query](https://tanstack.com/query)                              | Server state & data fetching      |
| [nuqs](https://nuqs.47ng.com/)                                            | URL search param state management |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form validation                   |

### Backend & Database

| Technology                        | Purpose                                   |
| --------------------------------- | ----------------------------------------- |
| [Hono.js](https://hono.dev/)      | Lightweight Node.js API server            |
| [Supabase](https://supabase.com/) | Postgres · Auth · Storage · pgvector      |
| [Auth.js v5](https://authjs.dev/) | Google OAuth + credentials authentication |

### AI & Maps

| Technology                                            | Purpose                              |
| ----------------------------------------------------- | ------------------------------------ |
| [Groq API](https://groq.com/) (Llama 3.3 70B)         | Streaming AI neighbourhood summaries |
| [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) | Interactive property maps            |
| [react-map-gl](https://visgl.github.io/react-map-gl/) | React bindings for Mapbox            |

### Hosting (all free tiers)

| Service                           | Hosts              |
| --------------------------------- | ------------------ |
| [Vercel](https://vercel.com/)     | Next.js frontend   |
| [Railway](https://railway.app/)   | Hono.js API server |
| [Supabase](https://supabase.com/) | Postgres + Storage |

---

## 🗂 Project Structure

```
nestfinder/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # Auth.js endpoint
│   │   ├── neighbourhood/        # Groq AI streaming endpoint
│   │   ├── saved/                # Saved properties API
│   │   └── test-db/              # DB health check
│   ├── dashboard/                # Saved properties dashboard (protected)
│   ├── properties/
│   │   ├── [slug]/               # Individual property detail page
│   │   └── new/                  # Create listing page
│   ├── login/                    # Auth page
│   ├── layout.tsx                # Root layout + providers
│   └── page.tsx                  # Homepage
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── map/                      # Mapbox components
│   ├── properties/               # PropertyCard, filters, gallery
│   ├── providers/                # React Query, Theme providers
│   └── shared/                   # SearchBar, MortgageCalculator
├── lib/
│   └── supabase/                 # Supabase clients + middleware helper
├── types/
│   └── database.ts               # Generated Supabase types
├── proxy.ts                      # Next.js 16 Proxy (Middleware)
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- [Supabase](https://supabase.com/) project
- [Mapbox](https://mapbox.com/) access token
- [Groq](https://console.groq.com/) API key
- Google OAuth credentials

### 1. Clone & install

```bash
git clone https://github.com/habdullahjaved/nestfinder.git
cd nestfinder
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth.js
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# Groq
GROQ_API_KEY=
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Run locally

```bash
npm run dev
# → http://localhost:3000
```

---

## 🌍 Deployment

1. Push to GitHub
2. Import on [Vercel](https://vercel.com/)
3. Set **Framework Preset → Next.js**
4. Add all environment variables
5. Deploy

---

## 👨‍💻 Author

**Habdullah Javed**

- GitHub: [@habdullahjaved](https://github.com/habdullahjaved)
- LinkedIn: [linkedin.com/in/habdullahjaved](https://linkedin.com/in/habdullahjaved)

---

## 📄 License

MIT

---

<p align="center">Built with ❤️ in Dubai, UAE</p>
