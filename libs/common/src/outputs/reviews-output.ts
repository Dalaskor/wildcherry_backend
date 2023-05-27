import { Review } from "@app/database";

export interface ReviewsOutput {
  reviews: Review[];
  count: number;
}
