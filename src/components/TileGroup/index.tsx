import { useClassReplacementStore } from '@/app/store/useClassReplacement';
import { useState } from 'react';
import { Select } from '@radix-ui/themes';
import ReplacementTile from '@/components/ReplacementTile';

const Index = () => {
  const { replacements } = useClassReplacementStore();

  const [chosenDate, setChosenDate] = useState('');
  const [chosenClass, setChosenClass] = useState('07.1');

  const handleSelect = (e: string) => {
    setChosenDate(e);
  };

  return (
    <>
      <Select.Root onValueChange={handleSelect}>
        <Select.Trigger>Tage</Select.Trigger>
        <Select.Content
          position="popper"
          sideOffset={5}
        >
          {Object.keys(replacements).map((day) => (
            <Select.Item
              key={day}
              value={replacements[day].replacementDate.dateString}
            >
              {replacements[day].replacementDate.dateString}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      {chosenDate !== '' && (
        <div className={'grid grid-cols-2 gap-4'}>
          {replacements[chosenDate].classData
            .filter((el) => el?.name === chosenClass)
            .map((el, i) => (
              <ReplacementTile
                el={el}
                key={i}
              />
            ))}
          {replacements[chosenDate].classData.filter((el) => el?.name === chosenClass).length ===
            0 && <h3>keine Änderungen am Stundenplan</h3>}
        </div>
      )}
    </>
  );
};

export default Index;
