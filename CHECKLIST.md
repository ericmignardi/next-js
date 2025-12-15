# Next.js Learning Checklist

## Project Setup & Fundamentals

- [x] Understand project structure (app directory, public folder, next.config.js)
- [x] Learn file-based routing (folders/files create routes)
- [x] App Router vs Pages Router differences
- [!] Server Components vs Client Components ("use client")

## Routing & Navigation

- [x] Create basic routes (folders and page.js)
- [x] Dynamic routes ([slug] and [...slug])
- [x] Link component for navigation
- [x] useRouter hook for programmatic navigation
- [x] Route groups with (folder) syntax
- [x] Parallel routes and intercepting routes
- [x] Custom 404 and error pages

## Data Fetching

- [!] Server Component data fetching (async/await)
- [x] Client-side fetching (useEffect + fetch)
- [!] Caching and revalidation strategies (request memoization [auto], data cache [fetch-level], full route cache [page-level], on-demand)
- [!] Server Actions for mutations
- [x] loading.js for loading states
- [x] error.js boundaries

## Rendering Strategies

- [!] Static Site Generation (SSG)
- [!] Server-Side Rendering (SSR)
- [!] Incremental Static Regeneration (ISR)
- [!] Client-Side Rendering
- [!] Streaming with Suspense

## Layouts & Templates

- [x] Root layout.js and nested layouts
- [x] Layout composition and inheritance
- [x] template.js for remounting components
- [x] Metadata API for SEO

## Styling

- [x] CSS Modules
- [x] Global styles (globals.css)
- [x] Tailwind CSS integration
- [x] CSS-in-JS (styled-components, emotion)
- [x] Sass/SCSS support

## Images & Assets

- [x] Image component optimization
- [x] Responsive images and lazy loading
- [x] Static assets in public folder
- [x] next/font optimization

## API Routes

- [x] Create API endpoints (app/api)
- [x] Handle HTTP methods (GET, POST, etc.)
- [x] Route Handlers (route.js)
- [x] Connect to databases/external APIs

## Middleware

- [x] Create proxy.ts
- [x] Authentication checks
- [x] Redirects and rewrites
- [x] Matcher config for routes

## State Management

- [x] React Context API
- [x] URL state with searchParams
- [x] External libraries (Zustand, Redux, Jotai)
- [x] Server vs client state patterns

## Forms & Validation

- [!] Server Actions for submissions
- [!] Form validation (client and server)
- [!] Handle errors and success states
- [x] Progressive enhancement
- [!] useFormState and useFormStatus hooks

## Performance Optimization

- [ ] Code splitting and lazy loading
- [ ] Bundle size optimization
- [ ] Dynamic imports
- [ ] Caching strategies
- [ ] Prefetching and preloading

## Environment Variables

- [x] Set up .env.local
- [x] NEXT*PUBLIC* prefix usage
- [x] Environment-specific configs

## Deployment

- [x] Deploy to Vercel

## Advanced Features

- [!] generateStaticParams for dynamic routes
