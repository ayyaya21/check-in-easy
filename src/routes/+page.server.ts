import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, locals }) => {
  const email = cookies.get("email");
  if (email) {
    throw redirect(307, "/courses");
  }
  return {
    isAdmin: cookies.get('isAdmin') == "true"  
  }
};