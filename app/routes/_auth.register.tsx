import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { ActionData } from "~/types/interfaces";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    dni: formData.get("dni"),
    name: formData.get("name"),
    surname: formData.get("surname"),
    nick: formData.get("nick"),
    telf: formData.get("telf"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:8085/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return json({ error: error.message || "Error en el registre." }, { status: response.status });
    }

    return redirect("/login");
  } catch (error) {
    return json({ error: "Error del servidor. Torna-ho a intentar més tard." }, { status: 500 });
  }
};



export default function Register() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Menú Lateral */}
      <div className="w-1/3 bg-black-japan text-yellow-japan flex flex-col items-center justify-center">
        <div className="text-center px-6">
          <img
            src="../../public/haircutLogo.png"
            alt="Icono"
            className="mb-6 w-20 h-20"
          />
          <h1 className="text-4xl font-bold mb-2">Registra’t</h1>
          <h2 className="text-2xl">per accedir a tots els serveis!</h2>
        </div>
      </div>

      {/* Form */}
      <div className="w-2/3 bg-[#faf8e8] flex flex-col items-center justify-center">
        <div className="w-3/4 max-w-lg p-8">
          <h1 className="text-3xl font-bold text-red-700 text-center mb-6">
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
            <div className="space-y-2">
              <input
                type="text"
                id="nick"
                name="nick"
                placeholder="Nom d’usuari"
                required
                className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nom"
                required
                className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Cognom"
                required
                className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                id="dni"
                name="dni"
                placeholder="DNI"
                required
                className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="tel"
                id="telf"
                name="telf"
                placeholder="Telèfon"
                required
                pattern="[0-9]{9}"
                title="Introdueix un número de telèfon vàlid (9 dígits)."
                className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correu"
                required
                className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contrasenya"
                required
                className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-black mb-4">
                Ja tens compte?{" "}
                <a href="/login" className="text-red-japan underline">
                  Accedir-hi
                </a>
              </p>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Registrar-se
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}


