import axios from "axios";

const baseUrl = 'https://linked-posts.routemisr.com/posts/';



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
                },
                params:
                {
                    sort: '-createdAt',
                    limit: 50
                }
            }
            )        
            return data

        } 
        catch (error)
        {
            return !error.response ? {error: "Network Error"} : error.response.data;
    
        }
    },

    getOne: async (postId) => 
    {
        try 
        {
            const { data } = await axios.get(baseUrl + postId, {
                headers: 
                {
                    token: localStorage.getItem('token')
                }
            })
            if(data.post == null)
            {
                throw {response:{data: {error: 'Post not found'}}};
            }
            return data
        } 
        catch (error) 
        {
            return !error.response ? {error: "Network Error"} : error.response.data;
        }
    }
}