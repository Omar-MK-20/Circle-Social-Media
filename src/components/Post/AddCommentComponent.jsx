import { addToast, Button, CardFooter, Divider, Input } from '@heroui/react'
import { useEffect, useState } from 'react';
import { commentApi } from '../../services/commentService';

function AddCommentComponent({postId, getData}) {

    const [commentContent, setCommentContent] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);


    useEffect( () => 
    {
        if(commentContent != '')
        {
            setIsDisabled(false);
        }
        else
        {
            setIsDisabled(true);
        }
    }, [commentContent])


    async function handleCreateComment()
    {
        const commentData = 
        {
            content: commentContent,
            post: postId
        }
        setIsCommentSubmitting(true);
        const response = await commentApi.create(commentData);
        if(response.error)
        {
            addToast(
                {
                    title: 'Failed add Comment',
                    description: response.error,
                    color: 'danger'
                }
            )
        }
        await getData();
        setIsCommentSubmitting(false);
        setCommentContent('');
    }



    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Divider className="my-2" />
            <CardFooter className="gap-1">
                <Input 
                    onKeyDown={(e) => (e.stopPropagation())}
                    value={commentContent} 
                    onChange={(e)=> setCommentContent(e.target.value)} 
                    placeholder="Comment..." 
                    endContent={<Button 
                                    onPress={handleCreateComment} 
                                    color="primary" 
                                    size="sm"
                                    isDisabled={isDisabled}
                                    isLoading={isCommentSubmitting}
                                >Comment
                                </Button>}
                />
                
            </CardFooter>

        </div>
    )
}

export default AddCommentComponent