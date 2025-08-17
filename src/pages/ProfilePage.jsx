import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { userApi } from "../services/userService";
import AddPostComponent from "../components/Post/AddPostComponent";
import LoadingPostComponent from "../components/LoadingPostComponent";
import PostComponent from "../components/Post/PostComponent";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { useState } from "react";




function ProfilePage() {

    const { id } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [viewImgSrc, setViewImgSrc] = useState(null);

    const { data: { posts = [] } = {}, isLoading, isError, error, refetch, isFetching } = useQuery(
        {
            queryKey: ['userPosts'],
            queryFn: () => userApi.getUserPosts(id),
            select: (data) => data.data,
            staleTime: 1000 * 30 * 1
        }
    )


    return (
        <div className="w-full max-w-2xl backdrop-blur-md rounded-xl sm:p-6 space-y-7 relative">
            <AddPostComponent refetch={refetch} isFetching={isFetching} />


            {
                isLoading
                    ?
                    <LoadingPostComponent />
                    :
                    isError
                        ?
                        <div className="w-full text-center bg-red-300/50 text-red-600 py-4  rounded-md ">{error.message}</div>
                        :
                        posts.map((post) => (
                            <PostComponent getData={refetch} key={post._id} post={post} onOpen={onOpen} setViewImgSrc={setViewImgSrc} numOfComments={1} />
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
    )
}

export default ProfilePage