import { Card, Skeleton } from '@heroui/react'

function LoadingSettingsComponent() {
  return (
    <Card className="w-full space-y-6 p-6 rounded-xl shadow-lg bg-white/60 dark:bg-gray-900/60 border border-white/20">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Photo Skeleton */}
        <Skeleton className="rounded-full w-32 h-32">
          <div className="w-32 h-32 rounded-full bg-default-300" />
        </Skeleton>
        {/* Info Skeletons */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg sm:col-span-2">
            <div className="h-4 w-full rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>
    </Card>
  )
}

export default LoadingSettingsComponent