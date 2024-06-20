import { getStats } from '@/getters/analyticGetter';
import StatItem from './StatItem';
import { TStatItem } from '@/types';

export default async function StatSection() {
  const data = await getStats();

  if (!data) return null;

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {data?.map((stat, index) => (
        <StatItem key={index} item={stat} />
      ))}
    </div>
  );
}
