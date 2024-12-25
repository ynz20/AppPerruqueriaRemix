import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

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

    // Respuesta de éxito
    return json({ success: "Registre completat amb èxit!" });
  } catch (error) {
    return json({ error: "Error del servidor. Torna-ho a intentar més tard." }, { status: 500 });
  }
};

export default function Register() {
  const actionData = useActionData();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-black">Registre</h1>
      {actionData?.error && (
        <p className="text-red-500 text-sm mb-4">
          {typeof actionData.error === "string" ? actionData.error : JSON.stringify(actionData.error)}
        </p>
      )}
      {actionData?.success && (
        <p className="text-green-500 text-sm mb-4">
          {typeof actionData.success === "string" ? actionData.success : JSON.stringify(actionData.success)}
        </p>
      )}
      <Form method="post">
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="dni"
          >
            DNI
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="surname"
          >
            Cognom
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="nick"
          >
            Nom d&apos;usuari
          </label>
          <input
            type="text"
            id="nick"
            name="nick"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="telf"
          >
            Telèfon
          </label>
          <input
            type="tel"
            id="telf"
            name="telf"
            required
            pattern="[0-9]{9}"
            title="Introdueix un número de telèfon vàlid (9 dígits)."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Correu electrònic
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Contrasenya
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Registrar-se
        </button>
      </Form>
    </div>
  );
}
