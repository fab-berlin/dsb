import { ReplacementClassData } from '@/app/page';

const ReplacementTile = ({ el }: { el: ReplacementClassData | null }) => {
  return (
    <div className={'bg-blue-100 p-4'}>
      <p className={'text-xl'}>{el?.name}</p>
      <p className={'inline-block size-8 rounded-full bg-white text-center text-xl text-blue-500'}>
        {el?.hour}
      </p>
      {el?.hour} {el?.newLesson} {el?.newRoom} {el?.oldLesson} {el?.oldRoom}
      <hr />
      {el?.message}
    </div>
  );
};

export default ReplacementTile;
