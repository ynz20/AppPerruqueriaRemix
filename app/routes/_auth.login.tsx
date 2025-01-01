import { Form, redirect, useActionData } from "@remix-run/react";
import { ActionFunction, createCookieSessionStorage, json } from "@remix-run/node";
import { sessionStorage } from "../utils/sessionUtils";


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

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
    console.log(error);

    const session = await sessionStorage.getSession();
    session.set("token", error.token);
    session.set("role", error.role);
    session.set("user_id", error.user_id);
    // session.set("user_id", data.user_id);
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
    const actionData = useActionData();
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-black">
        Inicia sessió
      </h1>
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
            htmlFor="email"
          >
            Correu electrònic
          </label>
          <input
            type="text"
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
          Inicia sessió
        </button>
      </Form>
    </div>
  );
}
