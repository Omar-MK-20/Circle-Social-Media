import { addToast, Avatar, Card, CardBody, CardHeader, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import { postApi } from "../services/postService";


function FeedPage() {

    const [posts, setPosts] = useState(null)


    async function getAllPosts() {
        const data = await postApi.getAll()
        console.log("🚀 ~ getPosts ~ data:", data)

        if (data.error) {
            addToast(
                {
                    title: "Feed loading faild",
                    description: data.error,
                    color: 'danger',
                }
            )
        }
        setPosts(data.posts);
        return data

    }

    useEffect(() => {
        // getAllPosts()

    }, [])

    return (
        <div className="w-full max-w-2xl backdrop-blur-md rounded-xl p-4 sm:p-6">

            <Card isBlurred isPressable className="w-full">
                <CardHeader>
                    <div className="flex gap-5 cursor-pointer">
                        {/* <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src="https://heroui.com/avatars/avatar-1.png"
                    /> */}
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400 overflow-visible">
                    <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
                    <span className="pt-2">
                        #FrontendWithZoey
                        <span aria-label="computer" className="py-2" role="img">
                            💻
                        </span>
                    </span>
                </CardBody>
                <CardBody className="overflow-visible py-2">
                    {/* <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    /> */}
                    {/* <img 
                    className="object-cover rounded-xl mx-auto"
                    src="https://heroui.com/images/hero-card-complete.jpeg" 
                    alt="Card background" /> */}
                </CardBody>
            </Card>
        </div>

    )
}

export default FeedPage