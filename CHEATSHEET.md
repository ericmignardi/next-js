# Next.js Cheatsheet

## Rendering Strategies

| Strategy      | Symbol     | When Rendered    | Use Case                     |
| ------------- | ---------- | ---------------- | ---------------------------- |
| **SSG**       | `○`        | Build time       | Static pages                 |
| **SSR**       | `ƒ`        | Every request    | Real-time/personalized       |
| **ISR**       | `○ + time` | Build + interval | Semi-dynamic content         |
| **CSR**       | —          | Browser          | Interactive dashboards       |
| **Streaming** | —          | Progressive      | Complex pages with slow data |

```tsx
// SSG (default)
export default async function Page() { ... }

// SSR
export const dynamic = "force-dynamic";

// ISR
export const revalidate = 60; // seconds

// CSR
"use client";
useEffect(() => fetch(...), []);

// Streaming
<Suspense fallback={<Loading />}><SlowComponent /></Suspense>
```

---

## Server vs Client Components

|                | Server (default)         | Client (`"use client"`)     |
| -------------- | ------------------------ | --------------------------- |
| **Runs on**    | Server only              | Server + Browser            |
| **JS shipped** | ❌ No                    | ✅ Yes                      |
| **Can use**    | async/await, DB, secrets | useState, useEffect, events |

```tsx
// Server - fetches data directly
async function Posts() {
  const posts = await db.posts.findMany();
  return <div>{posts.map(...)}</div>;
}

// Client - interactive
"use client";
function Button() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c + 1)}>{count}</button>;
}
```

---

## Data Fetching & Caching

```tsx
// No cache (fresh every request)
fetch(url, { cache: "no-store" });

// Time-based revalidation
fetch(url, { next: { revalidate: 60 } });

// Tagged for on-demand revalidation
fetch(url, { next: { tags: ["posts"] } });

// On-demand revalidation (after mutations)
import { revalidatePath, revalidateTag } from "next/cache";
revalidatePath("/posts");
revalidateTag("posts", "default");
```

---

## File Conventions

| File            | Purpose                   |
| --------------- | ------------------------- |
| `page.tsx`      | Route UI                  |
| `layout.tsx`    | Shared wrapper (persists) |
| `template.tsx`  | Shared wrapper (remounts) |
| `loading.tsx`   | Loading UI                |
| `error.tsx`     | Error boundary            |
| `not-found.tsx` | 404 page                  |
| `route.ts`      | API endpoint              |
| `proxy.ts`      | Middleware                |

---

## Dynamic Routes

```
app/posts/[id]/page.tsx     → /posts/123
app/docs/[...slug]/page.tsx → /docs/a/b/c
app/(auth)/login/page.tsx   → /login (route group)
```

```tsx
// Pre-render dynamic routes at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ id: p.id }));
}

// Block unknown IDs
export const dynamicParams = false;
```

---

## Proxy (Middleware)

```tsx
// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

---

## Forms with Server Actions

```tsx
// Schema (shared)
const schema = z.object({ email: z.string().email() });

// Server Action
("use server");
async function submit(prevState, formData) {
  const result = schema.safeParse({ email: formData.get("email") });
  if (!result.success) return { errors: result.error.flatten() };
  // Save to DB...
  return { success: true };
}

// Client Form
("use client");
const [state, action] = useActionState(submit, {});
<form action={action}>
  <input name="email" />
  <button>Submit</button>
</form>;
```

---

## Environment Variables

```bash
# Server only (secrets)
DATABASE_URL="..."

# Client + Server (public)
NEXT_PUBLIC_API_URL="..."
```

---

## Image & Font Optimization

```tsx
import Image from "next/image";
import { Inter } from "next/font/google";

<Image src="/hero.jpg" width={800} height={400} priority />

const inter = Inter({ subsets: ["latin"] });
<body className={inter.className}>
```

---

## Quick Reference

| Need                    | Solution                           |
| ----------------------- | ---------------------------------- |
| Static page             | Default (no config)                |
| Real-time data          | `dynamic = "force-dynamic"`        |
| Revalidate every 60s    | `revalidate = 60`                  |
| Protect routes          | `proxy.ts` with cookie check       |
| Pre-build dynamic pages | `generateStaticParams`             |
| Lazy load component     | `dynamic(() => import(...))`       |
| URL state               | `searchParams` / `useSearchParams` |
