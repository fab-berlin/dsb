import { create } from 'zustand';

export interface Meal {
  mealName: string;
  mealDate: string;
}
interface MealsStore {
  meals: Meal[];
  parseMeals: (mealData: string) => void;
}

export const useMeals = create<MealsStore>((set, get) => ({
  meals: [],
  parseMeals: (mealData: string) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(mealData, 'text/html');
    const parsedMeals: Meal[] = [];
    const orderedMeals = htmlDoc.querySelectorAll('.menuplan-checkbox[data-order-status="2"]');
    [...orderedMeals].forEach((meal) => {
      const mealData = (
        meal
          ?.closest('.nodeFooter')
          ?.parentElement?.querySelector('.nodeTextArea>div')
          ?.getAttribute('onClick') as string
      )
        .replace('IbsUtils.showDialog(', '')
        .replace(');', '');
      const dateRegex = /'(\d{4}-\d{2}-\d{2})'/;
      const match = mealData.match(dateRegex);

      const mealDate = match ? match[1] : '---';
      const mealName =
        meal
          ?.closest('.nodeFooter')
          ?.parentElement?.querySelector('.nodeTextArea>div')
          ?.getAttribute('title') ?? '---';

      console.log(mealDate, mealName);
      parsedMeals.push({ mealName: mealName, mealDate: mealDate });
    });
    set({ meals: parsedMeals });
  },
}));
