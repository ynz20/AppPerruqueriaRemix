import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ClientsHistory from "~/components/clients/ClientsHistory";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import { Reservation } from "~/types/interfaces";
import Modal from "~/components/utils/Modal";

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
    const navigate = useNavigate();
    
    function closeHandler() {
        navigate('..');
    }
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">Reserves del Client</h2>
      <Modal onClose={closeHandler}>
        <ClientsHistory reservations={reservations} />
      </Modal>
    </div>
  );
}
