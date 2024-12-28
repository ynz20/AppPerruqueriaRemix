import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import ClientList from "~/components/clients/ClientList";
import { Client } from "~/types/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const token = await getTokenFromRequest(request);

    if (!token) {
      throw new Response("Inicia sessió per accedir.", { status: 401 });
    }

    const response = await fetch("http://localhost:8085/api/clients", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return json(data);
  } catch (err) {
    throw new Response("Error en carregar els clients. Intenta-ho més tard.", {
      status: 500,
    });
  }
};


export default function ClientsPage() {
  const { clients } = useLoaderData<{ clients: Client[] }>();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Llista de Clients</h1>
      <ClientList clients={clients} />
    </div>
  );
}
