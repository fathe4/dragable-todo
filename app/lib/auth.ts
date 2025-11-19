import { APIError, betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import Api from "../services/Api";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const { first_name, last_name, email, password } = ctx.body;

        const user = await Api.user.signup({
          first_name,
          last_name,
          email,
          password,
        });
        if (!user)
          throw new APIError("BAD_REQUEST", { message: "Invalid signup" });
        ctx.body = user;
      }
    }),
  },

  user: {
    additionalFields: {
      id: { type: "string", required: true },
    },
  },
});
