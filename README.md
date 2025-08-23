
# LoopIn Social Media

LoopIn is a modern, full-stack social media web application built with React 19, Vite, and a beautiful, responsive UI. It features animated backgrounds, glassmorphism effects, authentication, protected routes, and a modular component structure. The project demonstrates best practices in React development and UI/UX design.

> **Special thanks to Eng [Ahmed Saad](https://github.com/Ahmed-Saad-A)** for helping me choose the perfect name "LoopIn" for this social media application ✨

## 🚀 Tech Stack
- **React 19** + **Vite 7** - Modern React with fast build tooling
- **React Router v7** - Client-side routing with route guards
- **@tanstack/react-query** - Server state management with Devtools
- **HeroUI** - Beautiful UI components and toast notifications
- **Tailwind CSS v4** - Utility-first CSS with dark mode support
- **React Hook Form** + **Zod** - Form handling & validation
- **Axios** - HTTP client for API requests
- **Day.js** - Lightweight date manipulation and relative time
- **Font Awesome** - Icon library
- **Framer Motion** - Animation library for smooth transitions

## 📁 Project Structure
```
src/
  assets/                # Images and SVGs
  components/            # Reusable React components
    Post/               # Post-related components (Add, Edit, View)
    CommentComponent.jsx # Comment display component
    LoadingPostComponent.jsx # Loading skeleton
    NavbarComponent.jsx # Navigation with dark mode toggle
  contexts/              # AuthContextProvider for global auth state
  layouts/               # Page layouts with animations
    AuthLayout.jsx      # Animated background for auth pages
    MainLayout.jsx      # Glass effect with fixed navbar
  pages/                 # Application pages
    FeedPage.jsx        # Main feed with posts
    LoginPage.jsx       # User authentication
    RegisterPage.jsx    # User registration
    ProfilePage.jsx     # User profile and posts
    PostDetailsPage.jsx # Single post view
    NotFoundPage.jsx    # 404 error page
  protectedRoutes/       # Route protection components
  schema/                # Zod validation schemas
  services/              # API service modules
    authService.js      # Authentication endpoints
    postService.js      # Posts CRUD operations
    commentService.js   # Comment creation
    userService.js      # User profile and posts
  App.jsx                # Main app component with routing
  main.jsx               # Entry point, providers setup (Auth, HeroUI, Toast)
```

## ✨ Current Features

### 🔐 Authentication System
- **Login and Register pages** with animated backgrounds
- **JWT token-based authentication** stored in localStorage
- **Protected routes** for authenticated/unauthenticated users
- **Automatic logout** on 401/expired tokens
- **User profile data** fetched automatically on login

### 📝 Posts Module
- **Feed page** displaying posts with user info, content, and images
- **Create posts** with text content and/or image uploads
- **Edit posts** through modal interface (text and image)
- **Delete posts** with confirmation and error handling
- **View single post details** on dedicated page
- **Add comments** to posts with real-time updates
- **View comments** with user information
- **Pagination** with "Load more" button and preserved scroll position
- **Loading skeletons** and robust error toast notifications

### 👤 User Features
- **Profile page** showing authenticated user's posts list
- **User avatar** and information display
- **Navigation** between feed and profile

### 🎨 UI/UX Features
- **Dark/Light mode toggle** persisted via `localStorage.theme`
- **Responsive design** with glassmorphism effects
- **Animated backgrounds** for different layouts
- **Image viewer modal** for post images
- **Toast feedback** across all user interactions
- **Smooth transitions** and hover effects

### 🏗️ Layouts
- **AuthLayout**: Vibrant animated background for authentication pages
- **MainLayout**: Subtle animated background with glass effect content area and fixed navbar

### 🛣️ Routing
- **Protected routes** with React Router v7
- **Automatic redirects** based on authentication status
- **Route guards** for secure navigation
- **NotFound page** fallback for invalid routes

### 🛠️ Developer Experience
- **React Query Devtools** enabled for debugging
- **ESLint configuration** for code quality
- **Modular component architecture** for maintainability

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn package manager

### Installation
1. **Clone the repository** and navigate to the project directory
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```
5. **Preview the production build**:
   ```bash
   npm run preview
   ```

## ⚙️ Environment & Configuration
- **API base URLs** configured under `src/services/`
- **JWT token** stored in `localStorage` on successful login
- **Dark mode preference** persisted via `localStorage.theme`
- **Form validation** using Zod schemas for data integrity

## 🔌 API Integration

### Authentication Endpoints
**Base URL**: `https://linked-posts.routemisr.com/users/`
- `POST /signup` - User registration
- `POST /signin` - User login
- `GET /profile-data` - Get user profile (requires `token` header)

### Posts Endpoints
**Base URL**: `https://linked-posts.routemisr.com/posts/`
- `GET /` - Get posts with pagination
  - Query params: `sort=-createdAt`, `limit=10`, `page`
- `GET /:id` - Get single post by ID
- `POST /` - Create new post (multipart: `body`, `image?`)
- `PUT /:id` - Update existing post (multipart: `body?`, `image?`)
- `DELETE /:id` - Delete post by ID

### Comments Endpoints
**Base URL**: `https://linked-posts.routemisr.com/comments/`
- `POST /` - Create new comment
  - Body: `{ content: string, post: string }`

### User Endpoints
**Base URL**: `https://linked-posts.routemisr.com/users/`
- `GET /:id/posts` - Get posts by specific user ID

**Note**: All authenticated requests include the `token` header from `localStorage`.

## 🗺️ Roadmap & Future Features
- **Real-time updates** using WebSockets
- **Accessibility improvements** (ARIA labels, keyboard navigation)
- **Unit and integration tests** for components and services
- **CI/CD pipeline** and deployment configurations
- **Mobile app** using React Native

## 📜 Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality and consistency

## 🤝 Contributing
This project is open for learning and demonstration purposes. Feel free to:
- Report bugs or suggest features
- Submit pull requests
- Improve documentation
- Add new features

## 📄 License
This project is for learning and demonstration purposes. Please add an appropriate license if you plan to distribute or use this code commercially.

## 🙏 Acknowledgments
- Built with modern React ecosystem tools
- UI components powered by HeroUI
- Styling with Tailwind CSS
- Icons from Font Awesome
- Date handling with Day.js
