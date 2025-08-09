## Circle

A modern React app built with Vite that provides authentication and a polished UI with gradient layouts, subtle animations, and a clean component structure. The project uses HeroUI for components, TailwindCSS for styling, Zod + React Hook Form for validation, and React Router for routing.

### Tech Stack
- **React** + **Vite**
- **React Router** (v7)
- **HeroUI** (components, theming, toasts)
- **Tailwind CSS** (via `@tailwindcss/vite`)
- **React Hook Form** + **Zod** (form handling & schema validation)
- **Axios** (HTTP client)
- **Font Awesome** (icons)

### Project Structure
- `src/layouts/AuthLayout.jsx`: Animated gradient layout for auth screens
- `src/layouts/MainLayout.jsx`: Subtle animated layout with navbar and glass container
- `src/components/NvabarComponent.jsx`: Top navigation with dark mode toggle and user menu
- `src/pages/`: `LoginPage.jsx`, `RegisterPage.jsx`, `FeedPage.jsx`, `ProfilePage.jsx`, `PostDetailsPage.jsx`, `NotFoundPage.jsx`
- `src/services/authService.js`: Auth API calls (signup/signin)
- `src/schema/`: `loginSchema.js`, `registerSchema.js` (Zod validation)
- `src/main.jsx`: App root with `HeroUIProvider` and `ToastProvider`

### Current Features
- **Authentication UI**: Login and Register pages with validation and animated, accessible inputs.
- **Form Validation**: Zod schemas enforce email, strong password, matching passwords, age (>= 18), and gender.
- **Auth API Integration**: Signup/Signin via `https://linked-posts.routemisr.com/users/`.
  - On login success, a `token` is stored in `localStorage`.
- **Theming**: Dark/Light mode toggle in the navbar (persists via `localStorage`).
- **Layouts**:
  - `AuthLayout`: vibrant animated background for auth pages.
  - `MainLayout`: more subtle background with glass effect content area and fixed navbar.
- **Routing**: Pages wired with React Router; not found fallback included.

### Getting Started
1. Install Node.js (LTS recommended).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build:
   ```bash
   npm run preview
   ```

### Environment & Configuration
- The auth base URL is currently hardcoded in `src/services/authService.js`.
- Token is stored in `localStorage` on successful login.
- Vercel rewrite config is provided in `vercel.json` for SPA routing.

### Roadmap / To Do
- **Protected Routes**: Implement `MainProtRoute` and apply it to private pages.
- **Posts Module**:
  - Create `postService` with CRUD operations.
  - Implement feed fetching, pagination/infinite scroll, and optimistic UI updates.
  - Post details page with comments and likes.
- **User Module**:
  - Profile page with editable user info, avatar upload, and settings.
  - Persisted user session and refresh token handling.
- **UI/UX Enhancements**:
  - Responsive improvements and accessibility pass (ARIA labels, focus states).
  - Skeleton loaders and empty states.
- **Error Handling**:
  - Centralized API error interceptor, standardized toast messages.
- **State Management**:
  - Evaluate lightweight global state (Context, Jotai/Zustand) for auth/user/post cache.
- **Testing**:
  - Unit tests for services and validation schemas.
  - Component tests for forms and protected routing.
- **Deployment**:
  - CI/CD pipeline (GitHub Actions) with lint/build/test.
  - Vercel environment variables (if APIs require secrets in future).
- **Performance**:
  - Code splitting where needed and image optimization for media-heavy feeds.

### Scripts
- `npm run dev`: Start dev server
- `npm run build`: Build production bundle
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### License
This project is for learning and demonstration purposes. Add a license if you plan to distribute.
