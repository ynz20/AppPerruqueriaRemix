import { Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { useEffect } from "react";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import ClientList from "~/components/clients/ClientList";
import { Client } from "~/types/interfaces";
import { getClients } from "~/data/client.server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getTokenFromRequest(request);

  if (!token) {
    throw new Error("Inicia sessió per accedir.");
  }

  const clients = await getClients(token);

  if (!clients) {
    throw new Error("Error en carregar els clients. Intenta-ho més tard.");
  }

  return clients;
};

export default function ClientsPage() {
  const { clients } = useLoaderData<{ clients: Client[] }>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const successMessage = searchParams.get("success");
    if (successMessage) {
      toast.success(successMessage);
      searchParams.delete("success");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <head>
        <title>Gestió de Clients</title>
      </head>
      <ToastContainer />
      <Outlet />
      <main>
        <section>
          <h1 className="text-2xl font-bold mb-2 text-black">
            Gestió de Clients
          </h1>
          <Link
            to="add"
            className="inline-flex items-center rounded bg-red-japan px-4 py-1 text-white-japan shadow-md hover:text-yellow-japan"
          >
            <span>Afegir Clients</span>
          </Link>
        </section>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1 text-black">
            Llista de Clients
          </h1>
          <ClientList clients={clients} />
        </div>
      </main>
    </>
  );
}
