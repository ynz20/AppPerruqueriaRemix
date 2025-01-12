import {
  json,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import {
  getTokenFromRequest,
  getUserIdFromRequest,
  sessionStorage,
} from "~/utils/sessionUtils";
import { useState } from "react";
import { User } from "~/types/interfaces";
import { getWorkerById, updateUser } from "~/data/worker.server";

export const loader: LoaderFunction = async ({ request }) => {
  const token = (await getTokenFromRequest(request)) as string;
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return redirect("/login");
  }

  const dataProfile = await getWorkerById(token, userId);

  return dataProfile;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user_id");

  if (!userId) {
    return json({ error: "Usuari no autenticat." }, { status: 401 });
  }

  const formData = await request.formData();
  const updatedData: User = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    nick: formData.get("nick") as string,
    telf: formData.get("telf") as string,
    email: formData.get("email") as string,
    dni: formData.get("dni") as string, // DNI recuperat del camp hidden
    role: false,
  };

  const password = formData.get("password") as string;
  if (password) {
    updatedData.password = password; // Només afegeix la contrasenya si no està buida
  }

  try {
    const token = await getTokenFromRequest(request);
    await updateUser(updatedData, updatedData.dni, token);
    return json({ success: "Perfil actualitzat correctament!" });
  } catch (error) {
    if (error instanceof Response) {
      const errorData = await error.json();
      return json({ errors: errorData.errors }, { status: error.status });
    }
    return json({ errors: { general: "Error desconegut" } }, { status: 400 });
  }
};

export default function Profile() {
  const data = useLoaderData<{ user: User }>();
  const actionData = useActionData<{
    success?: string;
    errors?: Record<string, string>;
  }>();
  const [showPopup, setShowPopup] = useState(false);

  const user = data.user as User;

  if (actionData?.success && !showPopup) {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  }

  return (
    <>
      <head>
        <title>Gestió de Perfil</title>
      </head>
      <div className="max-w-3xl mx-auto p-2">
        <h1 className="text-gray-800 text-3xl font-bold mb-8 mt-20">
          El meu Perfil
        </h1>

        {actionData?.errors && (
          <div className="bg-red-50 text-red-600 p-4 rounded mb-6 border border-red-200">
            <ul>
              {Object.entries(actionData.errors).map(([field, message]) => (
                <li key={field}>
                  <strong className="capitalize">{field}:</strong> {message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showPopup && (
          <div className="fixed top-4 right-4 bg-green-50 text-green-700 px-6 py-3 rounded-lg shadow-md">
            {actionData?.success}
          </div>
        )}

        <Form method="post" className="space-y-3">
          {[
            { id: "name", label: "Nom", type: "text", value: user.name },
            {
              id: "surname",
              label: "Cognoms",
              type: "text",
              value: user.surname,
            },
            {
              id: "nick",
              label: "Nom d'usuari",
              type: "text",
              value: user.nick,
            },
            {
              id: "telf",
              label: "Número de telèfon",
              type: "text",
              value: user.telf,
            },
            {
              id: "email",
              label: "Correu electrònic",
              type: "email",
              value: user.email,
            },
          ].map(({ id, label, type, value }) => (
            <div key={id} className="flex flex-col space-y-2">
              <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                defaultValue={value}
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
              />
            </div>
          ))}

          {/* Camp ocult per al DNI */}
          <input type="hidden" name="dni" value={user.dni} />

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Nova contrasenya (opcional)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="px-6 py-2 bg-red-japan text-white font-medium rounded-md hover:bg-black-japan focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Desar
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
