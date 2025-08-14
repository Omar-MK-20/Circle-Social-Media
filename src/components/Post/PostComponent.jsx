import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@heroui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';
import CommentComponent from '../CommentComponent';
import AddCommentComponent from './AddCommentComponent';


function PostComponent({ post, onOpen, setViewImgSrc, numOfComments, getData }) {
    dayjs.extend(relativeTime);
    const navigate = useNavigate()


    function handleViewImage(e, imgSrc) {
        if (e.target.localName == 'img') {
            setViewImgSrc(imgSrc);
            onOpen();
            e.stopPropagation();
        }
    }

    function handlePostDetails(id) {
        if (!window.location.pathname.includes('post-details')) {
            navigate(`/post-details/${id}`, { viewTransition: true });
        }

    }


    return (
        <>

            <Card onPress={() => handlePostDetails(post._id)} key={post._id} as={'div'} isPressable isBlurred className="w-full mb-0 cursor-auto">
                <CardHeader>
                    <div onClick={(e) => e.stopPropagation()} className="flex gap-5 cursor-pointer">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={post.user.photo}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-medium font-semibold leading-none text-default-600">{post.user.name}</h4>
                            <h5 className="text-small tracking-tight text-default-400">{dayjs(post.createdAt).format('DD/MM/YYYY')}</h5>
                        </div>
                    </div>
                </CardHeader>
                <div onClick={(e) => e.stopPropagation()}>
                    <Divider className="my-2" />
                    <CardBody className="px-3 py-0 text-medium text-default-700 overflow-visible">
                        <p>{post.body}</p>
                    </CardBody>
                    {post.image &&
                        <CardBody className="overflow-visible py-2 block relative">
                            <img onClick={(e) => { handleViewImage(e, post.image) }}
                                className="rounded-xl mx-auto w-full h-70 sm:h-100 object-cover cursor-pointer"
                                src={post.image}
                                alt="Card background" 
                            />
                        </CardBody>}
                    <Divider className="my-2" />
                </div>
                <CardFooter className="flex gap-3 justify-between px-6 py-0">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">4</p>
                        <p className=" text-default-400 text-small">Likes</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">{post.comments.length}</p>
                        <p className="text-default-400 text-small">Comments</p>
                    </div>
                </CardFooter>
                <AddCommentComponent getData={getData} postId={post._id}/>
            </Card>
            <Card isBlurred className='mt-1'>
                {post.comments &&
                    <CommentComponent comments={post.comments} numOfComments={numOfComments} />
                }
            </Card>

        </>
    )
}

export default PostComponent