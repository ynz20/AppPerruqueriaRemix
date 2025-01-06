import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTokenFromRequest } from "~/utils/sessionUtils";

interface Reservation {
  id: number;
  date: string;
  hour: string;
  worker_dni: string;
  client_dni: string;
  service_id: number;
  shift_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface LoaderData {
  status: boolean;
  reservations: Reservation[];
  message?: string;
}

// Loader: Prepara los datos
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

    if (response.status === 404) {
      return json({ status: true, reservations: [], message: "No s'han trobat reserves per aquest client." });
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return json({ status: true, reservations: data.reservations });
  } catch (error) {
    console.error("Error al carregar les reserves:", error);
    throw new Response("Error al carregar les reserves del client.", { status: 500 });
  }
};

export default function ReservationsClientPage() {
  const { status, reservations = [], message } = useLoaderData<LoaderData>();

  if (!status || reservations.length === 0) {
    return <p className="text-gray-700 text-center">{message || "No hi ha reserves disponibles."}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Llista de Reserves</h2>
      <ul className="space-y-4">
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className="border rounded-lg p-4 shadow-md bg-white text-black"
          >
            <p><strong>ID:</strong> {reservation.id}</p>
            <p><strong>Data:</strong> {reservation.date}</p>
            <p><strong>Hora:</strong> {reservation.hour}</p>
            <p><strong>DNI Treballador:</strong> {reservation.worker_dni}</p>
            <p><strong>DNI Client:</strong> {reservation.client_dni}</p>
            <p><strong>Servei ID:</strong> {reservation.service_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
