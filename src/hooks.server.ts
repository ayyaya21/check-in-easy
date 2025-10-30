import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const email = event.cookies.get("email");
  if (!email && event.url.pathname.startsWith("/courses")) {
    throw redirect(307, "/");
  }

  if (email && event.url.pathname === "/") {
    throw redirect(307, "/courses");
  }

  return resolve(event);
};
