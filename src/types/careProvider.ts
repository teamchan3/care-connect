import type { AvailableService } from "@/constants/availableServices";
import type { CareServiceType } from "@/constants/careServices";
import type { MapEntity } from "./mapEntity";

export type CareProvider = MapEntity & {
  phoneNumber: string;
  careServiceType: CareServiceType;
  availableServices: AvailableService[];
  capacity: number;
  businessHoursStart: string;
  businessHoursEnd: string;
};
