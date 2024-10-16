import { ReplacementClassData } from '@/app/page';
import { Avatar } from '@radix-ui/themes';

const ReplacementTile = ({ el }: { el: ReplacementClassData | null }) => {
  return (
    <div className={'rounded-md border bg-gray-800 p-4'}>
      <div className="mb-4 flex flex-row flex-nowrap justify-between gap-x-4">
        {(el?.name.trim() ?? '').length <= 6 && (
          <Avatar
            fallback={el?.name ?? ''}
            variant="solid"
            color="orange"
          />
        )}
        {(el?.name.trim() ?? '').length > 6 && (
          <p className={'text-bold w-full rounded bg-orange-500 p-4'}>{el?.name ?? ''}</p>
        )}
        {el?.hour.trim() && (
          <div
            className={'flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2'}
          >
            <span className="text-center text-xl text-orange-500">{el?.hour}</span>
          </div>
        )}
      </div>
      {el?.cancellation.trim() && (
        <p className={'mb-4 rounded-md bg-orange-500 p-4 font-bold'}>AUSFALL!</p>
      )}
      {el?.newLesson.trim() && el?.newRoom.trim() && (
        <dl className={'mb-4 flex flex-row flex-wrap items-baseline'}>
          <dt className={'w-1/3 text-xs'}>Fach neu</dt>
          <dd className={'w-2/3 font-bold'}>{el?.newLesson}</dd>
          <dt className={'w-1/3 text-xs'}>Raum neu</dt>
          <dd className={'w-2/3 font-bold'}>{el?.newRoom}</dd>
        </dl>
      )}
      {el?.oldLesson.trim() && el?.oldRoom.trim() && (
        <dl className={'mb-4 flex flex-row flex-wrap items-baseline opacity-35'}>
          <dt className={'w-1/3 text-xs'}>Fach alt</dt>
          <dd className={'w-2/3 font-bold'}>{el?.oldLesson}</dd>
          <dt className={'w-1/3 text-xs'}>Raum alt</dt>
          <dd className={'w-2/3 font-bold'}>{el?.oldRoom}</dd>
        </dl>
      )}
      {el?.message.trim() && (
        <div className={'rounded-md border border-orange-500 p-4'}>{el?.message}</div>
      )}
    </div>
  );
};

export default ReplacementTile;
