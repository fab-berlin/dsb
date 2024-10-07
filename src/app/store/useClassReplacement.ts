import { create } from 'zustand'

// ... (previous types and interfaces)

export interface ReplacementClassData {
    name: string;
    hour: string;
    newLesson: string;
    newRoom: string;
    oldLesson: string;
    oldRoom: string;
    message: string;
    cancellation: string;
}
type ReplacementClassDay = {
    replacementDate: ReplacmentDate;
    classData: (ReplacementClassData | null)[];
}
type ReplacmentDate = {
    dateString: string;
    weekday: string;
}

interface ClassReplacementStore {
    parseAndSetData: (data: string[]) => void;
    replacements: Record<string, ReplacementClassDay>;
    isLoading: boolean;
    error: string | null;
}

export const useClassReplacementStore = create<ClassReplacementStore>((set, get) => ({
    replacements: {},
    isLoading: false,
    error: null,

    parseAndSetData: (htmlStrings: string[]) => {
        set({ isLoading: true, error: null });

        try {
            const parser = new DOMParser();
            const newReplacements: Record<string, ReplacementClassDay> = {};

            htmlStrings.forEach((htmlString) => {

                const doc = parser.parseFromString(htmlString, "text/html");
                const date = doc.querySelector(".mon_title")?.innerHTML || 'Unknown Date';
                const {dateString, weekday} = extractDate(date);

                const tableRows = Array.from(doc.querySelectorAll("tr.list.even, tr.list.odd"));

                const classData = tableRows.map((row) => {
                    const cells = Array.from(row.getElementsByTagName("td"));
                    if (cells.length > 1) {
                        return {
                            name: cells[0].textContent ?? '',
                            hour: cells[1].textContent ?? '',
                            newLesson: cells[2].textContent ?? '',
                            newRoom: cells[3].textContent ?? '',
                            oldLesson: cells[4].textContent ?? '',
                            oldRoom: cells[5].textContent ?? '',
                            message: cells[6].textContent ?? '',
                            cancellation: cells[7].textContent ?? '',
                        };
                    }
                    return null;
                }).filter(Boolean);

                const oldClassData = newReplacements[dateString]?.classData ?? [];

                newReplacements[dateString] = {
                    replacementDate: {
                        dateString: dateString,
                        weekday: weekday,
                    },
                    classData: [...oldClassData, ...classData],
                }
            });

            set({ replacements: newReplacements, isLoading: false });
        } catch (error) {
            set({ error: 'Error parsing data: ' + error, isLoading: false });
        }
    },

    // ... (other actions)
}));

const extractDate = (data: string):{dateString: string, weekday: string} => {
    const pattern = /(\d{2}\.\d{2}\.\d{4})\s(\w+)\s\(Seite\s(\d+)\s\//;
    const match = data.match(pattern);

    if (match) {
        const dateString = match[1];
        const weekday = match[2];
        return { dateString: dateString, weekday:weekday };
    } else {
        return { dateString: 'unknown', weekday: 'unknown' };
    }
}