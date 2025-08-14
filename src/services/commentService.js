import axios from "axios";

const baseUrl = 'https://linked-posts.routemisr.com/comments/';



export const commentApi = 
{
    create: async (commentData) => 
    {
        try 
        {
            const { data } = await axios.post(baseUrl, commentData, {
                headers: 
                {
                    token: localStorage.getItem('token')
                }
            } )
            return data
        } 
        catch (error) 
        {
            return !error.response ? {error: "Network Error"} : error.response.data;
        }
    }
}