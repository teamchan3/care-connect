import { MapEntity } from "./mapEntity";
import { CareServiceType } from "@/constants/careServices";
import { AvailableService } from "@/constants/availableServices";

export type CareProvider = MapEntity & {
  phoneNumber: string;
  careServiceType: CareServiceType;
  availableServices: AvailableService[];
  capacity: number;
  businessHoursStart: string;
  businessHoursEnd: string;
};