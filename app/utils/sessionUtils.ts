import { createCookieSessionStorage, redirect } from "@remix-run/node";

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

export const roleSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "role",
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

export async function getUserRoleFromRequest(request: Request): Promise<number | null> {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return session.get("role");
}



// Funció per tancar la sessió de l'usuari
export async function destroyUserSession(request: Request) {
  // Obtenim la sessió actual
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  // Eliminem la sessió de l'usuari
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}