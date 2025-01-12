import { Form, redirect, useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { sessionStorage } from "../utils/sessionUtils";
import { ActionData } from "~/types/interfaces";
import { login } from "~/data/worker.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  // Detectar si l'entrada és un correu electrònic o un nom d'usuari
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier as string);

  // Crear objecte de dades en funció de si és email o nick
  const data = isEmail
    ? { email: identifier as string, password: password as string }
    : { nick: identifier as string, password: password as string };

  try {
    // Realitza el procés de login
    const result = await login(data);

    // Configurar la sessió amb les dades de l'usuari
    const session = await sessionStorage.getSession();
    session.set("token", result.token); // Guardar el token
    session.set("role", result.role);  // Guardar el rol de l'usuari
    session.set("user_id", result.user_id); // Guardar l'ID de l'usuari

    // Guardar les cookies de la sessió i redirigir
    const setCookie = await sessionStorage.commitSession(session);
    return redirect("/reservations", {
      headers: {
        "Set-Cookie": setCookie,
      },
      status: 302,
    });
  } catch (error: unknown) {
    // Capturar i retornar errors al client
    const errorMessage = error instanceof Error ? error.message : "Error inesperat. Torna-ho a intentar més tard.";
    return json(
      { error: errorMessage },
      { status: 400 }
    );
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="flex h-screen">
      {/* Menú lateral amb benvinguda */}
      <div className="w-1/3 bg-black-japan text-yellow-japan flex flex-col items-center justify-center">
        <div className="text-center">
          <img
            src="../../public/haircutLogo.png"
            alt="Icono"
            className="mb-6 w-20 h-20 bottom-100 transform -translate-x-1/3 z-10"
          />
          <h1 className="text-4xl font-bold">Hola</h1>
          <h2 className="text-3xl">IES Cirvianum!</h2>
        </div>
      </div>

      {/* Formulari de login */}
      <div className="w-2/3 bg-white-japan flex flex-col items-center justify-center">
        <div className="w-2/3 max-w-lg p-10">
          <h1 className="text-4xl font-bold text-red-japan text-center mb-6">
            Benvingut/da!
          </h1>
          {actionData?.error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {actionData.error}
            </p>
          )}
          <Form method="post">
            <div className="mb-6">
              {/* Camp per introduir el correu electrònic o nom d'usuari */}
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
              {/* Camp per introduir la contrasenya */}
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
              {/* Enllaç per crear un compte nou */}
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
            >
              Entrar
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
