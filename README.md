# Deara Fashion E-commerce

Deaра is a React + Supabase e-commerce app focused on fast browsing, clean UI, and simple admin management.

## Highlights

- Responsive storefront with MUI components
- Supabase authentication and persistent cart
- Admin product management flow
- Checkout flow with order + order_items insert
- Route-level lazy loading for smaller initial bundle

## Tech Stack

- React 19
- React Router
- Material UI
- Supabase

## Quick Start

1. Install dependencies

   npm install

2. Configure environment variables in [.env](.env)

   REACT_APP_SUPABASE_URL=your_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key

3. Start development server

   npm start

4. Create production build

   npm run build

## Available Scripts

- npm start - run app in development mode
- npm test - run test runner
- npm run build - create optimized production bundle

## Database Notes

SQL helpers and migrations are available in [supabase](supabase).

- [supabase/cart_tables.sql](supabase/cart_tables.sql)
- [supabase/orders_tables.sql](supabase/orders_tables.sql)
- [supabase/storage_policies.sql](supabase/storage_policies.sql)
- [supabase/migrations](supabase/migrations)

## Optimization Work Included

- Route-level code splitting with `React.lazy()` + `Suspense`
- Cart context stability improvements and reduced stale-state issues
- Product card memoization to reduce re-renders
- Products page retry/error UX improvements
- Checkout route flow fix after successful order
