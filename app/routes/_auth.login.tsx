import { Form, redirect, useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { sessionStorage } from "../utils/sessionUtils";
import { ActionData } from "~/types/interfaces";


export const action: ActionFunction = async ({ request }) => {

  //Recollim les dades del formulari
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //Fem una petició POST al servidor per iniciar sessió
  try {
    const response = await fetch("http://localhost:8085/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const error = await response.json();

    if (!response.ok) {
      return json(
        { error: error.message || "Error en el inici de sessió." },
        { status: response.status }
      );
    }

    //Si tot ha anat bé, guardem les dades de sessió i redirigim a la pàgina de clients
    const session = await sessionStorage.getSession();
    session.set("token", error.token);
    session.set("role", error.role);
    const setCookie = await sessionStorage.commitSession(session);
    return redirect("/clients", {
      headers: {
        "Set-Cookie": setCookie,
      },
      status: 302,
    });
  } catch (error) {
    return json({ error: "Error del servidor. Torna-ho a intentar més tard." }, { status: 500 });
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="flex h-screen">
      {/* Menú lateral */}
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

      {/* Form */}
      <div className="w-2/3 bg-white-japan flex flex-col items-center justify-center">
        <div className="w-2/3 max-w-lg p-10">
          <h1 className="text-4xl font-bold text-red-japan text-center mb-6">
            Benvingut/da!
          </h1>
          {actionData?.error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {typeof actionData.error === "string"
                ? actionData.error
                : JSON.stringify(actionData.error)}
            </p>
          )}
          {actionData?.success && (
            <p className="text-green-500 text-sm mb-4 text-center">
              {typeof actionData.success === "string"
                ? actionData.success
                : JSON.stringify(actionData.success)}
            </p>
          )}
          <Form method="post">
            <div className="mb-6">
              <input
                type="text"
                id="email"
                name="email"
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
            >
              Entrar
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}


