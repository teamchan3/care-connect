import { create } from "zustand";
import { createLoadingStore, LoadingStore } from "./createLoadingStore";

//LoadingStoreを拡張する場合はここ
// type GlobalLoadingStore = LoadingStore & {
//   //hoge: string;
// };
// その場合、以下のLoadingStoreをGlobalLoadingStoreに変更

export const useGlobalLoadingStore = create<LoadingStore>((set, get, api) => ({
  // 共通ロジックを展開
  ...createLoadingStore()(set, get, api),

  // 独自のメソッドがあれば
}));
