import { useNavigate, useParams } from "react-router-dom"
import { postApi } from "../services/postService"
import { useEffect, useState } from "react";
import { addToast, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import LoadingPostComponent from "../components/LoadingPostComponent";
import PostComponent from "../components/Post/PostComponent";
import UpdatePostComponent from "../components/Post/UpdatePostComponent";

function PostDetailsPage() {
    const { id } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [post, setPost] = useState(null);
    const [viewImgSrc, setViewImgSrc] = useState(null);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const updataPostDisclosure = useDisclosure();
    const [postDetailsForEdit, setPostDetailsForEdit] = useState({})
    const navigate = useNavigate();


    async function getOnePost() {
        const data = await postApi.getOne(id);
        if (data.error) {
            if (data.error === "Post not found") {
                navigate("/post-not-found");
                return
            }
            addToast(
                {
                    title: "Failed getting Post",
                    description: data.error,
                    color: 'danger',
                }
            )
            setIsLoadingPost(false);
            return
        }
        setIsLoadingPost(false);
        setPost(data.post);

    }

    useEffect(
        () => {
            getOnePost();
        }, []
    )


    return (
        <>
            <div className="w-full max-w-2xl backdrop-blur-md rounded-xl sm:p-6 space-y-7 relative">

                {
                    isLoadingPost ? <LoadingPostComponent /> :
                    post && <PostComponent getData={getOnePost} post={post} onOpen={onOpen} setViewImgSrc={setViewImgSrc} numOfComments={undefined} setPostDetails={setPostDetailsForEdit} updataPostDisclosure={updataPostDisclosure} />
                }


                <UpdatePostComponent postIsOpen={updataPostDisclosure.isOpen} postOnOpenChange={updataPostDisclosure.onOpenChange} postDetails={postDetailsForEdit} queryKey={'posts'} />


                <Modal isOpen={isOpen} size="xl" placement="center" scrollBehavior="outside" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {() => (
                            <>
                                <ModalBody>
                                    <img
                                        className="rounded-xl mx-auto w-full object-cover"
                                        src={viewImgSrc}
                                        alt="Post Photo" />
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default PostDetailsPage