import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
  
  cookies.delete("email", { path: "/" });
  cookies.delete("isAdmin", { path: "/" });

  throw redirect(302, "/");
}
