import { Meal } from '@/store/useMeals';
import { useMemo } from 'react';
import { Avatar } from '@radix-ui/themes';

const MealDetail = ({ mealName, mealDate }: Meal) => {
  const { parsedDate, weekday } = useMemo(() => {
    const currDate = new Date(mealDate);
    return {
      weekday: currDate.toLocaleDateString('de-DE', { weekday: 'short' }),
      parsedDate: currDate.toLocaleDateString(),
    };
  }, [mealDate]);

  return (
    <div className={'flex flex-row gap-x-6 rounded-md border bg-gray-800 p-4'}>
      <Avatar
        fallback={weekday}
        variant="solid"
        color="orange"
      />
      <div>
        <span className={'mb-2 block font-bold'}>{parsedDate}</span>
        <span>{mealName}</span>
      </div>
    </div>
  );
};

export default MealDetail;
