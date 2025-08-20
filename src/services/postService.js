import axios from "axios";

const baseUrl = 'https://linked-posts.routemisr.com/posts/';



export const postApi =
{
    createOne: (formData) => 
    {
        const response = axios.post(baseUrl, formData, {
            headers:
            {
                "token": localStorage.getItem('token'),
                "Content-Type": 'multipart/form-data'  
            }
        }
        )
        return response;

    },
    
    updateOne: (postId, formData) => 
    {
        const response = axios.put(baseUrl + postId, formData, {
            headers:
            {
                token: localStorage.getItem('token')
            }
        })
        return response
    },

    deleteOne: (postId) => 
    {
        const response = axios.delete(baseUrl+postId,
            {
                headers: 
                {
                    token: localStorage.getItem('token')
                }
            }
        )
        return response
    },

    getAll: (pageParam) => 
    {
        const response = axios.get(baseUrl, {
            headers:
            {
                token: localStorage.getItem('token')
            },
            params:
            {
                sort: '-createdAt',
                limit: 10,
                page: (`${pageParam}`)
            }
        }
        )
        return response;
    },

    getOne: async (postId) => 
    {
        try {
            const { data } = await axios.get(baseUrl + postId, {
                headers:
                {
                    token: localStorage.getItem('token')
                }
            })
            if (data.post == null) {
                throw { response: { data: { error: 'Post not found' } } };
            }
            return data
        }
        catch (error) {
            return !error.response ? { error: "Network Error" } : error.response.data;
        }
    }
}