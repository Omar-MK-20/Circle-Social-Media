import { Outlet } from "react-router-dom";
import NvabarComponent from "../components/NvabarComponent";
import MainProtRoute from "../protectetdRoutes/MainProtRoute";

function MainLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 flex flex-col items-center justify-start p-3 sm:p-4 overflow-hidden relative">
            {/* Subtle background shapes (with dark mode colors) */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-8 left-8 w-40 h-40 sm:w-56 sm:h-56 bg-indigo-400 dark:bg-indigo-500 rounded-full filter blur-2xl opacity-15 animate-pulse" />
                <div className="absolute bottom-12 right-12 w-32 h-32 sm:w-44 sm:h-44 bg-blue-400 dark:bg-blue-500 rounded-full filter blur-2xl opacity-10 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-purple-400 dark:bg-purple-500 rounded-full filter blur-xl opacity-10" />
            </div>


            {/* Minimal animated elements */}
            <div
                className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-indigo-200 dark:bg-indigo-700 rounded-full filter blur-2xl opacity-20 animate-pulse"
                style={{ animationDuration: '4s' }}
            ></div>
            <div
                className="absolute bottom-1/3 left-1/5 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200 dark:bg-purple-700 rounded-full filter blur-xl opacity-15 animate-pulse"
                style={{ animationDelay: '2s', animationDuration: '5s' }}
            ></div>

            {/* Subtle floating dots */}
            {/* <div
                className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: '1s', animationDuration: '3s' }}
            ></div> */}
            {/* <div
                className="absolute top-3/4 right-1/3 w-3 h-3 bg-purple-400 dark:bg-purple-300 rounded-full opacity-30 animate-pulse"
                style={{ animationDelay: '2.5s', animationDuration: '4s' }}
            ></div> */}




            {/* Main container */}
            <div className="w-full max-w-6xl">
                {/* Navbar */}
                <NvabarComponent />

                {/* Page title */}
                <h1 className="text-2xl font-bold text-center text-white mb-6 mt-2 drop-shadow-lg">

                </h1>

                {/* Glass effect content wrapper */}
                <div className="w-full flex justify-center mt-20">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
