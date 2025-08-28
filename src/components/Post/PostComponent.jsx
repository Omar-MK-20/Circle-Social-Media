import { addToast, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { postApi } from '../../services/postService';
import CommentsContainerComponent from '../Comment/CommentsContainerComponent';
import AddCommentComponent from './AddCommentComponent';


function PostComponent({ post, onOpen, setViewImgSrc, numOfComments, getData, updataPostDisclosure, setPostDetails }) {

    dayjs.extend(relativeTime);
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);
    const queryClient = useQueryClient()
    const deletePostWarningDisclosure = useDisclosure();

    function handelUpdatePost() {
        setPostDetails(
            {
                id: post._id,
                body: post.body,
                image: post.image
            }
        )
        updataPostDisclosure.onOpen()
    }


    function handleViewImage(e, imgSrc) {
        if (e.target.localName == 'img') {
            setViewImgSrc(imgSrc);
            onOpen();
            e.stopPropagation();
        }
    }

    function navigateToPostDetails(id) {
        if (!window.location.pathname.includes('post-details')) {
            navigate(`/post-details/${id}`, { viewTransition: true });
        }

    }

    const { mutate, isPending } = useMutation(
        {
            mutationFn: () => postApi.deleteOne(post._id),
            onError: (error) => {
                addToast(
                    {
                        title: "Delete post failed",
                        description: error.response.data.error || error.message,
                        color: 'danger',
                    })
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries();
                addToast(
                    {
                        title: 'Post Deleted Successfully',
                        color: 'success'
                    })
            }
        }
    )

    function handleDeletePost(onClose) {
        mutate();
        onClose();

    }


    return (
        <>

            <Card isDisabled={isPending} onPress={() => navigateToPostDetails(post._id)} key={post._id} as={'div'} isPressable isBlurred className="w-full mb-0 cursor-auto">
                <CardHeader className='relative'>
                    {userData?._id == post.user._id &&
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color='light' className='absolute top-0 end-0 m-4 p-2'>
                                    <i className="fa-solid fa-ellipsis text-2xl"></i>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions" variant="shadow">
                                <DropdownItem onPress={handelUpdatePost} key="edit">Edit</DropdownItem>
                                <DropdownItem onPress={deletePostWarningDisclosure.onOpen} isPending={isPending} key="delete" className="text-danger" color="danger">
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>}

                    <div onClick={(e) => e.stopPropagation()} className="flex gap-5 cursor-pointer">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={post.user.photo}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-medium font-semibold leading-none text-default-600">{post.user.name}</h4>
                            <h5 className="text-small tracking-tight text-default-400">{dayjs(post.createdAt).format('DD/MM/YYYY hh:mm A')}</h5>
                        </div>
                    </div>
                </CardHeader>
                <div onClick={(e) => e.stopPropagation()}>
                    <Divider className="my-2" />
                    <CardBody className="px-3 py-0 text-medium text-default-700 overflow-visible">
                        <p>{post.body}</p>
                    </CardBody>
                    {post.image &&
                        <CardBody className="overflow-visible py-2 block relative">
                            <img onClick={(e) => { handleViewImage(e, post.image) }}
                                className="rounded-xl mx-auto w-full h-70 sm:h-100 object-cover cursor-pointer"
                                src={post.image}
                                alt="Card background"
                            />
                        </CardBody>}
                    <Divider className="my-2" />
                </div>
                <CardFooter className="flex gap-3 justify-between px-6 py-0">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">4</p>
                        <p className=" text-default-400 text-small">Likes</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">{post.comments.length}</p>
                        <p className="text-default-400 text-small">Comments</p>
                    </div>
                </CardFooter>
                <AddCommentComponent getData={getData} postId={post._id} />
            </Card>
            <div className='mt-1'>
                {post.comments &&
                    <CommentsContainerComponent isPendingDelete={isPending} getData={getData} postUser={post.user} comments={post.comments} numOfComments={numOfComments} />
                }
            </div>

            <Modal isOpen={deletePostWarningDisclosure.isOpen} onOpenChange={deletePostWarningDisclosure.onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this post?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={() => handleDeletePost(onClose)}>
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

export default PostComponent