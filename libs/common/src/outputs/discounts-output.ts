import { Discount } from "@app/database";

export interface DiscountsOutput {
  discounts: Discount[];
  count: number;
}
