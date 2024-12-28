import { useLoaderData, Form } from "@remix-run/react";
import { LoaderFunction, ActionFunction, json } from "@remix-run/node";
import { getTokenFromRequest } from "../utils/sessionUtils";

//Interfície de client
export interface Client {
  dni: string;       // DNI del client
  name: string;      // Nom del client
  surname: string;   // Cognom del client
  telf: string;      // Telèfon del client
  email: string;     // Correu electrònic del client
}

// Loader per GET de clients
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Obtenir el token utilitzant la funció modularitzada
    const token = await getTokenFromRequest(request);

    if (!token) {
      throw new Response("No autoritzat. Inicia sessió per accedir.", { status: 401 });
    }

    // Petició a l'API de clients
    const response = await fetch("http://localhost:8085/api/clients", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Comprovació de la resposta de l'API
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const clients = await response.json();
    return json(clients);
  } catch (err) {
    console.error("Error al carregar els clients:", err);
    throw new Response("Error en carregar els clients. Intenta-ho més tard.", {
      status: 500,
    });
  }
};



// Action per gestionar CRUD de clients (Exemple de com tractar-ho)
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "delete") {
    const clientId = formData.get("clientId");
    console.log(`Eliminant client amb ID: ${clientId}`);
    return json({ success: `Client amb ID ${clientId} eliminat correctament.` });
  }

  if (actionType === "edit") {
    const clientId = formData.get("clientId");
    const updatedData = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      dni: formData.get("dni"),
    };
    console.log(`Editant client amb ID: ${clientId}`, updatedData);
    return json({ success: `Client amb ID ${clientId} actualitzat correctament.` });
  }

  return json({ error: "Acció no reconeguda." });
};

//llista de clients
export default function Clients() {
  
  const {clients} = useLoaderData<Client[]>();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Llista de Clients</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nom</th>
              <th className="px-4 py-2 border-b">Cognom</th>
              <th className="px-4 py-2 border-b">DNI</th>
              <th className="px-4 py-2 border-b">Accions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-100 text-black">
                <td className="px-4 py-2 border-b">{client.name}</td>
                <td className="px-4 py-2 border-b">{client.surname}</td>
                <td className="px-4 py-2 border-b">{client.dni}</td>
                <td className="px-4 py-2 border-b">
                  {/* Botó per eliminar */}
                  <Form method="post" className="inline">
                    <input type="hidden" name="clientId" value={client.id} />
                    <button
                      type="submit"
                      name="_action"
                      value="delete"
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </Form>
                  {/* Botó per editar */}
                  <Form method="post" className="inline ml-4">
                    <input type="hidden" name="clientId" value={client.id} />
                    <input type="hidden" name="name" value={client.name} />
                    <input type="hidden" name="surname" value={client.surname} />
                    <input type="hidden" name="dni" value={client.dni} />
                    <button
                      type="submit"
                      name="_action"
                      value="edit"
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
