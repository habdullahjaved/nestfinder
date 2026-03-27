### Step 3 — Folder Structure

```
nestfinder/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (main)/
│   │   ├── layout.tsx            ← main layout with nav/footer
│   │   ├── page.tsx              ← homepage
│   │   ├── properties/
│   │   │   ├── page.tsx          ← listings grid + map
│   │   │   └── [id]/page.tsx     ← property detail
│   │   └── dashboard/
│   │       └── page.tsx          ← saved properties, profile
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts
│   ├── layout.tsx                ← root layout
│   └── globals.css
├── components/
│   ├── ui/                       ← shadcn auto-generated
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── properties/
│   │   ├── property-card.tsx
│   │   ├── property-grid.tsx
│   │   ├── property-map.tsx
│   │   └── search-filters.tsx
│   └── shared/
│       └── search-bar.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             ← browser client
│   │   ├── server.ts             ← server client (RSC)
│   │   └── middleware.ts         ← session refresh
│   ├── auth.ts                   ← Auth.js config
│   ├── validations/
│   │   └── property.ts
│   └── utils.ts
├── hooks/
│   ├── use-properties.ts
│   └── use-map-sync.ts
├── stores/
│   └── filter-store.ts
├── types/
│   └── index.ts
└── middleware.ts
```
