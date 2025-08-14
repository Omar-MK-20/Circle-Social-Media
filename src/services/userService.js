import axios from "axios";

const baseUrl = 'https://linked-posts.routemisr.com/users';



export const userApi = 
{
    getUserProfile: async () =>
    {
        try 
        {
            const { data } = await axios.get(baseUrl + '/profile-data', {
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
    }
}