import { create } from "zustand";
import { createLoadingStore, LoadingStore } from "./createLoadingStore";

export const useGlobalLoadingStore = create<LoadingStore>((set, get, api) => ({
  // 共通ロジックを展開
  ...createLoadingStore()(set, get, api),

  // 独自のメソッドがあれば
}));
