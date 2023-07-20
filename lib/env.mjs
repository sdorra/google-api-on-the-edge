import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Specify what prefix the client-side variables must have.
   * This is enforced both on type-level and at runtime.
   */
  server: {
    GOOGLE_SA_CLIENT_EMAIL: z.string().min(1).email(),
    GOOGLE_SA_PRIVATE_KEY: z.string().min(1),
    SPREADSHEET_ID: z.string().min(1),
    ON_UPDATE_TOKEN: z.string().min(1),
  },
  client: {},
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: process.env,
});
