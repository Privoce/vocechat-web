export interface EntityId {
  id: number;
}
export type Theme = "auto" | "dark" | "light";
export type AuthType = "register" | "login";
export type PriceType = "subscription" | "payment";
export type PriceSubscriptionDuration = "month" | "quarter" | "year";
export type Price = {
  title: string,
  price: string,
  limit: number,
  pid: string,
  desc: string,
  type: PriceType,
  sub_dur?: PriceSubscriptionDuration
}
