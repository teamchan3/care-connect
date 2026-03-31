import type { AvailableService } from "@/constants/availableServices";
import type { CareServiceType } from "@/constants/careServices";
import type { MapEntity } from "./mapEntity";

//Firestoreに登録されていない状態のデータ構造
//まだ保存されていないのでidは存在しない
export type CareProviderData = Omit<MapEntity, "id"> & {
  phoneNumber: string;
  careServiceType: CareServiceType;
  availableServices: AvailableService[];
  capacity: number;
  businessHoursStart: string;
  businessHoursEnd: string;
};

//Firestoreに登録されている状態のデータ構造
export type CareProvider = CareProviderData & {
  id: string;
};
