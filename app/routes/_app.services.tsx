import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import ServiceList from "~/components/services/ServiceList";
import { getServices } from "~/data/service.server";
import { Service } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getTokenFromRequest(request);
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }
  const services = await getServices(token);
  return services;
};

export default function ServicesPage() {
  const { services } = useLoaderData<{ services: Service[] }>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const successMessage = searchParams.get("success");
    if (successMessage) {
      toast.success(successMessage); // Mostrar notificació
      searchParams.delete("success");
      setSearchParams(searchParams, { replace: true }); // Actualitzar l'URL
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <head>
        <title>Gestió de Serveis</title>
      </head>
      <ToastContainer /> {/* Contenidor per a notificacions */}
      <Outlet />
      <main>
        <section>
          <h1 className="text-2xl font-bold mb-4 text-black">Serveis</h1>
          <Link
            to="add"
            className="inline-flex items-center rounded bg-red-japan px-2 py-2 text-white-japan shadow-md hover:text-yellow-japan"
          >
            <span className="ml-2">Afegir Servei</span>
          </Link>
        </section>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-black">
            Llista de Serveis
          </h1>
          <ServiceList services={services} />
        </div>
      </main>
    </>
  );
}
