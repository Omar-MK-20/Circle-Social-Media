
# Circle Social Media

Circle is a modern, full-stack social media web application built with React 19, Vite, and a beautiful, responsive UI. It features animated backgrounds, glassmorphism effects, authentication, protected routes, and a modular component structure. The project demonstrates best practices in React development and UI/UX design.

## Tech Stack
- **React 19** + **Vite 7**
- **React Router v7**
- **@tanstack/react-query** (with Devtools)
- **HeroUI** (UI components, toasts)
- **Tailwind CSS** (with dark mode)
- **React Hook Form** + **Zod** (form handling & validation)
- **Axios** (HTTP client)
- **Font Awesome** (icons)
- **Framer Motion** (animations)

## Project Structure
```
src/
  assets/                # Images and SVGs
  components/            # Reusable React components (Navbar, Post, Comment, etc.)
  contexts/              # AuthContextProvider for global auth state
  layouts/               # AuthLayout (animated), MainLayout (glassmorphism)
  pages/                 # FeedPage, LoginPage, RegisterPage, ProfilePage, etc.
  protectedRoutes/       # AuthProtRoute, MainProtRoute (route guards)
  schema/                # Zod validation schemas
  services/              # API service modules (auth, post, comment, user)
  App.jsx                # Main app component with routing
  main.jsx               # Entry point, providers setup
```

## Current Features
- **Authentication System**
  - Login and Register pages with animated, accessible forms
  - JWT token-based authentication (localStorage persistence)
  - Protected routes for authenticated/unauthenticated users
  - Automatic logout on expired tokens

- **Form Validation**
  - Zod schemas for email, strong password, matching passwords, age (>= 18), gender
  - React Hook Form for efficient form handling

- **Posts Module**
  - Feed page displaying posts with user info, content, and images
  - Post cards with like/comment counts
  - Add post and add comment components
  - Loading skeletons and error handling

- **UI/UX Features**
  - Dark/Light mode toggle (persists via localStorage)
  - Responsive design with glassmorphism and animated backgrounds
  - Smooth transitions and toasts for feedback

- **Layouts**
  - `AuthLayout`: vibrant animated background for auth pages
  - `MainLayout`: subtle animated background, glass effect content area, fixed navbar

- **Routing**
  - Protected routes with React Router v7
  - Automatic redirects based on authentication
  - Not found fallback page

## Getting Started
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

## Environment & Configuration
- Auth and posts API base URLs are set in `src/services/`
- Token is stored in `localStorage` on login
- Dark mode is toggled and persisted via `localStorage.theme`

## API Integration
- **Authentication**: `https://linked-posts.routemisr.com/users/` (signup/signin)
- **Posts**: `https://linked-posts.routemisr.com/posts` (fetch, add, comment)
- Automatic token inclusion in API headers
- Error handling for network/auth failures

## Roadmap / To Do
- edit/delete posts
- Comment system enhancements
- Profile page editing and avatar upload
- Pagination/infinite scroll for feeds
- Accessibility improvements (ARIA, keyboard nav)
- Unit/component/integration tests
- CI/CD pipeline and deployment configs

## Scripts
- `npm run dev`: Start development server
- `npm run build`: Build production bundle
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint for code quality

## License
This project is for learning and demonstration purposes. Add a license if you plan to distribute.
