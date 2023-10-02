import { RateLimiter } from "limiter";

export const Limitier = new RateLimiter({
  tokensPerInterval: 3,
  interval: "min",
  fireImmediately: true,
});
