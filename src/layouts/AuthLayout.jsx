import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (<>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-3 sm:p-4 overflow-hidden relative">
            {/* Animated background circles */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Main floating circles */}
                <div className="absolute -top-4 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 dark:bg-purple-500 rounded-full  filter blur-xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute bottom-8 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400 dark:bg-blue-500 rounded-full  filter blur-xl opacity-20 animate-pulse"
                    style={{ animationDelay: '2s' }}
                ></div>
                {/* <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-400 dark:bg-indigo-500 rounded-full  filter blur-xl opacity-20 animate-pulse"
                    style={{ animationDelay: '4s' }}
                ></div> */}

                {/* Additional animated circles */}
                <div
                    className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-pink-400 dark:bg-pink-500 rounded-full  filter blur-2xl opacity-15 animate-bounce"
                    style={{ animationDelay: '1s', animationDuration: '3s' }}
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 bg-cyan-400 dark:bg-cyan-500 rounded-full  filter blur-2xl opacity-15 animate-bounce"
                    style={{ animationDelay: '2.5s', animationDuration: '4s' }}
                ></div>
                <div
                    className="absolute top-3/4 left-3/4 w-20 h-20 sm:w-28 sm:h-28 bg-violet-400 dark:bg-violet-500 rounded-full  filter blur-xl opacity-20 animate-ping"
                    style={{ animationDelay: '3s' }}
                ></div>

                {/* Floating particles */}
                <div
                    className="absolute top-1/3 right-1/3 w-4 h-4 bg-white rounded-full opacity-30 animate-ping"
                    style={{ animationDelay: '0.5s' }}
                ></div>
                <div
                    className="absolute top-2/3 left-1/5 w-9 h-9 bg-white rounded-full opacity-40 animate-ping"
                    style={{ animationDelay: '1.5s' }}
                ></div>
                {/* <div
                    className="absolute top-1/5 right-1/5 w-5 h-5 bg-white rounded-full opacity-25 animate-ping"
                    style={{ animationDelay: '2.8s' }}
                ></div> */}
                <div
                    className="absolute top-30 left-20 w-5 h-5 bg-white rounded-full opacity-50 animate-ping"
                    style={{ animationDelay: '0.8s' }}
                ></div>

                {/* Additional spinning circles */}
                {/* <div className="absolute top-10 left-10 w-16 h-16 border-2 border-purple-300 dark:border-purple-400 rounded-full opacity-20 animate-spin"></div> */}
                {/* <div
                    className="absolute bottom-20 right-20 w-12 h-12 border border-blue-300 dark:border-blue-400 rounded-full opacity-30 animate-spin"
                    style={{ animationDelay: '1s', animationDuration: '3s' }}
                ></div> */}
                {/* <div
                    className="absolute top-40 right-40 w-8 h-8 border border-indigo-300 dark:border-indigo-400 rounded-full opacity-25 animate-spin"
                    style={{ animationDelay: '2s', animationDuration: '4s' }}
                ></div> */}
            </div>

            <Outlet />
        </div>
    </>)
}

export default AuthLayout