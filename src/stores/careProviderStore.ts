import { create } from "zustand";
// import { MOCK_CARE_PROVIDERS } from "@/data/mockCareProviders";
import type { CareProvider, CareProviderData } from "@/types/careProvider";

type CareProviderStore = {
  careProviders: CareProvider[];
  setCareProviders: (careProviders: CareProvider[]) => void;
  addCareProvider: (careProvider: CareProvider) => void;
  //変更したい項目だけを送るので、Partial<CareProviderData>を使用
  updateCareProvider: (id: string, data: Partial<CareProviderData>) => void;
  deleteCareProvider: (id: string) => void;
  getCareProvider: (id: string) => CareProvider | undefined;
};

export const useCareProviderStore = create<CareProviderStore>((set, get) => ({
  // careProviders: MOCK_CARE_PROVIDERS,
  careProviders: [],

  setCareProviders: (careProviders) => set({ careProviders }),

  addCareProvider: (careProvider) =>
    set((state) => ({
      careProviders: [...state.careProviders, careProvider],
    })),

  updateCareProvider: (id, data) =>
    set((state) => ({
      careProviders: state.careProviders.map((provider) =>
        provider.id === id ? { ...provider, ...data } : provider
      ),
    })),

  deleteCareProvider: (id) =>
    set((state) => ({
      careProviders: state.careProviders.filter(
        (provider) => provider.id !== id
      ),
    })),

  getCareProvider: (id) => {
    return get().careProviders.find((provider) => provider.id === id);
  },
}));
