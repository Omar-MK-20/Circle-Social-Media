import { addToast, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPostComponent from "../components/LoadingPostComponent";
import { AuthContext } from "../contexts/AuthContextProvider";
import { postApi } from "../services/postService";
import relativeTime from 'dayjs/plugin/relativeTime';
import PostComponent from "../components/Post/PostComponent";
import AddPostComponent from "../components/Post/AddPostComponent";


function FeedPage() {

    dayjs.extend(relativeTime);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [posts, setPosts] = useState([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const [viewImgSrc, setViewImgSrc] = useState(null);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();


    async function getAllPosts() {
        // setIsLoadingPost(true);
        const data = await postApi.getAll();
        console.log("🚀 ~ getPosts ~ data:", data);

        if (data.error) {
            console.log("🚀 ~ getAllPosts ~ data.error:", data.error)
            console.log(data.error);
            console.log("invalid token", data.error.includes("invalid token"));
            console.log("JsonWebTokenError", data.error.includes("JsonWebTokenError"));


            if (data.error.includes("JsonWebTokenError") || data.error.includes("invalid token")) {
                addToast(
                    {
                        title: "Feed loading failed",
                        description: 'Login again',
                        color: 'danger',
                    })
                navigate('/login', { viewTransition: true })
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                return

            }
            addToast(
                {
                    title: "Feed loading failed",
                    description: data.error,
                    color: 'danger',
                }
            )
        }

        setIsLoadingPost(false);
        setPosts(data.posts);
        return data;

    }

    useEffect(() => {
        getAllPosts()
    }, [])



    return (
        <>
            <div className="w-full max-w-2xl backdrop-blur-md rounded-xl sm:p-6 space-y-7 relative">

                <AddPostComponent/>

                {
                    isLoadingPost ? <LoadingPostComponent /> :
                        posts.map((post) => (
                            <PostComponent getData={getAllPosts} key={post._id} post={post} onOpen={onOpen} setViewImgSrc={setViewImgSrc} numOfComments={1} />
                        ))
                }


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

export default FeedPage