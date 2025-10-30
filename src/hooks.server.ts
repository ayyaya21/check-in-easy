// export { handle } from "./auth"

import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
//   if (event.url.pathname === "/") {
//     throw redirect(307, "/courses");
//   }
  const response = await resolve(event);
  return response;
};
