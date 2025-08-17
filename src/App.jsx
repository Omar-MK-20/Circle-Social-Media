import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import FeedPage from './pages/FeedPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PostDetailsPage from './pages/PostDetailsPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import AuthProtRoute from './protectedRoutes/AuthProtRoute'
import MainProtRoute from './protectedRoutes/MainProtRoute'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




const router = createBrowserRouter([
    {
        path: '', element: <AuthLayout />, children: [
            { path: 'login', element: <AuthProtRoute><LoginPage /></AuthProtRoute> },
            { path: 'register', element: <AuthProtRoute> <RegisterPage /></AuthProtRoute> }
        ]
    },
    {
        path: '', element: <MainLayout />, children: [
            { index: true, element: <MainProtRoute><FeedPage /></MainProtRoute> },
            { path: 'profile/:id', element: <MainProtRoute><ProfilePage /></MainProtRoute> },
            { path: 'post-details/:id', element: <MainProtRoute><PostDetailsPage /></MainProtRoute> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])


export const queryClient = new QueryClient();


function App() {

    document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );





    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools/>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
