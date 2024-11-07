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

/**
 * BVG departures
 */

export type DepartureItems = {
  id: string;
  name: string;
  comingDepartures: DepartureTour[];
};
export type DepartureTour = {
  id: string;
  destination: string;
  name: string;
  time: Date;
  type: 'bus' | 'ferry' | 'tram' | 'subway' | 'suburban';
};

export type DepartureStationItem = {
  id: string;
  name: string;
  label: string;
  directions?: DepartureStationItem[];
};

export type DepartureDataStructure = {
  departures: DepartureItem[];
  realtimeDataUpdatedAt: number;
};

type DepartureItem = {
  tripId: string;
  stop: DepartureStop;
  when: string; // ISO date-time string
  plannedWhen: string; // ISO date-time string
  delay: number;
  platform: string | null;
  plannedPlatform: string | null;
  prognosisType: string;
  direction: string;
  provenance: string | null;
  line: DepartureLine;
  remarks: DepartureRemark[];
  origin: DepartureStop | null;
  destination: DepartureStop;
  currentTripPosition: DepartureLocation | null;
  occupancy: 'low' | 'medium' | 'high';
};

type DepartureStop = {
  type: 'stop';
  id: string;
  name: string;
  location: DepartureLocation;
  products: DepartureProductAvailability;
};

type DepartureLocation = {
  type: 'location';
  id?: string; // Optional because `currentTripPosition` lacks `id`
  latitude: number;
  longitude: number;
};

type DepartureProductAvailability = {
  suburban: boolean;
  subway: boolean;
  tram: boolean;
  bus: boolean;
  ferry: boolean;
  express: boolean;
  regional: boolean;
};

type DepartureLine = {
  type: 'line';
  id: string;
  fahrtNr: string;
  name: string;
  public: boolean;
  adminCode: string;
  productName: string;
  mode: string;
  product: string;
  operator: DepartureOperator;
};

type DepartureOperator = {
  type: 'operator';
  id: string;
  name: string;
};

type DepartureRemark = {
  type: string;
  code?: string;
  id?: string; // Optional because `type: "hint"` lacks `id`
  summary?: string;
  text: string;
  icon?: DepartureIcon;
  priority?: number;
  products?: DepartureProductAvailability;
  company?: string;
  categories?: number[];
  validFrom?: string; // ISO date-time string
  validUntil?: string; // ISO date-time string
  modified?: string; // ISO date-time string
};

type DepartureIcon = {
  type: string;
  title: string | null;
};
