import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ClientsHistory from "~/components/clients/ClientsHistory";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import { Reservation } from "~/types/interfaces";

interface LoaderData {
  reservations: Reservation[];
}

// Loader per obtenir les reserves d'un client
export const loader: LoaderFunction = async ({ params, request }) => {
  const token = await getTokenFromRequest(request);
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const { dni } = params;
  try {
    const response = await fetch(`http://localhost:8085/api/reservations/client/${dni}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.reservations);
    return json({ reservations: data.reservations });
  } catch (error) {
    console.error("Error carregant les reserves:", error);
    throw new Response("Error al carregar les reserves.", { status: 500 });
  }
};

export default function ReservationsClientPage() {
  const { reservations } = useLoaderData<LoaderData>();

  return (
    <>
      <Link
        to="../clients"
        className="inline-flex items-center rounded bg-red-japan px-4 py-2 text-white-japan shadow-md hover:text-yellow-japan"
      >
        <span>Tornar Enrere</span>
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-4">Reserves del Client</h2>
        <ClientsHistory reservations={reservations} />
      </div>
    </>
  );
}

