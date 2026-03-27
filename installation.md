npx create-next-app@latest nestfinder \
 --typescript --tailwind --eslint --app --src-dir=false \
 --import-alias="@/\*"

cd nestfinder

# shadcn init

npx shadcn@latest init

# Choose: Default style, Zinc base color, CSS variables = yes

# Core deps

npm install @supabase/supabase-js @supabase/ssr
npm install next-auth@beta
npm install zustand @tanstack/react-query
npm install mapbox-gl @types/mapbox-gl
npm install nuqs # URL state management (filters in URL params)
npm install react-hook-form @hookform/resolvers zod

# shadcn components (add as needed throughout days)

npx shadcn@latest add button input card badge separator sheet dialog
npx shadcn@latest add dropdown-menu navigation-menu skeleton toast
