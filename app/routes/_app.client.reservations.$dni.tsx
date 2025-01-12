import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ReservationsHistory from "~/components/reservations/ReservationsHistory";
import { getReservationsByDNI } from "~/data/client.server";
import { Reservation } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

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
    const data = await getReservationsByDNI(token, dni as string);

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
        <h2 className="text-xl font-bold text-center mb-4 text-black">
          Reserves del Client
        </h2>
        <ReservationsHistory reservations={reservations} />
      </div>
    </>
  );
}
