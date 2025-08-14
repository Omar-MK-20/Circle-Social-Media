import { createContext, useEffect, useState } from "react";
import { userApi } from "../services/userService";


export const AuthContext = createContext();


export default function AuthContextProvider({children})
{
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [ userData, setUserData ] = useState(null);


    async function handleUserData() {
            const data = await userApi.getUserProfile();
            if (data.error) {
                setUserData({
                    name: "",
                    email: "Retry again",
                    photo: "https://linked-posts.routemisr.com/uploads/default-profile.png",
                })
                return
            }
            setUserData(data.user);
        }
    
    
        useEffect( () => 
        {
            if (isLoggedIn)
            {
                handleUserData();
            }
    
        }, [isLoggedIn])



    return(
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    )
}