import { addToast, Button, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../App";
import LoadingPostComponent from "../components/LoadingPostComponent";
import AddPostComponent from "../components/Post/AddPostComponent";
import PostComponent from "../components/Post/PostComponent";
import { AuthContext } from "../contexts/AuthContextProvider";
import { postApi } from "../services/postService";


function FeedPage() {

    dayjs.extend(relativeTime);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [viewImgSrc, setViewImgSrc] = useState(null);
    
    // const [posts, setPosts] = useState([]);
    // const [isLoadingPost, setIsLoadingPost] = useState(true);
    // const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)
    // const [error, setError] = useState(null)


    // async function getAllPosts() {
    //     setError(null)
    //     // setIsLoadingPost(true);
    //     const data = await postApi.getAll();
    //     console.log("🚀 ~ getPosts ~ data:", data);

    //     if (data.error) {
    //         console.log("🚀 ~ getAllPosts ~ data.error:", data.error)
    //         console.log(data.error);
    //         console.log("invalid token", data.error.includes("invalid token"));
    //         console.log("JsonWebTokenError", data.error.includes("JsonWebTokenError"));


    //         if (data.error.includes("JsonWebTokenError") || data.error.includes("invalid token")) {
    //             addToast(
    //                 {
    //                     title: "Feed loading failed",
    //                     description: 'Login again',
    //                     color: 'danger',
    //                 })
    //             navigate('/login', { viewTransition: true })
    //             localStorage.removeItem('token');
    //             setIsLoggedIn(false);
    //             return

    //         }
    //         addToast(
    //             {
    //                 title: "Feed loading failed",
    //                 description: data.error,
    //                 color: 'danger',
    //             }
    //         )


    //         setError('something went wrong')
    //     }

    //     setIsLoadingPost(false);
    //     setPosts(data.posts);
    //     return data;

    // }

    // useEffect(() => {
    //     getAllPosts()
    // }, [])


    // const { data: { posts = [] } = {}, isLoading, isError, error } = useQuery({
    //     queryKey: ['posts'],
    //     queryFn: postApi.getAll,
    //     select: (data) => data.data,
    //     staleTime: 5 * 1000,
    // })








    const { data: { pages = [] } = {}, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isFetching } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: (data) => { return postApi.getAll(data.pageParam); },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            // console.log(lastPage.data.paginationInfo.nextPage)
            if (lastPage.data.paginationInfo.nextPage) {
                return lastPage.data.paginationInfo.nextPage;
            }
            return undefined;
        },
        staleTime: 1000 * 30 * 1

    })


    useEffect(() => {
        if (isError) {

            if (error.message.includes("401")) {
                addToast(
                    {
                        title: "Feed loading failed",
                        description: 'Login again',
                        color: 'danger',
                    })
                queryClient.removeQueries(['posts']);
                navigate('/login', { viewTransition: true })
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                return

            }
            addToast(
                {
                    title: "Feed loading failed",
                    description: error.message,
                    color: 'danger',
                }
            )
        }
    }, [isError])

    // console.log(pages)





    // async function handleScroll(e) 
    // {
    //     const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    //     // console.log("🚀 ~ handleScroll ~ scrollHeight:", scrollHeight);
    //     // console.log("🚀 ~ handleScroll ~ clientHeight:", clientHeight);
    //     // console.log("🚀 ~ handleScroll ~ scrollTop:", scrollTop);
    //     // console.log(clientHeight+scrollTop);
    //     console.log('+++++++++++++++++++++++++++++++++++++++++++++')

    //     if(scrollHeight-100 <= clientHeight+scrollTop)
    //     {
    //         // console.log('scrollHeight-100 <= clientHeight+scrollTop');
    //         // console.log('=======================================')
    //         console.log("🚀 ~ handleScroll ~ isFetchingNextPage: before", isFetchingNextPage)
    //         if(!isFetchingNextPage)
    //         {
    //             setIsFetchingNextPage(true)
    //             await fetchNextPage()
    //             // setIsFetchingNextPage(false)
    //         }
    //         console.log("🚀 ~ handleScroll ~ isFetchingNextPage: after", isFetchingNextPage)


    //     }

    // }

    // handleScroll()


    // useEffect(() => {
    //     document.addEventListener('scroll', handleScroll)

    //     return () => {
    //         document.removeEventListener('scroll', handleScroll)
    //     }
    // }, [])



    return (
        <>
            <div
                className="w-full max-w-2xl backdrop-blur-md rounded-xl sm:p-6 space-y-7 relative">

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
                            pages.map((page, index) => (
                                <div key={index} className="space-y-7">
                                    {
                                        page.data.posts.map((post) => (
                                            <PostComponent getData={post} key={post._id} post={post} onOpen={onOpen} setViewImgSrc={setViewImgSrc} numOfComments={1} />
                                        ))
                                    }
                                </div>
                            ))


                }

                {!isError &&
                    <div className="w-full">
                        <Button className="w-full" isLoading={isFetchingNextPage} isDisabled={!hasNextPage} onPress={fetchNextPage}>load more...</Button>
                    </div>}



                <Modal backdrop="blur" isOpen={isOpen} size="xl" placement="center" scrollBehavior="outside" onOpenChange={onOpenChange}>
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