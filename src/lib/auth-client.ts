 
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const AUTH_URL =
  process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000";

console.log("Better Auth URL:", AUTH_URL);

export const authClient = createAuthClient({
  baseURL: AUTH_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [jwtClient()],
});
