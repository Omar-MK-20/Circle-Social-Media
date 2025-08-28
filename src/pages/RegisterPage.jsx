import { addToast, Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import registerSchema from "../schema/registerSchema";
import { authApi } from "../services/authService";








function RegisterPage() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()



    const { handleSubmit, register, formState: { errors } } = useForm(
        {
            defaultValues:
            {
                "name": "",
                "email": "",
                "password": "",
                "rePassword": "",
                "dateOfBirth": "",
                "gender": ""
            },
            resolver: zodResolver(registerSchema),
            mode: 'onBlur'
        }
    )


    async function submitFormData(formData) {
        setIsLoading(true);
        const data = await authApi.registerUser(formData);
        setIsLoading(false);

        if(data.error)
        {   
            addToast(
                {
                    title: "Faild Register",
                    description: data.error,
                    color: 'danger',
                }
            )
        }
        else
        {
            addToast(
                {
                    title: "Successful Register",
                    description: data.message,
                    color: 'success'
                }
            )
            navigate('/login', {viewTransition: true});
        }

    }




    return (
        <>
            {/* Main Register Card with entrance animation */}
            <div className="relative w-full max-w-sm sm:max-w-md transform transition-all duration-1000 ease-out ">
                <div
                    className="bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:shadow-3xl hover:border-white/30 dark:hover:border-white/20 hover:scale-105 backdrop-blur-lg"
                    style={{
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)'
                    }}
                >
                    {/* Header with animation */}
                    <div className="text-center mb-6 sm:mb-8 transform transition-all duration-700 hover:scale-110">
                        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-2 hover:text-purple-200 transition-all duration-300 animate-pulse">
                            Create Account
                        </h1>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 transform transition-all duration-500 hover:text-gray-200">
                            Join us today and get started
                        </p>
                    </div>

                    {/* Register Form with animations */}
                    <form
                        onSubmit={handleSubmit(submitFormData)}
                        className="space-y-9 sm:space-y-9">


                        {/* Name Field */}
                        <Input
                            {...register('name')}
                            errorMessage={errors.name?.message}
                            isInvalid={!!errors.name}
                            type="text"
                            className="hover:scale-105 transition-all duration-300 focus-within:scale-105 focus-within:shadow-2xl hover:shadow-2xl pt-1 rounded-lg"
                            label="Full Name"
                            placeholder="Enter your full name"
                            radius="sm"
                            labelPlacement="outside"
                            autoComplete="username"
                        />


                        {/* Email Field */}
                        <Input
                            {...register('email')}
                            errorMessage={errors.email?.message}
                            isInvalid={!!errors.email}
                            type="email"
                            className="hover:scale-105 transition-all duration-300 focus-within:scale-105 focus-within:shadow-2xl hover:shadow-2xl rounded-lg"
                            label="Email"
                            placeholder="Enter your email"
                            radius="sm"
                            labelPlacement="outside"
                            autoComplete="email"
                        />



                        {/* Password Field */}
                        <Input
                            {...register('password')}
                            errorMessage={errors.password?.message}
                            isInvalid={!!errors.password}
                            type="password"
                            autoComplete="password"
                            className="hover:scale-105 transition-all duration-300 focus-within:scale-105 focus-within:shadow-2xl hover:shadow-2xl rounded-lg"
                            label="Password"
                            placeholder="Enter your Password"
                            radius="sm"
                            labelPlacement="outside"
                        />



                        {/* Confirm Password Field */}
                        <Input
                            {...register('rePassword')}
                            errorMessage={errors.rePassword?.message}
                            isInvalid={!!errors.rePassword}
                            type="Password"
                            autoComplete="password"
                            className="hover:scale-105 transition-all duration-300 focus-within:scale-105 focus-within:shadow-2xl hover:shadow-2xl rounded-lg"
                            label="Confirm Password"
                            placeholder="Enter your password again"
                            radius="sm"
                            labelPlacement="outside"
                        />




                        {/* Date of Birth Field */}
                        <Input
                            {...register('dateOfBirth')}
                            errorMessage={errors.dateOfBirth?.message}
                            isInvalid={!!errors.dateOfBirth}
                            type="date"
                            className="hover:scale-105 transition-all duration-300 focus-within:scale-105 focus-within:shadow-2xl hover:shadow-2xl rounded-lg"
                            label="Date of Birth"
                            radius="sm"
                            labelPlacement="outside"
                        />


                        {/* Gender Field */}
                        <Select
                            {...register('gender')}
                            errorMessage={errors.gender?.message}
                            isInvalid={!!errors.gender}
                            label="Gender"
                            className="hover:scale-105 transition-all duration-300 focus-within:scale-105 focus-within:shadow-2xl hover:shadow-2xl rounded-lg"
                            labelPlacement="outside"
                            placeholder="Select your gender"
                            radius="sm"
                        >
                            <SelectItem key={'male'}>
                                Male
                            </SelectItem>
                            <SelectItem key={'female'}>
                                Female
                            </SelectItem>
                        </Select>

                        {/* Register Button with animation */}
                        <div className="transform transition-all duration-700 hover:scale-110 pt-2">
                            <Button
                                isLoading={isLoading}
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 dark:from-purple-600 dark:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-indigo-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg text-sm sm:text-base touch-manipulation hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden hover:animate-pulse hover:-translate-y-2 hover:rotate-1"
                            >
                                <span className="relative z-10 transition-all duration-300 hover:scale-110">
                                    Create Account
                                </span>
                            </Button>
                        </div>
                    </form>

                    {/* Footer with animation */}
                    <div className="mt-6 sm:mt-8 text-center transform transition-all duration-500 hover:scale-105">
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 animate-pulse">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                viewTransition
                                className="text-purple-600 hover:text-purple-300 dark:text-purple-300 dark:hover:text-purple-200 font-medium transition-all duration-300 hover:underline hover:underline-offset-2 hover:scale-110 inline-block transform hover:-translate-y-1"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage