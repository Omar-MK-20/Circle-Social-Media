import axios from "axios";

const baseUrl = 'https://linked-posts.routemisr.com/users/';



export const authApi =
{
    registerUser: async (formData) => 
    {
        try
        {
            const { data } = await axios.post(baseUrl + 'signup', formData);
            return data;
        }
        catch(error)
        {
            return !error.response ? {error: "Network Error"} : error.response.data;
        }
    },
    loginUser: async (formData) => 
    {
        try
        {
            const { data } = await axios.post(baseUrl+ 'signin', formData);
            localStorage.setItem('token', data.token);
            return data;
        }
        catch(error)
        {
            return !error.response ? {error: "Network Error"} : error.response.data;
        }
    }
}



