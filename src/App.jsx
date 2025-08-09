import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import FeedPage from './pages/FeedPage'
import LoginPage from './pages/LoginPage'
import PostDetailsPage from './pages/PostDetailsPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import MainProtRoute from './protectetdRoutes/MainProtRoute'
import AuthProtRoute from './protectetdRoutes/AuthProtRoute'


const router = createBrowserRouter([
    {
        path: '', element: <AuthLayout />, children: [
            { path: 'login', element:<AuthProtRoute><LoginPage /></AuthProtRoute> },
            { path: 'register', element:<AuthProtRoute> <RegisterPage /></AuthProtRoute> }
        ]
    },
    {
        path: '', element: <MainLayout />, children: [
            { index: true, element: <MainProtRoute><FeedPage /></MainProtRoute> },
            { path: 'profile', element: <MainProtRoute><ProfilePage /></MainProtRoute> },
            { path: 'post-details', element: <MainProtRoute><PostDetailsPage /></MainProtRoute> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])


function App() {

    document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );


    return (
        <RouterProvider router={router} />
    )
}

export default App
