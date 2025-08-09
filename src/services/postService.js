import axios from "axios";

const baseUrl = 'https://linked-posts.routemisr.com/posts';



export const postApi =
{
    getAll: async () => 
    {
        try 
        {
            const { data } = await axios.get(baseUrl, {
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