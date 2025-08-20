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
import { AuthContext } from "../contexts/AuthContextProvider";
import { postApi } from "../services/postService";
import UpdatePostComponent from "../components/Post/UpdatePostComponent";


function FeedPage() {

    dayjs.extend(relativeTime);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);

    // useDisclosure and state for update post
    const updataPostDisclosure = useDisclosure();
    const [ postDetailsForEdit, setPostDetailsForEdit ] = useState({})




    // useDisclosure and state for view image
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [viewImgSrc, setViewImgSrc] = useState(null);
    const scrollingElement = useRef({});
    



    const { data: { pages = [] } = {}, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isFetching } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: (data) => { return postApi.getAll(data.pageParam); },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.paginationInfo.nextPage) {
                return lastPage.data.paginationInfo.nextPage;
            }
            return undefined;
        },
        staleTime: 1000 * 10 * 1,
    })


    async function handleFetchNextPage() {
        const { clientHeight, scrollHeight } = scrollingElement.current;
        const currentScroll = scrollHeight - clientHeight - 225;
        await fetchNextPage();
        window.scrollTo(
            {
                top: currentScroll,
                behavior: 'smooth'
            }
        );
    }

    function handleScrolling(e) {
        const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
        scrollingElement.current = { clientHeight, scrollTop, scrollHeight }
    }


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



    // async function handleScroll(e) 
    // {
    //     const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    //     // console.log("🚀 ~ handleScroll ~ scrollHeight:", scrollHeight);
    //     // console.log("🚀 ~ handleScroll ~ clientHeight:", clientHeight);
    //     // console.log("🚀 ~ handleScroll ~ scrollTop:", scrollTop);
    //     // console.log(clientHeight+scrollTop);
    //     console.log('+++++++++++++++++++++++++++++++++++++++++++++')

    //     if(scrollHeight-100 <= clientHeight+scrollTop && !isFetchingNextPage)
    //     {
    //         // console.log('scrollHeight-100 <= clientHeight+scrollTop');
    //         // console.log('=======================================')
    //         // console.log("🚀 ~ handleScroll ~ isFetchingNextPage: before", isFetchingNextPage)
    //         // console.log(isFetching);
    //         // console.log(hasNextPage);

    //         console.log("🚀 ~ handleScroll ~ isFetching:", isFetching)
    //         if(!isFetching)
    //         {
    //             // setIsFetchingNextPage(true)
                
    //             await handleFetchNextPage()
    //             // setIsFetchingNextPage(false)
    //         }
    //         // console.log("🚀 ~ handleScroll ~ isFetchingNextPage: after", isFetchingNextPage)


    //     }

    // }

    // handleScroll()






    useEffect(() => {
        // document.addEventListener('scroll', handleScroll)
        document.addEventListener('scroll', handleScrolling)

        return () => {
            // document.removeEventListener('scroll', handleScroll)
            document.removeEventListener('scroll', handleScrolling)
        }
    }, [])



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
                                            <PostComponent getData={refetch} key={post._id} post={post} onOpen={onOpen} setViewImgSrc={setViewImgSrc} numOfComments={1} setPostDetails={setPostDetailsForEdit} updataPostDisclosure={updataPostDisclosure} />
                                        ))
                                    }
                                </div>
                            ))
                }


                {!isError &&
                    <div className="w-full">
                        <Button className="w-full" isLoading={isFetchingNextPage} isDisabled={!hasNextPage} onPress={handleFetchNextPage}>load more...</Button>
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