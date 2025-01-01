import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { sessionStorage } from "~/utils/sessionUtils";
import { useState } from "react";
import { User } from "~/types/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const userId = session.get("user_id");

  if (!userId) {
    return redirect("/login");
  }

  const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.get("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw json({ error: "Error carregant el perfil." }, { status: response.status });
  }

  const userData = await response.json();
  return json(userData);
};

async function updateUser(updatedData: User, userId: string, token: string) {
  const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw json(errorData, { status: response.status });
  }

  return response.json();
}

export const action: ActionFunction = async ({ request }) => {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
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
      dni: formData.get("dni") as string,
      role: false,
    };
  
    const password = formData.get("password") as string;
    if (password) {
      updatedData.password = password; // Només afegeix la contrasenya si no està buida
    }
  
    try {
      await updateUser(updatedData, userId, session.get("token"));
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
  const actionData = useActionData<{ success?: string; errors?: Record<string, string> }>();
  const [showPopup, setShowPopup] = useState(false);

  const user = data.user as User;

  if (actionData?.success && !showPopup) {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8">
      <h1 className="text-gray-800 text-3xl font-bold mb-8">El meu Perfil</h1>

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

      <Form method="post" className="space-y-6">
        {[
          { id: "name", label: "Nom", type: "text", value: user.name },
          { id: "surname", label: "Cognoms", type: "text", value: user.surname },
          { id: "nick", label: "Nom d'usuari", type: "text", value: user.nick },
          { id: "dni", label: "DNI", type: "text", value: user.dni },
          { id: "telf", label: "Número de telèfon", type: "text", value: user.telf },
          { id: "email", label: "Correu electrònic", type: "email", value: user.email },
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
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Nova contrasenya (opcional)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Desar
          </button>
        </div>
      </Form>
    </div>
  );
}
  
