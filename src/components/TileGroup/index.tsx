import { useClassReplacementStore } from '@/store/useClassReplacement';
import { useMemo, useState } from 'react';
import { Select } from '@radix-ui/themes';
import ReplacementTile from '@/components/ReplacementTile';
import NoResultTile from '@/components/NoResultTile';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const parseGermanDate = (value: string) => {
  const [day, month, year] = value.split('.').map(Number);
  return new Date(year, month - 1, day);
};

const NO_CLASS = '---';

const TileGroup = () => {
  const { replacements } = useClassReplacementStore();
  const [chosenDate, setChosenDate] = useState('');
  const [chosenClass, setChosenClass] = useState(NO_CLASS);

  // Alle Tage chronologisch sortiert
  const sortedDates = useMemo(
    () =>
      Object.keys(replacements).sort(
        (a, b) => parseGermanDate(a).getTime() - parseGermanDate(b).getTime()
      ),
    [replacements]
  );

  // Heute, sonst der nächste kommende Tag, sonst der letzte verfügbare
  const defaultDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return sortedDates.find((d) => parseGermanDate(d) >= today) ?? sortedDates.at(-1) ?? '';
  }, [sortedDates]);

  // Manuelle Auswahl gewinnt, solange es den Tag (noch) gibt
  const effectiveDate = chosenDate && replacements[chosenDate] ? chosenDate : defaultDate;

  const changeDate = (value: string) => {
    setChosenDate(value);
    setChosenClass(NO_CLASS);
  };

  const availableClasses = useMemo(() => {
    const names = replacements[effectiveDate]?.classData
      ?.map((el) => el?.name)
      .filter((name): name is string => name !== undefined);
    return Array.from(new Set(names));
  }, [effectiveDate, replacements]);

  const filteredData = useMemo(() => {
    const data = replacements[effectiveDate]?.classData ?? [];
    if (chosenClass === NO_CLASS) return data;
    return data.filter((el) => el?.name === chosenClass);
  }, [effectiveDate, chosenClass, replacements]);

  if (sortedDates.length === 0) return null;

  return (
    <>
      <div className={'flex flex-row flex-wrap justify-between md:justify-start md:gap-x-4'}>
        {/* Datum – mobil */}
        <div className={'relative block md:hidden'}>
          <select
            className={
              'w-full appearance-none rounded-md border border-gray-600 py-2 ps-4 pe-8 text-lg focus-visible:outline-none'
            }
            value={effectiveDate}
            onChange={(e) => changeDate(e.currentTarget.value)}
          >
            {sortedDates.map((day) => (
              <option
                key={day}
                value={day}
              >
                {day}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2" />
        </div>

        {/* Datum – Desktop */}
        <div className={'hidden md:block'}>
          <Select.Root
            size="3"
            value={effectiveDate}
            onValueChange={changeDate}
          >
            <Select.Trigger
              placeholder="wähle den Tag"
              className="select-trigger-large"
            />
            <Select.Content
              position="popper"
              sideOffset={5}
            >
              <Select.Group>
                {sortedDates.map((day) => (
                  <Select.Item
                    key={day}
                    value={day}
                  >
                    {day}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

        {/* Klasse – mobil */}
        <div className={'relative block max-w-1/2 md:hidden'}>
          <select
            className={
              'w-full appearance-none rounded-md border border-gray-600 px-4 py-2 text-lg focus-visible:outline-none'
            }
            value={chosenClass}
            onChange={(e) => setChosenClass(e.currentTarget.value)}
          >
            <option value={NO_CLASS}>wähle die Klasse</option>
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

        {/* Klasse – Desktop */}
        <div className={'hidden max-w-1/2 md:block'}>
          <Select.Root
            size="3"
            value={chosenClass}
            onValueChange={setChosenClass}
          >
            <Select.Trigger
              placeholder="wähle die Klasse"
              className="select-trigger-large"
            />
            <Select.Content
              position="popper"
              sideOffset={5}
            >
              <Select.Group>
                <Select.Item value={NO_CLASS}>{NO_CLASS}</Select.Item>
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

      <div
        className={
          'my-4 grid h-[calc(100vh-184px-60px)] grid-cols-1 gap-4 overflow-auto sm:grid-cols-2 md:grid-cols-4'
        }
      >
        {filteredData.map((el, i) => (
          <ReplacementTile
            el={el}
            key={i}
          />
        ))}
        {filteredData.length === 0 && <NoResultTile />}
      </div>
    </>
  );
};

export default TileGroup;
