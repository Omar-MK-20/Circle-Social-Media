## Circle

A modern React app built with Vite that provides authentication and a polished UI with gradient layouts, subtle animations, and a clean component structure. The project uses HeroUI for components, TailwindCSS for styling, Zod + React Hook Form for validation, and React Router for routing.

### Tech Stack
- **React 19** + **Vite 7**
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
- `src/components/LoadingPostComponent.jsx`: Skeleton loading component for posts
- `src/pages/`: `LoginPage.jsx`, `RegisterPage.jsx`, `FeedPage.jsx`, `ProfilePage.jsx`, `PostDetailsPage.jsx`, `NotFoundPage.jsx`
- `src/services/authService.js`: Auth API calls (signup/signin)
- `src/services/postService.js`: Posts API calls (fetching posts)
- `src/schema/`: `loginSchema.js`, `registerSchema.js` (Zod validation)
- `src/contexts/AuthContextProvider.jsx`: Global authentication state management
- `src/protectetdRoutes/`: Route protection components
- `src/main.jsx`: App root with providers and routing setup

### Current Features
- **Authentication System**: 
  - Login and Register pages with validation and animated, accessible inputs
  - JWT token-based authentication with localStorage persistence
  - Protected routes for authenticated and unauthenticated users
  - Automatic token validation and logout on expired tokens

- **Form Validation**: 
  - Zod schemas enforce email, strong password, matching passwords, age (>= 18), and gender
  - React Hook Form integration for efficient form handling

- **Posts Module**:
  - Feed page displaying posts with user information, content, and images
  - Post cards with like counts and comment counts
  - Loading states with skeleton components
  - Error handling for API failures and token expiration

- **UI/UX Features**:
  - Dark/Light mode toggle in the navbar (persists via localStorage)
  - Responsive design with glass morphism effects
  - Smooth animations and transitions
  - Toast notifications for user feedback

- **Layouts**:
  - `AuthLayout`: vibrant animated background for auth pages
  - `MainLayout`: subtle background with glass effect content area and fixed navbar

- **Routing**: 
  - Protected routes with React Router
  - Automatic redirects based on authentication status
  - Not found fallback included

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
- The auth base URL is currently hardcoded in `src/services/authService.js`
- Posts API base URL is configured in `src/services/postService.js`
- Token is stored in `localStorage` on successful login
- Vercel rewrite config is provided in `vercel.json` for SPA routing

### API Integration
- **Authentication**: `https://linked-posts.routemisr.com/users/` for signup/signin
- **Posts**: `https://linked-posts.routemisr.com/posts` for fetching posts
- Automatic token inclusion in API headers
- Error handling for network issues and authentication failures

### Roadmap / To Do
- **Posts Module Enhancements**:
  - Create new posts functionality
  - Comment system implementation
  - Post editing and deletion
  - Image upload for posts
  - Pagination or infinite scroll for better performance

- **User Module**:
  - Profile page with editable user info and avatar upload
  - Settings page with preferences
  - Enhanced session management with refresh tokens

- **UI/UX Enhancements**:
  - Responsive improvements for mobile devices
  - Accessibility improvements (ARIA labels, focus states, keyboard navigation)
  - Enhanced empty states and error boundaries
  - Performance optimizations (virtual scrolling for large feeds)

- **Error Handling & State Management**:
  - Centralized API error interceptor
  - Standardized error messages and user feedback
  - Global state management for posts cache and user data
  - Offline support and data persistence

- **Testing & Quality**:
  - Unit tests for services and validation schemas
  - Component tests for forms and protected routing
  - Integration tests for API interactions
  - E2E tests for critical user flows

- **Deployment & DevOps**:
  - CI/CD pipeline (GitHub Actions) with lint/build/test
  - Environment variable management for different deployment stages
  - Performance monitoring and analytics
  - SEO optimization

### Scripts
- `npm run dev`: Start development server
- `npm run build`: Build production bundle
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint for code quality

### License
This project is for learning and demonstration purposes. Add a license if you plan to distribute.
