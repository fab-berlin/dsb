import { ReplacementClassData } from '@/app/page';
import { Avatar } from '@radix-ui/themes';

const ReplacementTile = ({ el }: { el: ReplacementClassData | null }) => {
  return (
    <div className={'rounded-md border p-4'}>
      <div className="mb-4 flex flex-row flex-nowrap justify-between">
        <Avatar
          fallback={el?.name ?? ''}
          variant="solid"
          color="orange"
        />
        <div className={'flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2'}>
          <span className="text-center text-xl text-orange-500">{el?.hour}</span>
        </div>
      </div>
      {el?.newLesson} {el?.newRoom} {el?.oldLesson} {el?.oldRoom}
      <hr />
      {el?.message}
    </div>
  );
};

export default ReplacementTile;
