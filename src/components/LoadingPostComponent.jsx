import { Card, CardBody, CardFooter, CardHeader, Divider, Skeleton } from '@heroui/react'
import React from 'react'

function LoadingPostComponent() {
    return (


        <Card isBlurred isPressable className="w-full space-y-4 p-4" radius="lg">
            <CardHeader>
                <div className="flex gap-5 items-center">
                    <Skeleton className="rounded-full">
                        <div className="w-12 h-12 rounded-full bg-default-300" />
                    </Skeleton>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-32 rounded-lg">
                            <div className="h-3 w-32 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-20 rounded-lg">
                            <div className="h-3 w-20 rounded-lg bg-default-300" />
                        </Skeleton>
                    </div>
                </div>
            </CardHeader>

            <Divider className="my-2" />

            <CardBody className="px-3 py-0 space-y-2">
                <Skeleton className="w-5/6 rounded-lg">
                    <div className="h-3 w-5/6 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-4/6 rounded-lg">
                    <div className="h-3 w-4/6 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-3/6 rounded-lg">
                    <div className="h-3 w-3/6 rounded-lg bg-default-200" />
                </Skeleton>
            </CardBody>

            <CardBody>
                <Skeleton className="rounded-xl">
                    <div className="w-full h-72 rounded-xl bg-default-300" />
                </Skeleton>
            </CardBody>

            <Divider className="my-2" />

            <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                    <Skeleton className="w-8 rounded-lg">
                        <div className="h-3 w-8 rounded-lg bg-default-300" />
                    </Skeleton>
                    <Skeleton className="w-10 rounded-lg">
                        <div className="h-3 w-10 rounded-lg bg-default-300" />
                    </Skeleton>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="w-8 rounded-lg">
                        <div className="h-3 w-8 rounded-lg bg-default-300" />
                    </Skeleton>
                    <Skeleton className="w-16 rounded-lg">
                        <div className="h-3 w-16 rounded-lg bg-default-300" />
                    </Skeleton>
                </div>
            </CardFooter>
        </Card>



    )
}

export default LoadingPostComponent 