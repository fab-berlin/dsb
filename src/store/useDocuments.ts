import { create } from 'zustand';
import { DocumentDataProps } from '@/types/types';

interface DocumentsStore {
  documents: DocumentDataProps[];
  isLoading: boolean;
  error: string | null;
  setData: (data: DocumentDataProps[]) => void;
}

export const useDocuments = create<DocumentsStore>((set, get) => ({
  documents: [],
  isLoading: false,
  error: null,

  setData: (data: DocumentDataProps[]) => set({ documents: data, isLoading: false }),
}));
