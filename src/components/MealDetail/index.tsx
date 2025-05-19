import { Meal } from '@/app/store/useMeals';
import { useEffect, useState } from 'react';

const MealDetail = ({ mealName, mealDate }: Meal) => {
  const [parsedDate, setParsedDate] = useState('');
  useEffect(() => {
    const currDate = new Date(mealDate);
    setParsedDate(currDate.toLocaleDateString());
  }, [mealDate]);

  return (
    <div className={'rounded-md border bg-gray-800 p-4'}>
      <span className={'mb-4 block font-bold'}>{parsedDate}</span>
      <span>{mealName}</span>
    </div>
  );
};

export default MealDetail;
