import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
  
  cookies.delete("email", { path: "/", sameSite: "none", secure: true });
  cookies.delete("isAdmin", { path: "/", sameSite: "none", secure: true  });

  throw redirect(302, "/");
}
