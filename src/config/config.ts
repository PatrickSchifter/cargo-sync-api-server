import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || "development",
    base_url: process.env.BASE_URL,
    rate_limit_per_minute: process.env.API_RATE_LIMIT_PER_MINUTE
      ? parseInt(process.env.API_RATE_LIMIT_PER_MINUTE)
      : 60,
  },
};
