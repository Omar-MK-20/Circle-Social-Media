import axios from "axios";

const baseUrl = 'https://linked-posts.routemisr.com/users/';



export const userApi = 
{
    getUserProfile: async () =>
    {
        try 
        {
            const { data } = await axios.get(baseUrl + 'profile-data', {
                headers:
                {
                    token: localStorage.getItem('token')
                }}
            )

            return data
        } 
        catch (error) 
        {
            return !error.response ? {error: "Network Error"} : error.response.data;
        }
    },

    getUserPosts: (userId) =>
    {
        const response = axios.get(baseUrl+userId+'/posts',
            {
                headers:
                {
                    token: localStorage.getItem('token')
                }
            }
        )
        return response;
    },
    
    updatePhoto: (formData) => 
    {
        const response = axios.put(baseUrl + 'upload-photo', formData, 
            {
                headers: 
                {
                    token: localStorage.getItem('token')
                }
            }
        )
        return response;
    },

    updatePassword: (password, newPassword) =>
    {
        const response = axios.patch(baseUrl + 'change-password', { password, newPassword }, 
            {
                headers: 
                {
                    token: localStorage.getItem('token')
                }
            }
        )
        return response;
    }
}