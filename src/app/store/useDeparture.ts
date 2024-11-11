import { create } from 'zustand';
import { DepartureDataStructure, DepartureItems, DepartureStationItem } from '@/types/types';

interface ClassDepartureStore {
  parseAndSetStations: (data: DepartureStationItem[]) => void;
  parseAndSetDepartures: (data: DepartureDataStructure) => void;
  stationList: DepartureStationItem[];
  departures: Record<string, DepartureItems>;
  isLoading: boolean;
  error: string | null;
}

export const useDepartureStore = create<ClassDepartureStore>((set) => ({
  stationList: [],
  departures: {},
  isLoading: false,
  error: null,

  parseAndSetStations: (data: DepartureStationItem[]) => {
    console.log('zustand data', data);

    set({ stationList: data });
  },

  parseAndSetDepartures: (data: DepartureDataStructure) => {
    set({ isLoading: true, error: null });
    console.log('zustand data', data);
    // TODO: reduce the loaded data to comply with the defined type
    //set({ departures: data });
  },
}));
