import { create } from "zustand";
import { LoadingType, LoadingItem, LoadingState } from "@/types/loading";

type LoadingStore = {
  loadings: LoadingState;
  setLoading: (type: LoadingType, value: boolean, message?: string) => void;
  getLoading: (type: LoadingType) => LoadingItem;
  getMessage: (type: LoadingType) => string | undefined;
  getActiveMessage: () => string | undefined;
  getMessages: () => string[];
  isLoading: (type: LoadingType) => boolean;
  isAnyLoading: () => boolean;
  clearLoading: (type: LoadingType) => void;
};

// 初期状態
const initialLoadings: LoadingState = {
  auth: { isLoading: false, message: undefined },
  api: { isLoading: false, message: undefined },
  data: { isLoading: false, message: undefined },
  firestore: { isLoading: false, message: undefined },
};

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  loadings: initialLoadings,

  setLoading: (type, value, message) => {
    set((state) => {
      return {
        loadings: {
          ...state.loadings,
          [type]: { isLoading: value, message },
        },
      };
    });
  },

  getLoading: (type) => {
    return get().loadings[type];
  },

  getMessage: (type) => {
    return get().loadings[type].message;
  },

  getActiveMessage: () => {
    const active = Object.values(get().loadings).find((l) => l.isLoading);
    return active?.message;
  },

  getMessages: () => {
    return Object.values(get().loadings)
      .filter((l) => l.isLoading && l.message)
      .map((l) => l.message as string);
  },

  isLoading: (type) => {
    return get().loadings[type].isLoading;
  },

  isAnyLoading: () => {
    return Object.values(get().loadings).some((l) => l.isLoading);
  },

  clearLoading: (type) => {
    set((state) => {
      return {
        loadings: {
          ...state.loadings,
          [type]: { isLoading: false, message: undefined },
        },
      };
    });
  },
}));
