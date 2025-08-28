import { Card } from '@heroui/react';
import CommentComponent from './CommentComponent';

function CommentsContainerComponent({ isPendingDelete, getData, comments, numOfComments, postUser }) {


    return (
        <>
            {comments.slice(0, numOfComments).map((comment) => (
                <Card isDisabled={isPendingDelete} isBlurred key={comment._id} className="px-8 py-4 flex flex-col items-start gap-3 mx-auto h-fit sm:my-1 w-auto rounded-none shadow-none">

                    <CommentComponent postUser={postUser} getData={getData} comment={comment} />
                </Card>
            ))
            }
        </>
    )
}

export default CommentsContainerComponent