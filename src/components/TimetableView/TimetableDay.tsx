import { TimetableHour } from '@/types/types';

const TimetableDay = ({ data }: { data: TimetableHour[] }) => {
  return (
    <ul className={'flex flex-col gap-y-2'}>
      {data.map((hour, index) => (
        <li
          key={index}
          className={'flex flex-row flex-nowrap justify-between border border-white p-4'}
        >
          <div>
            <p className={'text-xl font-bold'}>{hour.name}</p>
            <p
              className={
                'flex size-8 content-center items-center justify-center rounded-full bg-white text-black'
              }
            >
              {hour.startType}
            </p>
          </div>
          <p className={'flex min-w-16 flex-col border-l border-dotted border-white pl-4'}>
            <span>{hour.startTime}</span>
            <span>{hour.endTime}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TimetableDay;
