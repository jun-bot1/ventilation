# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev              # Dev server on port 4000
pnpm build            # Production build
pnpm lint             # ESLint
pnpm type-check       # tsc --noEmit
pnpm api:gen          # Regenerate API hooks from OpenAPI spec (orval)
```

Package manager is **pnpm** (enforced — npm/yarn will fail). Node >= 22.14.0.

Pre-commit hooks run automatically via Husky + lint-staged (Prettier → ESLint → tsc on staged files). Commit messages must follow Conventional Commits (commitlint).

## Architecture

**Next.js 16 App Router** with TypeScript strict mode. Pages are thin server components that render a single Template component.

### Route Groups

| Group         | Paths                                             | Notes                              |
| ------------- | ------------------------------------------------- | ---------------------------------- |
| `(main)`      | `/`                                               | Landing page with animated Header  |
| `(sub)`       | `/feature`, `/template`, `/price`, `/customer/**` | Public subpages                    |
| `(auth)`      | `/login`, `/signup`, `/findpassword`              | Dark card layout, no Header/Footer |
| `(dashboard)` | `/admin/**`                                       | Sidebar dashboard layout           |
| `(policies)`  | `/privacy`, `/terms`                              | Legal pages                        |

### Component Organization (Route Co-location + Atomic Design)

도메인별 컴포넌트는 해당 라우트 디렉토리에 co-locate 한다. 공통/공유 컴포넌트만 `src/components/`에 둔다.

```
src/app/(dashboard)/admin/community/
  page.tsx                              # Server Component (Template만 import)
  components/
    templates/CommunityTemplate.tsx      # organisms 조합
    organisms/CommunityManagement.tsx    # hooks 사용, 비즈니스 로직
  hooks/
    useAdminCommunity.ts                 # 도메인 hook
    apis/communityApi.ts                 # 수동 API hook (필요시)
```

**공유 컴포넌트** (`src/components/`에 유지):

- `organisms/Header/` — 여러 layout에서 사용
- `molecules/Footer.tsx` — 여러 layout에서 사용

**공유 layout 컴포넌트** (route group 레벨):

- `src/app/(dashboard)/admin/components/organisms/DashboardSidebar.tsx` — admin layout 공유
- `src/app/(sub)/customer/components/organisms/SearchSection.tsx` — customer layout 공유
- `src/app/(auth)/components/organisms/BackButton.tsx` — auth 공유

**공유 hooks** (`src/hooks/`에 유지):

- `apis/query.ts`, `apis/customFetch.ts` — Orval 생성 (공유)
- `apis/inquiryApi.ts` — admin/customer 양쪽에서 사용하는 공유 API hook
- `useInputs.ts`, `useNavigation.ts` 등 — 여러 라우트에서 사용하는 공통 hooks

Pages import one Template and render it:

```tsx
const Page = () => <SomeTemplate />;
export default Page;
```

### Two-Layer API Pattern

1. **Orval-generated** (`src/hooks/apis/query.ts`): TanStack Query hooks auto-generated from the OpenAPI spec at `https://api.buzzle.tools/api/openapi`. Config in `orval.config.ts`. These files are ESLint-ignored.
2. **Manual hooks**: Hand-written TanStack Query hooks for features not in the spec. Shared ones in `src/hooks/apis/` (e.g., `inquiryApi.ts`), domain-specific ones co-located in route directories (e.g., `src/app/(dashboard)/admin/faq/hooks/apis/faqApi.ts`).

Both layers use `src/hooks/apis/customFetch.ts` as the fetch mutator, which sends credentials and redirects to `/login` on 401/403.

A legacy **Axios** layer (`src/utils/axios.ts`, `src/utils/authApi.ts`) handles email verification and password reset via `/v1` endpoints.

### API Proxy

- **Dev**: `src/proxy.ts` rewrites `/api/*` → `https://api.buzzle.tools/api/*` and strips cookie domain/secure flags for localhost
- **Prod**: `next.config.ts` rewrites handle the same proxy

Protected endpoints use `/secure` suffix (e.g., `/api/inquiry/secure`). Admin endpoints use `/admin/secure`.

### State Management

Zustand store in `src/stores/userModel.ts` manages auth state with localStorage persistence. Uses `skipHydration: true` — rehydration is triggered manually in the Header's `useEffect`.

### Styling

MUI v7 with `@buzzle/bds` (Buzzle Design System) theme wrapper. Styles use MUI `sx` prop with named `const S = { ... }` style objects at the top of files. CSS Modules used sparingly for auth pages. No Tailwind.

Framer Motion (`motion`) for landing page animations. SVGs imported as React components via `@svgr/webpack`.

### Path Alias

`@/*` maps to `./src/*`.
