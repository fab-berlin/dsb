export type ReplacementItem = {
  date: ReplacementItemDate;
  classData: ReplacementClassData[];
};
export type ReplacementItemDate = {
  date: string;
  day: 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag';
  sorting: string;
};
export type ReplacementClassData = {
  cancellation: string;
  hour: string;
  message: string;
  name: string;
  newLesson: string;
  newRoom: string;
  oldLesson: string;
  oldRoom: string;
};

export type TimetableHour = {
  name: string;
  type: string;
  length: string;
  startType: 'A' | 'E';
  startTime: string;
  endTime: string;
};
export type TimetableDayItem = {
  day: string;
  hours: TimetableHour[];
};
export type Timetable = {
  timetable: TimetableDayItem[];
};
