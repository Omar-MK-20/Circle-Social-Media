import { addToast, Button, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../App";
import LoadingPostComponent from "../components/LoadingPostComponent";
import AddPostComponent from "../components/Post/AddPostComponent";
import PostComponent from "../components/Post/PostComponent";
import UpdatePostComponent from "../components/Post/UpdatePostComponent";
import { AuthContext } from "../contexts/AuthContextProvider";
import { postApi } from "../services/postService";


function FeedPage() {

    dayjs.extend(relativeTime);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const pageParamRef = useRef(1)

    // useDisclosure and state for update post
    const updataPostDisclosure = useDisclosure();
    const [postDetailsForEdit, setPostDetailsForEdit] = useState({})




    // useDisclosure and state for view image
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [viewImgSrc, setViewImgSrc] = useState(null);
    const scrollingElement = useRef({});




    const { data: { pages = [] } = {}, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isFetching } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: (data) => { return postApi.getAll(data.pageParam, ((10 + (pageParamRef.current * 2)) < 50 ? (10 + (pageParamRef.current * 2)) : 50))},
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.paginationInfo.nextPage) {
                return lastPage.data.paginationInfo.nextPage;
            }
            return undefined;
        },
        staleTime: 1000 * 60 * 5,
    })


    async function handleFetchNextPage() {
        const { clientHeight, scrollHeight } = scrollingElement.current;
        const currentScroll = scrollHeight - clientHeight - 225;
        // window.scrollTo(
        //     {
        //         top: currentScroll,
        //         behavior: 'smooth'
        //     }
        // );
        await fetchNextPage();

    }
    // function gettingUserUp(e) {
    //     const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    //     scrollingElement.current = { clientHeight, scrollTop, scrollHeight }
    // }


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



    async function handleScroll(e) {
        const { scrollTop, scrollHeight } = e.target.scrollingElement;

        if (scrollTop >= ((3 + pageParamRef.current) / (6 + pageParamRef.current)) * scrollHeight) {
            if (!isFetchingNextPage && hasNextPage) {
                await handleFetchNextPage()
                pageParamRef.current++
            }
        }
    }



    useEffect(() => {
        document.addEventListener('scroll', handleScroll)

        return () => document.removeEventListener('scroll', handleScroll)

    }, [isFetchingNextPage, hasNextPage])



    // useEffect(() => {
    //     document.addEventListener('scroll', gettingUserUp)

    //     return () => {
    //         document.removeEventListener('scroll', gettingUserUp)
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
                                            <PostComponent key={post._id} post={post} onOpen={onOpen} setViewImgSrc={setViewImgSrc} numOfComments={1} setPostDetails={setPostDetailsForEdit} updataPostDisclosure={updataPostDisclosure} />
                                        ))
                                    }
                                </div>
                            ))
                }


                {!isError &&
                    <div className="w-full">
                        <Button className="w-full" isLoading={isFetchingNextPage} isDisabled={!hasNextPage} onPress={handleFetchNextPage}>{ hasNextPage ? "load more..." : "No more to load."}</Button>
                    </div>}






                <UpdatePostComponent postIsOpen={updataPostDisclosure.isOpen} postOnOpenChange={updataPostDisclosure.onOpenChange} postDetails={postDetailsForEdit} queryKey={'posts'} />


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