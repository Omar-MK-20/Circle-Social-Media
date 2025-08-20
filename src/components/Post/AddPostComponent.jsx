import { addToast, Button, Card, CardHeader, Form, Input, Textarea } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { postApi } from "../../services/postService";

function AddPostComponent({ refetch, isFetching }) {

    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const [caption, setCaption] = useState('');
    const [postImage, setPostImage] = useState(undefined);
    const [formData, setFormData] = useState(null);
    const postImgElement = useRef('');

    const { mutate, isPending, isError, error, isSuccess } = useMutation(
        {
            mutationFn: () => postApi.createOne(formData)
        }
    )

    function handleClosingOpeningForm() {
        if (isCreatingPost == true) {
            clearPostForm();
        }
        else {
            setIsCreatingPost(true);
        }
    }

    function clearPostForm() {
        setIsCreatingPost(false);
        setImgSrc(null);
        setPostImage(undefined);
        setCaption('');
        postImgElement.current.value = '';
    }



    function handleViewPostImg(e) {
        if (e.target.files[0]) {
            setPostImage(e.target.files[0])
            const src = URL.createObjectURL(e.target.files[0])
            setImgSrc(src);
        }
    }


    function handleCreatePost() {

        if ((caption.trim().length <= 2) && !postImage) {
            return
        }

        const formData = new FormData();

        if (!(caption.trim().length <= 2)) {
            formData.append('body', caption);
        }
        if (postImage) {
            formData.append('image', postImage);
        }
        // console.log(formData);
        setFormData(formData);
        mutate();
    }


    

    async function errorHandling()
    {
        if (isError) {
            addToast(
                {
                    title: "Sharing post failed",
                    description: error.message,
                    color: 'danger',
                }
            )
        }

        if (isSuccess) {
            await refetch()
            clearPostForm();
            addToast(
                {
                    title: 'Post shared Successfully',
                    color: 'success'
                }
            )
            
        }
    }

    useEffect(() => {
        errorHandling();
    }, [isError, isSuccess])



    return (
        <>
            <Card isBlurred className="-mt-5">
                <CardHeader>
                    {isCreatingPost ?
                        <Form className="w-full">
                            <div className="w-full">
                                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="What's on your mind? Add a Post..." autoFocus={true} />
                            </div>
                            {imgSrc &&
                                <div className="w-full relative">
                                    <img src={imgSrc} alt="" className="w-full h-80 object-cover rounded-md" />
                                    <button onClick={() => { postImgElement.current.value = ''; setPostImage(undefined); setImgSrc(null) }} type="button" className="bg-default-300 absolute top-0 end-0 w-6 h-6 m-1 rounded-full cursor-pointer" ><i className="fa-solid fa-xmark"></i></button>
                                </div>}
                            <div className="flex justify-between w-full gap-2">
                                <Input
                                    ref={postImgElement}
                                    onChange={handleViewPostImg}
                                    className="w-fit"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                />
                                <div className="flex justify-between gap-1">
                                    <Button onPress={handleClosingOpeningForm} color="warning" variant="flat">Cancel</Button>
                                    <Button isLoading={isPending || isFetching} isDisabled={!postImage && caption.trim().length <= 2} onPress={handleCreatePost} color="primary">Post</Button>
                                </div>
                            </div>
                        </Form>
                        :
                        <Button onPress={handleClosingOpeningForm} className="w-full justify-start">
                            What's on your mind? Add a Post...
                        </Button>
                    }
                </CardHeader>
            </Card>
        </>
    )
}

export default AddPostComponent