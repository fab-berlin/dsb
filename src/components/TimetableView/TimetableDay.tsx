import { TimetableHour } from '@/types/types';

const TimetableDay = ({ data }: { data: TimetableHour[] }) => {
  return (
    <ul className={'flex flex-col gap-y-2'}>
      {data.map((hour, index) => (
        <li
          key={index}
          className={'flex flex-row flex-nowrap justify-between border border-white p-4'}
        >
          <div className={'flex flex-row flex-nowrap gap-x-4'}>
            <p className={'flex-shrink flex-grow-0'}>{index + 1}.</p>
            <div>
              <p className={'text-md mb-2 font-bold md:text-xl'}>{hour.name}</p>
              <p
                className={
                  'flex size-6 content-center items-center justify-center rounded-full bg-white text-black md:size-8'
                }
              >
                {hour.startType}
              </p>
            </div>
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
