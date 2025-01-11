import { cache } from "react";
import { cookies } from "next/headers";
import { validateSessionToken } from "./session";

export const getCurrentSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  return await validateSessionToken(token);
});
