import { Avatar, Button, CardBody, CardFooter, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import avatar from '../assets/avatar.png';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';

function CommentComponent({ comments, numOfComments, postUser }) {
    dayjs.extend(relativeTime);
    const { userData } = useContext(AuthContext);

    return (
        <>
            {comments.slice(0, numOfComments).map((comment) => (
                <CardFooter key={comment._id} className="px-8 flex flex-col items-start gap-3 mx-auto h-fit sm:my-1">
                    {userData?._id == postUser._id &&
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color='light' className='absolute top-0 end-0 m-4 p-2'>
                                    <i className="fa-solid fa-ellipsis text-2xl"></i>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions" variant="shadow">
                                <DropdownItem key="edit">Edit</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>}
                    <div className="flex gap-5 cursor-pointer w-fit">
                        <Avatar
                            isBordered
                            radius="full"
                            size="sm"
                            src={avatar}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{comment.commentCreator.name}</h4>
                            <h5 className="text-small tracking-tight text-default-400">{dayjs(comment.createdAt).fromNow()}</h5>
                        </div>
                    </div>
                    <CardBody className="px-3 py-0 text-medium text-default-700 overflow-visible">
                        <p className="text-sm">{comment.content}</p>
                    </CardBody>
                    <Divider />
                </CardFooter>
            ))
            }
        </>
    )
}

export default CommentComponent