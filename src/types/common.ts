export interface EntityId {
  id: number;
}
export type PriceType = "subscription" | "payment";
export type PriceSubscriptionDuration = "month" | "quarter" | "year";
export type Price = {
  title: string,
  limit: number,
  pid: string,
  desc: string,
  type: PriceType,
  sub_dur?: PriceSubscriptionDuration
}
