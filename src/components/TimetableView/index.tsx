import { TimetableDayItem } from '@/types/types';
import TimetableDay from '@/components/TimetableView/TimetableDay';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const TimetableView = ({ timetable }: { timetable: TimetableDayItem[] }) => {
  const breakpoints = {
    786: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 5,
    },
  };

  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={1}
      loop={true}
      breakpoints={breakpoints}
    >
      {timetable.map((el) => (
        <SwiperSlide key={el.day}>
          <p>{el.day}</p>

          <TimetableDay data={el.hours} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TimetableView;
