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


const router = createBrowserRouter([
    {
        path: '', element: <AuthLayout />, children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> }
        ]
    },
    {
        path: '', element: <MainLayout />, children: [
            { index: true, element:<MainProtRoute><FeedPage /></MainProtRoute> },
            { path: 'profile', element: <MainProtRoute><ProfilePage /></MainProtRoute> },
            { path: 'post-details', element: <MainProtRoute><PostDetailsPage /></MainProtRoute> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])


function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App
