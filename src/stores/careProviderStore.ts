import { create } from "zustand";
import { CareProvider } from "@/types/careProvider";

type CareProviderStore = {
  careProviders: CareProvider[];
  setCareProviders: (careProviders: CareProvider[]) => void;
  addCareProvider: (careProvider: CareProvider) => void;
  updateCareProvider: (id: string, data: Partial<CareProvider>) => void;
  deleteCareProvider: (id: string) => void;
  getCareProvider: (id: string) => CareProvider | undefined;
};

export const useCareProviderStore = create<CareProviderStore>((set, get) => ({
  careProviders: [],

  setCareProviders: (careProviders) => set({ careProviders }),

  addCareProvider: (careProvider) => set((state) => ({
    careProviders: [...state.careProviders, careProvider],
  })),

  updateCareProvider: (id, data) => set((state) => ({
    careProviders: state.careProviders.map((provider) =>
      provider.id === id ? { ...provider, ...data } : provider
    ),
  })),

  deleteCareProvider: (id) => set((state) => ({
    careProviders: state.careProviders.filter((provider) => provider.id !== id),
  })),

  getCareProvider: (id) => {
    return get().careProviders.find((provider) => provider.id === id);
  },
}));