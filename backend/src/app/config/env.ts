import { z } from "zod";

const envSchema = z.object({
  // Define the expected environment variables and their types
  NODE_ENV: z.enum(["development", "production", "test"]),
  // PORT should be a string that can be transformed into a number
  PORT: z.string().transform((val) => parseInt(val, 10)),
  // DATABASE_URL should be a string
  MONGO_URI: z.string(),
  // JWT_SECRET should be a string
  JWT_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Environment variable validation failed", {
    errors: parsedEnv.error.format(),
  });
  process.exit(1);
}

const env = parsedEnv.data;

export const config = {
  app: {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  },
  database: {
    url: env.MONGO_URI,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
};
