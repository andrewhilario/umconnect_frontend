import { Skeleton } from "@/components/ui/skeleton";

export default function ListPostLoading() {
  return (
    <div className="flex gap-2 flex-col">
      <Skeleton className="flex flex-col justify-between gap-4 mt-5 h-96 bg-gray-300 p-5">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-400" />
          <Skeleton className="w-64 h-7 rounded-full bg-gray-400" />
        </div>
        <Skeleton className="w-full h-full rounded-lg bg-gray-400" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
        </div>
      </Skeleton>
      <Skeleton className="flex flex-col justify-between gap-4 mt-5 h-96 bg-gray-300 p-5">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-400" />
          <Skeleton className="w-64 h-7 rounded-full bg-gray-400" />
        </div>
        <Skeleton className="w-full h-full rounded-lg bg-gray-400" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
        </div>
      </Skeleton>
      <Skeleton className="flex flex-col justify-between gap-4 mt-5 h-96 bg-gray-300 p-5">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-400" />
          <Skeleton className="w-64 h-7 rounded-full bg-gray-400" />
        </div>
        <Skeleton className="w-full h-full rounded-lg bg-gray-400" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
        </div>
      </Skeleton>
      <Skeleton className="flex flex-col justify-between gap-4 mt-5 h-96 bg-gray-300 p-5">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-400" />
          <Skeleton className="w-64 h-7 rounded-full bg-gray-400" />
        </div>
        <Skeleton className="w-full h-full rounded-lg bg-gray-400" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
          <Skeleton className="w-full h-7 rounded-full bg-gray-400" />
        </div>
      </Skeleton>
    </div>
  );
}
