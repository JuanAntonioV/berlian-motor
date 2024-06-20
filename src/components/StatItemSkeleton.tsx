import { Skeleton } from './ui/skeleton';

export default function StatItemSkeleton() {
  return (
    <div className='p-4 bg-white border rounded-lg shadow'>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='w-20 h-4' />
          <Skeleton className='w-32 h-6' />

          <Skeleton className='w-20 h-4' />
        </div>
        <Skeleton className='w-12 h-12' />
      </div>
    </div>
  );
}
