import { addToast, Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Image, Skeleton } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { postApi } from "../services/postService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import LoadingPostComponent from "../components/LoadingPostComponent";


function FeedPage() {

    const [posts, setPosts] = useState([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();


    async function getAllPosts() {
        setIsLoadingPost(true);
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
                        title: "Feed loading faild",
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
                    title: "Feed loading faild",
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
        <div className="w-full max-w-2xl backdrop-blur-md rounded-xl p-4 sm:p-6 space-y-7 relative">



            {
                isLoadingPost ? <LoadingPostComponent/> :
                posts.map((post) => (

                    <>
                        <Card key={post.id} isBlurred isPressable className="w-full">
                            <CardHeader>
                                <div className="flex gap-5 cursor-pointer">
                                    <Avatar
                                        isBordered
                                        radius="full"
                                        size="md"
                                        src={post.user.photo}
                                    />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{post.user.name}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">{post.createdAt}</h5>
                                    </div>
                                </div>
                            </CardHeader>
                            <Divider className="my-2" />
                            <CardBody className="px-3 py-0 text-small text-default-700 overflow-visible">
                                <p>{post.body}</p>
                            </CardBody>
                            {post.image && <CardBody className="overflow-visible py-2">
                                <img
                                    className="rounded-xl mx-auto w-full h-70 sm:h-100 object-cover "
                                    src={post.image}
                                    alt="Card background" />
                            </CardBody>}
                            <Divider className="my-2" />
                            <CardFooter className="flex gap-3 justify-between">
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">4</p>
                                    <p className=" text-default-400 text-small">Likes</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">{post.comments.length}</p>
                                    <p className="text-default-400 text-small">Comments</p>
                                </div>
                            </CardFooter>
                        </Card></>
                ))
            }






        </div>

    )
}

export default FeedPage