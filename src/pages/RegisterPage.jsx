import { Input } from "@heroui/react"




function RegisterPage() {
    return (
        <>
            {/* Main Register Card with entrance animation */}
            <div className="relative w-full max-w-sm sm:max-w-md transform transition-all duration-1000 ease-out ">
                <div
                    className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:shadow-3xl hover:border-white/30 dark:hover:border-white/20 hover:scale-105 backdrop-blur-lg"
                    style={{
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)'
                    }}
                >
                    {/* Header with animation */}
                    <div className="text-center mb-6 sm:mb-8 transform transition-all duration-700 hover:scale-110">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white dark:text-gray-100 mb-2 hover:text-purple-200 transition-all duration-300 animate-pulse">
                            Create Account
                        </h1>
                        <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400 transform transition-all duration-500 hover:text-gray-200">
                            Join us today and get started
                        </p>
                    </div>

                    {/* Register Form with animations */}
                    <form className="space-y-4 sm:space-y-5">
                        {/* Name Field */}
                        {/* <div className="space-y-1.5 sm:space-y-2 transform transition-all duration-500 hover:translate-x-2"> */}
                            {/* <label
                                className="block text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300 transition-all duration-300 hover:text-purple-200"
                                htmlFor="name"
                            >
                                Full Name
                            </label> */}
                            {/* <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg transform hover:scale-105 focus:scale-105 hover:-translate-y-1 focus:-translate-y-1 animate-pulse hover:animate-none focus:animate-none"
                                classNames={
                                    {   
                                        // base:'text-white',
                                        inputWrapper:'bottom-0 bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent'
                                    }
                                }
                            /> */}
                            <Input
                                id="name"
                                type="text"
                                label="Full Name"
                                labelPlacement="outside"
                                placeholder="Enter your full name"
                                className="transform transition-all duration-500 hover:translate-x-2"
                                classNames={{
                                    base: "space-y-1.5 sm:space-y-2",
                                    label: "text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300 transition-all duration-300 hover:text-purple-200 group-data-[filled-within=true]:text-gray-200 pb-1",
                                    input: "w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg transform hover:scale-105 focus:scale-105 hover:-translate-y-1 focus:-translate-y-1 animate-pulse hover:animate-none focus:animate-none group-data-[has-value=true]:text-white",
                                    inputWrapper: "bg-transparent border-none shadow-none p-0 h-auto data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent group-data-[focus-visible=true]:ring-0 data-[focus-visible=true]:ring-offset-0",

                                }}
                            />
                        {/* </div> */}


                        {/* Email Field */}
                        <div className="space-y-1.5 sm:space-y-2 transform transition-all duration-500 hover:-translate-x-2">
                            <label
                                className="block text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300 transition-all duration-300 hover:text-purple-200"
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg transform hover:scale-105 focus:scale-105 hover:-translate-y-1 focus:-translate-y-1 animate-pulse hover:animate-none focus:animate-none"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5 sm:space-y-2 transform transition-all duration-500 hover:translate-x-2">
                            <label
                                className="block text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300 transition-all duration-300 hover:text-purple-200"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg transform hover:scale-105 focus:scale-105 hover:-translate-y-1 focus:-translate-y-1 animate-pulse hover:animate-none focus:animate-none"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-1.5 sm:space-y-2 transform transition-all duration-500 hover:-translate-x-2">
                            <label
                                className="block text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300 transition-all duration-300 hover:text-purple-200"
                                htmlFor="rePassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="rePassword"
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg transform hover:scale-105 focus:scale-105 hover:-translate-y-1 focus:-translate-y-1 animate-pulse hover:animate-none focus:animate-none"
                            />
                        </div>

                        {/* Date of Birth Field */}
                        <div className="space-y-1.5 sm:space-y-2 transform transition-all duration-500 hover:translate-x-2">
                            <label
                                className="block text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300 transition-all duration-300 hover:text-purple-200"
                                htmlFor="dateOfBirth"
                            >
                                Date of Birth
                            </label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg transform hover:scale-105 focus:scale-105 hover:-translate-y-1 focus:-translate-y-1 animate-pulse hover:animate-none focus:animate-none"
                            />
                        </div>

                        {/* Gender Field */}
                        <div className="space-y-1.5 sm:space-y-2 transform transition-all duration-500 hover:-translate-x-2">
                            <label
                                className="block text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300 transition-all duration-300 hover:text-purple-200"
                                htmlFor="gender"
                            >
                                Gender
                            </label>
                            <select
                                id="gender"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg transform hover:scale-105 focus:scale-105 hover:-translate-y-1 focus:-translate-y-1 animate-pulse hover:animate-none focus:animate-none"
                            >
                                <option value="" className="bg-gray-800 dark:bg-gray-900">
                                    Select your gender
                                </option>
                                <option value="male" className="bg-gray-800 dark:bg-gray-900">
                                    Male
                                </option>
                                <option value="female" className="bg-gray-800 dark:bg-gray-900">
                                    Female
                                </option>
                                <option value="other" className="bg-gray-800 dark:bg-gray-900">
                                    Other
                                </option>
                                <option value="prefer-not-to-say" className="bg-gray-800 dark:bg-gray-900">
                                    Prefer not to say
                                </option>
                            </select>
                        </div>

                        {/* Register Button with animation */}
                        <div className="transform transition-all duration-700 hover:scale-110">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 dark:from-purple-600 dark:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-indigo-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg text-sm sm:text-base touch-manipulation hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden hover:animate-pulse hover:-translate-y-2 hover:rotate-1"
                            >
                                <span className="relative z-10 transition-all duration-300 hover:scale-110">
                                    Create Account
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* Footer with animation */}
                    <div className="mt-6 sm:mt-8 text-center transform transition-all duration-500 hover:scale-105">
                        <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400 animate-pulse">
                            Already have an account?{' '}
                            <a
                                href="#"
                                className="text-purple-400 hover:text-purple-300 dark:text-purple-300 dark:hover:text-purple-200 font-medium transition-all duration-300 hover:underline hover:underline-offset-2 hover:scale-110 inline-block transform hover:-translate-y-1"
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage