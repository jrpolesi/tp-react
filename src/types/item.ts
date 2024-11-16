export type DiaperStatus = "clean" | "dirty" | "wet" | "wet_dirty";

export type ItemType = "eat" | "diaper" | "sleep";

export type FeedingType = "bottle" | "breasts";

export type BreastSide = "left" | "right" | "both";

export type Item = {
  id: string;
  userId: string;
  createdAt: Date;
  startDatetime?: Date | null;
  endDatetime?: Date | null;
  type: ItemType;
  observation?: string | null;
  active: boolean;
  amount?: number | null;
  breastSide?: BreastSide | null;
  diaperStatus?: DiaperStatus | null;
  feedingType?: FeedingType | null;
};
