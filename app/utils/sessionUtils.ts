import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "token",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, 
    path: "/",
  },
});

// Funció per obtenir el token des de les cookies
export async function getTokenFromRequest(request: Request): Promise<string | null> {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return session.get("token");
}
