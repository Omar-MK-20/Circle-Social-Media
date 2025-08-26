import { addToast, Button, Form, Input, Modal, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { postApi } from "../../services/postService";


function UpdatePostComponent({ postDetails, postIsOpen, postOnOpenChange, queryKey }) {

    const queryClient = useQueryClient();
    const [caption, setCaption] = useState('');
    const [imgSrc, setImgSrc] = useState();
    const [postImage, setPostImage] = useState(undefined);
    const [formData, setFormData] = useState(null);
    const postImgElement = useRef('');

    useEffect(
        () => {
            setCaption(postDetails.body)
            setImgSrc(postDetails.image)
        }
        ,
        [postDetails]
    )



    function handleViewPostImg(e) {
        if (e.target.files[0]) {
            setPostImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setImgSrc(url);
        }
    }

    function handleUpdatePost() {
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
        setFormData(formData);
        mutate();
    }

    const { mutate, isPending, error} = useMutation(
        {
            mutationFn: () => postApi.updateOne(postDetails.id, formData),
            onSuccess: async () => {
                await queryClient.invalidateQueries([queryKey])
                addToast(
                    {
                        title: 'Post updated successfully',
                        color: 'success'
                    }
                )
            },
            onError: (error) => {
                addToast(
                    {
                        title: 'Failed to update Post',
                        description: error.message,
                        color: 'danger'
                    }
                )
            }
        }
    )



    return (
        <>
            <Modal isDismissable={false} isKeyboardDismissDisabled={true} scrollBehavior={"outside"} isOpen={postIsOpen} placement="top-center" onOpenChange={postOnOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <Form className="w-full p-5">
                                <p>{error && error.message}</p>
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
                                </div>
                            </Form>
                            <ModalFooter>
                                <Button color="warning" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" isLoading={isPending} onPress={() => { handleUpdatePost(); }}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdatePostComponent