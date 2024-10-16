import { useClassReplacementStore } from '@/app/store/useClassReplacement';
import { useEffect, useState } from 'react';
import { Select } from '@radix-ui/themes';
import ReplacementTile from '@/components/ReplacementTile';

const TileGroup = () => {
  const { replacements } = useClassReplacementStore();

  const [chosenDate, setChosenDate] = useState('');
  const [chosenClass, setChosenClass] = useState('');

  const [availableClasses, setAvailableClasses] = useState<string[]>([]);

  const handleSelect = (e: string) => {
    setChosenDate(e);
  };
  const handleClassSelect = (e: string) => {
    setChosenClass(e);
  };

  useEffect(() => {
    const uniqueClassesSet = new Set(
      replacements[chosenDate]?.classData
        ?.map((el) => el?.name)
        .filter((name): name is string => name !== undefined)
    );
    const uniqueClasses = Array.from(uniqueClassesSet);
    setAvailableClasses(uniqueClasses);
  }, [chosenDate]);

  return (
    <>
      <div className={'flex flex-row flex-wrap justify-between'}>
        <Select.Root
          onValueChange={handleSelect}
          size="3"
        >
          <Select.Trigger placeholder="wähle den Tag">{chosenDate}</Select.Trigger>
          <Select.Content
            position="popper"
            sideOffset={5}
          >
            <Select.Group>
              {Object.keys(replacements).map((day) => (
                <Select.Item
                  key={day}
                  value={replacements[day].replacementDate.dateString}
                >
                  {replacements[day].replacementDate.dateString}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <div className={'max-w-1/2'}>
          <Select.Root
            onValueChange={handleClassSelect}
            size="3"
          >
            <Select.Trigger placeholder="wähle die Klasse">{chosenClass}</Select.Trigger>
            <Select.Content
              position="popper"
              sideOffset={5}
            >
              <Select.Group>
                <Select.Item value="---">---</Select.Item>
                {availableClasses.map((name) => (
                  <Select.Item
                    key={name}
                    value={name}
                  >
                    {name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {chosenDate !== '' && (
        <div className={'mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2'}>
          {replacements[chosenDate].classData
            .filter((el) => {
              if (chosenClass === '---') return true;
              return el?.name === chosenClass;
            })
            .map((el, i) => (
              <ReplacementTile
                el={el}
                key={i}
              />
            ))}
          {replacements[chosenDate].classData.filter((el) => {
            if (chosenClass === '---') return true;
            return el?.name === chosenClass;
          }).length === 0 && <h3 className={'col-span-full'}>keine Änderungen am Stundenplan</h3>}
        </div>
      )}
    </>
  );
};

export default TileGroup;
