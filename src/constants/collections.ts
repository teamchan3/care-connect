export const COLLECTIONS = {
  CARE_PROVIDERS: "careProviders",
  USER_PROFILES: "userProfiles",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
