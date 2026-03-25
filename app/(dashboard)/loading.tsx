import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
      <Skeleton className="h-12 w-full max-w-md rounded-md" />
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 h-[400px] flex items-center justify-center">
        <Skeleton className="h-full w-full opacity-50" />
      </div>
    </div>
  )
}
