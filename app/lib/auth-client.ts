import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://todo-app.pioneeralpha.com",

  plugins: [
    inferAdditionalFields({
      user: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        name: { type: "string", required: false },
      },
    }),
  ],
});
