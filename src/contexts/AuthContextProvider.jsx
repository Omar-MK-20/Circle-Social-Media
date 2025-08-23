import { createContext, useEffect, useState } from "react";
import { userApi } from "../services/userService";
import { addToast } from "@heroui/react";


export const AuthContext = createContext();


export default function AuthContextProvider({children})
{
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [ userData, setUserData ] = useState(null);
    const [isLoading, setIsLoading] = useState(true)


    async function handleUserData() {
            // setIsLoading(true);
            const data = await userApi.getUserProfile();
            if (data.error) 
                {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token')
                    addToast(
                        {
                            title: 'Error getting User Data',
                            color: 'danger'
                        }
                    )
                    // setUserData({
                    //     name: "",
                    //     email: "Retry again",
                    //     photo: "https://linked-posts.routemisr.com/uploads/default-profile.png",
                    // })
                return
            }
            setUserData(data.user);
            setIsLoading(false)
        }
    
    
        useEffect( () => 
        {
            if (isLoggedIn)
            {
                handleUserData();
            }
    
        }, [isLoggedIn])



    return(
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}