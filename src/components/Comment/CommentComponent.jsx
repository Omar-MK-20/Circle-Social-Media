import { addToast, Avatar, Button, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useState } from 'react';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useMutation } from '@tanstack/react-query';
import { commentApi } from '../../services/commentService';

function CommentComponent({ getData, comment, postUser }) {
    dayjs.extend(relativeTime);
    const { userData } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [commentContent, setCommentContent] = useState({ id: null, content: '' });

    function handleIsEditingComment(content, id) {
        if (isEditing) {
            setIsEditing(false)
        }
        else {
            setIsEditing(true)
            console.log(content, id)
            setCommentContent({ content: content, id: id })
        }
    }

    function updateComment() {
        console.log(commentContent)
        mutate();

    }

    const { mutate, error, isLoading } = useMutation(
        {
            mutationFn: () => commentApi.update(commentContent.content, commentContent.id),
            onError: () => {
                addToast(
                    {
                        title: 'Failed to update comment',
                        message: error?.response?.data?.message || error.message,
                        color: 'danger',
                    }
                )
            },
            onSuccess: async () => {
                if (getData) {
                    await getData()
                }
                setIsEditing(false)
                addToast(
                    {
                        title: 'Comment updated successfully',
                        color: 'success',
                    }
                )

            }
        }
    )

    return (
        <>

            {((userData?._id == comment.commentCreator._id) || postUser._id == userData?._id ) &&
                <Dropdown className='relative '>
                    <DropdownTrigger>
                        <Button color='light' className='absolute top-0 end-0 m-4 p-2'>
                            <i className="fa-solid fa-ellipsis text-2xl"></i>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" variant="shadow">
                        <DropdownItem onPress={() => handleIsEditingComment(comment.content, comment._id)} key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>}
            <div className="flex gap-5 cursor-pointer w-fit">
                <Avatar
                    isBordered
                    radius="full"
                    size="sm"
                    src={avatar}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">{comment.commentCreator.name}</h4>
                    <h5 className="text-small tracking-tight text-default-400">{dayjs(comment.createdAt).fromNow()}</h5>
                </div>
            </div>
            {isEditing
                ?
                <CardBody>
                    <Input value={commentContent.content} onChange={(e) => setCommentContent({ content: e.target.value, id: commentContent.id })} />
                    <div className='flex ms-auto pt-2 space-x-2'>
                        <Button onPress={handleIsEditingComment} color="warning" variant="flat" >Cancel</Button>
                        <Button onPress={updateComment} isLoading={isLoading} isDisabled={commentContent.content == comment.content ? true : false} color="primary" >Save</Button>
                    </div>
                </CardBody>
                :
                <CardBody className="px-3 py-0 text-medium text-default-700 overflow-visible">
                    <p className="text-sm">{comment.content}</p>
                </CardBody>}
            <Divider />
        </>
    )
}

export default CommentComponent