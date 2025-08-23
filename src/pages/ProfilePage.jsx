import { addToast, Button } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import LoadingChPassComponent from '../components/LoadingChPassComponent';
import LoadingSettingsComponent from '../components/LoadingSettingsComponent';
import RePasswordComponent from '../components/RePasswordComponent';
import { AuthContext } from '../contexts/AuthContextProvider';
import { userApi } from '../services/userService';


function ProfilePage() {

    const { userData, isLoading } = useContext(AuthContext)
    const [photoPreview, setPhotoPreview] = useState(null);
    const [profileImg, setProfileImg] = useState(null)
    const [formData, setFormData] = useState(null)
    const fileInputRef = useRef();

    console.log(isLoading);

    // Only for preview, no logic
    const handlePhotoChange = (e) => {
        const file = e.target.files && e.target.files[0];
        console.log("🚀 ~ handlePhotoChange ~ file:", file)
        if (file) {
            if (file.size < 2 * 1024 * 1024) { // 2MB limit
                setPhotoPreview(URL.createObjectURL(file));
                setProfileImg(file)
                const formData = new FormData();
                formData.append('photo', file);
                setFormData(formData);
            } else {
                addToast(
                    {
                        title: 'Image is too large',
                        color: 'danger',
                    }
                )
            }
        }
    };

    const { mutate } = useMutation(
        {
            mutationFn: () => userApi.updatePhoto(formData),
            onSuccess: () => {
                addToast(
                    {
                        title: 'Profile photo updated successfully',
                        color: 'success',
                    }
                )
            },
            onError: (error) => {
                addToast(
                    {
                        title: 'Failed to update profile photo',
                        description: error.message,
                        color: 'danger',
                    }
                )
            }
        }
    )

    function handleUpdatePhoto() {
        if (formData) {
            mutate();
        }
    }


    useEffect(() => {
        if (!isLoading) {
            setPhotoPreview(userData.photo)
        }
    }, [userData])

    return (
        <div className="w-full max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Profile Settings</h2>
            {/* Profile Card */}
            {isLoading
                ?
                <LoadingSettingsComponent />
                :
                <>
                    <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl shadow-lg p-6 mb-10 backdrop-blur-md border border-white/20">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* Profile Photo */}
                            <div className='flex flex-col'>
                                <div className="relative group pb-2">
                                    <img src={photoPreview} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-md" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handlePhotoChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow transition"
                                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                    >
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>
                                <Button onPress={handleUpdatePhoto} isDisabled={profileImg == null} color='primary' size="sm">save</Button>
                            </div>
                            {/* User Info */}
                            <div className="flex-1 w-full">
                                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-200 mb-1">Name</label>
                                        <input type="text" value={userData.name} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" readOnly />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
                                        <input type="email" value={userData.email} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" readOnly />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-200 mb-1">Date of Birth</label>
                                        <input type="date" value={userData.dateOfBirth.slice(0, 10)} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" readOnly />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-200 mb-1">Gender</label>
                                        <input type="text" value={userData.gender} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" readOnly />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-gray-700 dark:text-gray-200 mb-1">Member Since</label>
                                        <input type="text" value={new Date(userData.createdAt).toLocaleDateString()} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" readOnly />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }

            {/* Change Password Section */}
            {
                isLoading
                    ?
                    <LoadingChPassComponent />
                    :
                    <RePasswordComponent />
            }
        </div>
    );
}

export default ProfilePage