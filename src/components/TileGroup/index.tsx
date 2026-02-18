import { useClassReplacementStore } from '@/store/useClassReplacement';
import { useEffect, useState } from 'react';
import { Select } from '@radix-ui/themes';
import ReplacementTile from '@/components/ReplacementTile';
import NoResultTile from '@/components/NoResultTile';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const TileGroup = () => {
  const { replacements } = useClassReplacementStore();
  const [manualTrigger, setManualTrigger] = useState(false);
  const [chosenDate, setChosenDate] = useState('');
  const [chosenClass, setChosenClass] = useState('');
  const [isDateAvailable, setIsDateAvailable] = useState(false);

  const [availableClasses, setAvailableClasses] = useState<string[]>([]);

  const currentDate = new Date();
  const currentDateString = currentDate.toLocaleDateString('de-DE', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSelect = (e: string) => {
    setManualTrigger(true);
    setChosenDate(e);
    setChosenClass('---');
  };
  const handleClassSelect = (e: string) => {
    setChosenClass(e);
  };
  const handleDateSelectNative = (e: React.FormEvent<HTMLSelectElement>) => {
    setManualTrigger(true);
    setChosenDate(e.currentTarget.value);
    setChosenClass('---');
  };

  const handleClassSelectNative = (e: React.FormEvent<HTMLSelectElement>) => {
    setChosenClass(e.currentTarget.value);
  };

  useEffect(() => {
    const uniqueClassesSet = new Set(
      replacements[chosenDate]?.classData
        ?.map((el) => el?.name)
        .filter((name): name is string => name !== undefined)
    );
    const uniqueClasses = Array.from(uniqueClassesSet);
    setAvailableClasses(uniqueClasses);
  }, [chosenDate, replacements]);

  useEffect(() => {
    setIsDateAvailable(currentDateString in replacements);
    if (currentDateString in replacements) setChosenDate(currentDateString);
  }, [currentDateString, replacements]);

  return (
    <>
      {Object.keys(replacements).length > 0 && (
        <div className={'flex flex-row flex-wrap justify-between md:justify-start md:gap-x-4'}>
          <div className={'relative block md:hidden'}>
            <select
              className={
                'w-full appearance-none rounded-md border border-gray-600 py-2 ps-4 pe-8 text-lg focus-visible:outline-none'
              }
              onChange={handleDateSelectNative}
            >
              {Object.keys(replacements).map((day) => (
                <option
                  key={day}
                  value={replacements[day].replacementDate.dateString}
                >
                  {replacements[day].replacementDate.dateString}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2" />
          </div>

          <div className={'hidden md:block'}>
            <Select.Root
              onValueChange={handleSelect}
              size="3"
              {...(isDateAvailable && !manualTrigger && { value: currentDateString })}
              {...(isDateAvailable && manualTrigger && { value: chosenDate })}
            >
              <Select.Trigger
                placeholder="wähle den Tag"
                className="select-trigger-large"
              >
                {chosenDate}
              </Select.Trigger>
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
          </div>

          {chosenDate && (
            <>
              <div className={'relative block max-w-1/2 md:hidden'}>
                <select
                  className={
                    'w-full appearance-none rounded-md border border-gray-600 px-4 py-2 text-lg focus-visible:outline-none'
                  }
                  onChange={handleClassSelectNative}
                >
                  <option value="---">wähle die Klasse</option>
                  {availableClasses.map((name) => (
                    <option
                      key={name}
                      value={name}
                    >
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2" />
              </div>
              <div className={'hidden max-w-1/2 md:block'}>
                <Select.Root
                  onValueChange={handleClassSelect}
                  size="3"
                >
                  <Select.Trigger
                    placeholder="wähle die Klasse"
                    className="select-trigger-large"
                  >
                    {chosenClass}
                  </Select.Trigger>
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
            </>
          )}
        </div>
      )}

      {chosenDate !== '' && (
        <div
          className={
            'my-4 grid h-[calc(100vh-184px-60px)] grid-cols-1 gap-4 overflow-auto sm:grid-cols-2 md:grid-cols-4'
          }
        >
          {replacements[chosenDate].classData
            .filter((el) => {
              if (chosenClass === '---' || !chosenClass.trim()) return true;
              return el?.name === chosenClass;
            })
            .map((el, i) => (
              <ReplacementTile
                el={el}
                key={i}
              />
            ))}
          {replacements[chosenDate].classData.filter((el) => {
            if (chosenClass === '---' || !chosenClass.trim()) return true;
            return el?.name === chosenClass;
          }).length === 0 && <NoResultTile />}
        </div>
      )}
    </>
  );
};

export default TileGroup;
