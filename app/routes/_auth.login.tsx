import { Form, redirect, useActionData } from "@remix-run/react";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { sessionStorage, getTokenFromRequest } from "../utils/sessionUtils";
import { ActionData } from "~/types/interfaces";
import { login } from "~/data/worker.server";
import { useState, useEffect } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getTokenFromRequest(request);

  // Si ja hi ha un token, redirigir a /reservations
  if (token) {
    return redirect("/reservations");
  }

  // Si no hi ha token, permetre l'accés a la pàgina de login
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier as string);

  const data = isEmail
    ? { email: identifier as string, password: password as string }
    : { nick: identifier as string, password: password as string };

  try {
    const result = await login(data);

    const session = await sessionStorage.getSession();
    session.set("token", result.token);
    session.set("role", result.role);
    session.set("user_id", result.user_id);

    const setCookie = await sessionStorage.commitSession(session);
    return redirect("/reservations", {
      headers: {
        "Set-Cookie": setCookie,
      },
      status: 302,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error inesperat. Torna-ho a intentar més tard.";
    return json({ error: errorMessage }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (actionData?.error) {
      setIsSubmitting(false);
    }
  }, [actionData]);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Aquest div desapareix en pantalles petites */}
        <div className="hidden md:flex w-1/3 bg-black-japan text-yellow-japan flex-col items-center justify-center">
          <div className="text-center">
            <img
              src="../../public/haircutLogo.png"
              alt="Icona"
              className="mb-6 w-20 h-20 bottom-100 transform -translate-x-1/3 z-10"
            />
            <h1 className="text-4xl font-bold">Hola</h1>
            <h2 className="text-3xl">IES Cirvianum!</h2>
          </div>
        </div>
        <div className="w-full md:w-2/3 bg-white-japan flex flex-col items-center justify-center">
          <div className="w-2/3 max-w-lg p-10">
            <h1 className="text-4xl font-bold text-red-japan text-center mb-6">
              Benvingut/da!
            </h1>
            {actionData?.error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {actionData.error}
              </p>
            )}
            <Form method="post" onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  placeholder="Correu/Nom d’usuari"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contrasenya"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="text-center mb-6">
                <p className="text-sm text-black">
                  No tens compte?{" "}
                  <a href="/register" className="text-red-japan underline">
                    Crear un nou compte ara
                  </a>
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Accedint..." : "Entrar"}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
