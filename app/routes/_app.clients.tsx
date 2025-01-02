import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import ClientList from "~/components/clients/ClientList";
import { Client } from "~/types/interfaces";
import { getClients } from "~/data/client.server";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getTokenFromRequest(request);

  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const clients = await getClients(token);
  return clients;
};

export default function ClientsPage() {
  const { clients } = useLoaderData<{ clients: Client[] }>();
  return (
    <>
      <Outlet />
      <main>
        <section>
          <h1 className="text-2xl font-bold mb-4 text-black">
            Gestió de Clients
          </h1>
          <Link
            to="add"
            className="inline-flex items-center rounded bg-red-japan px-4 py-2 text-white-japan shadow-md hover:text-yellow-japan"
          >
            <span>Afegir Clients</span>
          </Link>
        </section>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-black">
            Llista de Clients
          </h1>
          <ClientList clients={clients} />
        </div>
      </main>
    </>
  );
}
