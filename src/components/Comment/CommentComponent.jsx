import { addToast, Avatar, Button, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useState } from 'react';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../../services/commentService';

function CommentComponent({ getData, comment, postUser }) {
    dayjs.extend(relativeTime);
    const { userData } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [commentContent, setCommentContent] = useState({ id: null, content: '' });
    const deleteCommentWarningDisclosure = useDisclosure();
    const queryClient = useQueryClient();

    function handleIsEditingComment(content, id) {
        if (isEditing) {
            setIsEditing(false)
        }
        else {
            setIsEditing(true)
            setCommentContent({ content: content, id: id })
        }
    }

    function updateComment() {
        updateMutation.mutate();

    }

    function deleteComment(onClose)
    {
        deleteMutation.mutate(comment._id, {
            onSuccess: () => onClose()
        })
    }

    const updateMutation = useMutation(
        {
            mutationFn: () => commentApi.update(commentContent.content, commentContent.id),
            onError: (error) => {
                addToast(
                    {
                        title: 'Failed to update comment',
                        description: error.response.data.error || error.message,
                        color: 'danger',
                    }
                )
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries();
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

    const deleteMutation = useMutation(
        {
            mutationFn: commentApi.delete,
            onError: (error) => 
            {
                addToast(
                    {
                        title: 'Failed to delete Comment',
                        description: error.response.data.message || error.message,
                        color: 'danger'
                    }
                )
            },
            onSuccess: async () =>
            {
                await queryClient.invalidateQueries();
                if (getData) {
                    await getData()
                }
                addToast(
                    {
                        title: 'Comment deleted Successfully',
                        color: 'success'
                    }
                )
            }
        }
    )

    return (
        <>

            {((userData?._id == comment.commentCreator._id) || postUser._id == userData?._id) &&
                <Dropdown className='relative '>
                    <DropdownTrigger>
                        <Button color='light' className='absolute top-0 end-0 m-4 p-2'>
                            <i className="fa-solid fa-ellipsis text-2xl"></i>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" variant="shadow">
                        <DropdownItem onPress={() => handleIsEditingComment(comment.content, comment._id)} key="edit">Edit</DropdownItem>
                        <DropdownItem onPress={deleteCommentWarningDisclosure.onOpen} key="delete" className="text-danger" color="danger">
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
                        <Button onPress={updateComment} isLoading={updateMutation.isPending} isDisabled={commentContent.content == comment.content ? true : false} color="primary" >Save</Button>
                    </div>
                </CardBody>
                :
                <CardBody className="px-3 py-0 text-medium text-default-700 overflow-visible">
                    <p className="text-sm">{comment.content}</p>
                </CardBody>}
            <Divider />

            <Modal isOpen={deleteCommentWarningDisclosure.isOpen} onOpenChange={deleteCommentWarningDisclosure.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Comment</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this comment?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={() => deleteComment(onClose)} isLoading={deleteMutation.isPending}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default CommentComponent