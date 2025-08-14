import { Button, Card, CardHeader, Form, Input, Textarea } from "@heroui/react"
import { useState } from "react";
import avatar from '../../assets/avatar.png'

function AddPostComponent() {

    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [imgSrc, setImgSrc] = useState(avatar)

    function handleCreatingPost()
    {
        if(isCreatingPost == true)
        {
            setIsCreatingPost(false);
            setImgSrc(avatar);
        }
        else
        {
            setIsCreatingPost(true);
        }
    }

    return (
        <>
            <Card isBlurred className="-mt-5">
                <CardHeader>
                    {isCreatingPost ?
                        <Form className="w-full">
                            <div className="w-full">
                                <Textarea placeholder="What's on your mind? Add a Post..." autoFocus={true} />
                            </div>
                            {imgSrc &&
                                <div className="w-full relative">
                                    <img src={imgSrc} alt="" className="w-full h-80 object-cover" />
                                    <button onClick={() => setImgSrc(null)} type="button" className="bg-default-300 absolute top-0 end-0 w-6 h-6 m-1 rounded-full cursor-pointer" ><i className="fa-solid fa-xmark"></i></button>
                                </div>}
                            <div className="flex justify-between w-full gap-2">
                                <Input className="w-fit" type="file"/>
                                <div className="flex justify-between gap-1">
                                    <Button onPress={handleCreatingPost} color="warning" variant="flat">Cancel</Button>
                                    <Button color="primary">Post</Button>
                                </div>
                            </div>
                        </Form>
                        :
                        <Button onPress={handleCreatingPost} className="w-full justify-start">
                            What's on your mind? Add a Post...
                        </Button>
                    }
                </CardHeader>
            </Card>
        </>
    )
}

export default AddPostComponent