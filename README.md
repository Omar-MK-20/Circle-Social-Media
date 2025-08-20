
# Circle Social Media

Circle is a modern, full-stack social media web application built with React 19, Vite, and a beautiful, responsive UI. It features animated backgrounds, glassmorphism effects, authentication, protected routes, and a modular component structure. The project demonstrates best practices in React development and UI/UX design.

## Tech Stack
- **React 19** + **Vite 7**
- **React Router v7**
- **@tanstack/react-query** (with Devtools)
- **HeroUI** (UI components, toasts)
- **Tailwind CSS v4** (with dark mode)
- **React Hook Form** + **Zod** (form handling & validation)
- **Axios** (HTTP client)
- **Day.js** (dates & relative time)
- **Font Awesome** (icons)
- **Framer Motion** (animations)

## Project Structure
```
src/
  assets/                # Images and SVGs
  components/            # Reusable React components (Navbar, Post, Comment, etc.)
  contexts/              # AuthContextProvider for global auth state
  layouts/               # AuthLayout (animated), MainLayout (glassmorphism)
  pages/                 # FeedPage, LoginPage, RegisterPage, ProfilePage, PostDetailsPage
  protectedRoutes/       # AuthProtRoute, MainProtRoute (route guards)
  schema/                # Zod validation schemas
  services/              # API service modules (auth, post, comment, user)
  App.jsx                # Main app component with routing
  main.jsx               # Entry point, providers setup (Auth, HeroUI, Toast)
```

## Current Features
- **Authentication System**
  - Login and Register pages
  - JWT token-based authentication (localStorage persistence)
  - Protected routes for authenticated/unauthenticated users
  - Automatic logout on 401/expired tokens

- **Form Validation**
  - Zod schemas for email, strong password, matching passwords, age (>= 18), gender
  - React Hook Form for efficient form handling

- **Posts Module**
  - Feed page displaying posts with user info, content, and images
  - Create posts (content and/or image)
  - Edit posts (modal) and delete posts
  - View single post details page
  - Add comments and view comments
  - Pagination with a "Load more" button and preserved scroll position
  - Loading skeletons and robust error toasts

- **Profile**
  - Profile page shows the authenticated user's posts list

- **UI/UX Features**
  - Dark/Light mode toggle (persisted via `localStorage.theme`)
  - Responsive design with glassmorphism and animated backgrounds
  - Image viewer modal
  - Toast feedback across flows

- **Layouts**
  - `AuthLayout`: vibrant animated background for auth pages
  - `MainLayout`: subtle animated background, glass effect content area, fixed navbar

- **Routing**
  - Protected routes with React Router v7
  - Automatic redirects based on authentication
  - NotFound page fallback

- **Developer Experience**
  - React Query Devtools enabled

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
- API base URLs configured under `src/services/`
- Token is stored in `localStorage` on login
- Dark mode is toggled and persisted via `localStorage.theme`

## API Integration
- **Authentication** (`https://linked-posts.routemisr.com/users/`)
  - `POST /signup`, `POST /signin`
  - `GET /profile-data` (requires `token` header)
- **Posts** (`https://linked-posts.routemisr.com/posts/`)
  - `GET /` with params: `sort=-createdAt`, `limit`, `page`
  - `GET /:id`
  - `POST /` (multipart: `body`, `image?`) — requires `token`
  - `PUT /:id` (multipart: `body?`, `image?`) — requires `token`
  - `DELETE /:id` — requires `token`
- **Comments** (`https://linked-posts.routemisr.com/comments/`)
  - `POST /` with JSON: `{ content, post }` — requires `token`
- **User** (`https://linked-posts.routemisr.com/users/`)
  - `GET /:id/posts` — requires `token`

All authenticated requests include the `token` header from `localStorage`.

## Roadmap / To Do
- Like/reactions system
- Profile editing and avatar upload
- Infinite scroll (auto-load) for feeds
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
