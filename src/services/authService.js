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
            if(!error.response)
            {
                return {error: "Network Error"}
            }
            return error.response.data
        }
    }
}



