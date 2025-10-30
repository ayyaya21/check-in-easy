import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const { email } = await request.json();

  if (!email) {
    return new Response("Email required", { status: 400 });
  }

  const isAdmin = email == "professor@it.kmitl.ac.th";

  cookies.set("email", email, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookies.set("isAdmin", isAdmin + "", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return json({ success: true });
}
