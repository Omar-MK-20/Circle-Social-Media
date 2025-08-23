import { Card, Skeleton } from '@heroui/react'

function LoadingChPassComponent() {
    return (
        <Card className="w-full space-y-5 p-6 mt-10 rounded-xl shadow-lg bg-white/60 dark:bg-gray-900/60 border border-white/20">
            <Skeleton className="w-1/2 rounded-lg mb-4">
                <div className="h-5 w-1/2 rounded-lg bg-default-200" />
            </Skeleton>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="w-full rounded-lg sm:col-span-2">
                    <div className="h-4 w-full rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-4 w-full rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-4 w-full rounded-lg bg-default-200" />
                </Skeleton>
            </div>
            <div className="flex justify-end mt-2">
                <Skeleton className="w-32 h-10 rounded-lg">
                    <div className="h-10 w-32 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
        </Card>
    )
}

export default LoadingChPassComponent