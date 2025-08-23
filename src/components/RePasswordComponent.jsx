import { addToast, Button, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import rePasswordSchema from '../schema/rePasswordSchema';
import { userApi } from '../services/userService';

function RePasswordComponent() {
    const [passwordData, setPasswordData] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues:
            {
                "password": "",
                "newPassword": "",
                "confirmNewPassword": ""
            },
            resolver: zodResolver(rePasswordSchema),
        }
    );


    const { mutate, isLoading } = useMutation(
        {
            mutationFn: () => userApi.updatePassword(passwordData.password, passwordData.newPassword),
            onSuccess: () => 
            {
                addToast(
                    {
                        title: 'Password updated successfully',
                        color: 'success',
                    }
                )
            },
            onError: (error) =>
            {
                addToast(
                    {
                        title: 'Failed to update password',
                        description: error.message,
                        color: 'danger',
                    }
                )
            }
        }
    )


    function handleUpdatePassword(data) 
    {
        console.log("🚀 ~ handleUpdatePassword ~ data:", data)
        const { password, newPassword } = data;
        setPasswordData({ password, newPassword });
        console.log("🚀 ~ handleUpdatePassword ~ passwordData:", passwordData)
        mutate();
    }



    return (
        <>
            {/* {setPhotoPreview(userData.photo)} */}
            <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl shadow-lg p-6 mb-10 backdrop-blur-md border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Change Password</h3>
                <Form onSubmit={handleSubmit(handleUpdatePassword)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <Input errorMessage={errors.password?.message} isInvalid={!!errors.password} label="Current Password" autoComplete='current-password' type="password" {...register("password")}  />
                    </div>
                    <div>
                        <Input errorMessage={errors.newPassword?.message} isInvalid={!!errors.newPassword} label="New Password" autoComplete='new-password' type="password" {...register("newPassword")}  />
                    </div>
                    <div>
                        <Input errorMessage={errors.confirmNewPassword?.message} isInvalid={!!errors.confirmNewPassword} label="Confirm New Password" autoComplete='new-password' type="password" {...register("confirmNewPassword")}  />
                    </div>
                    <div className="sm:col-span-2 flex justify-end mt-2">
                        <Button color='primary' type="submit" isLoading={isLoading} >Change Password</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default RePasswordComponent