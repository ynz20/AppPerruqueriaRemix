import { redirect, useNavigate } from "@remix-run/react";
import ReservationsForm from "~/components/reservations/ReservationsForm";
import Modal from "~/components/utils/Modal";
import { addReservation } from "~/data/reservation.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import { getClients } from "~/data/client.server";
import { getServicesNotAdmin } from "~/data/service.server";
import { getWorkersnotAdmin } from "~/data/worker.server";
import { useState } from "react";

export const loader = async ({ request }: { request: Request }) => {
  const token = await getTokenFromRequest(request);

  // Llançar un error si l'usuari no està autenticat
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  // Obtenir clients, serveis i treballadors
  const [clientsResponse, servicesResponse, workersResponse] = await Promise.all([
    getClients(token),
    getServicesNotAdmin(token),
    getWorkersnotAdmin(token),
  ]);


  const clientsData = await clientsResponse.json();
  const servicesData = await servicesResponse.json();
  const workersData = await workersResponse.json();

  return {
    clients: clientsData.clients,
    services: servicesData.services,
    workers: workersData.users,
  };
};

export default function ReservationsAddPage() {
  const [error, setError] = useState<string | null>(null); // Estat per a gestionar errors
  const navigate = useNavigate();

  // Tancar el modal i tornar a la pàgina anterior
  function closeHandler() {
    navigate("..");
  }

  // Funció per establir errors des del servidor
  function handleError(message: string) {
    setError(message);
  }

  return (
    <>
      {/* Mostrar un modal amb l'error si existeix */}
      {error && (
        <Modal onClose={() => setError(null)}>
          <div className="text-red-500">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        </Modal>
      )}
      <Modal onClose={closeHandler}>
        {/* Formulari per afegir reserves */}
        <ReservationsForm onError={handleError} />
      </Modal>
    </>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const token = await getTokenFromRequest(request);

  // Validar el camp hora amb format HH:mm
  const hour = formData.get("hour") as string;
  if (!hour || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(hour)) {
    throw new Error("Hora no vàlida. Usa el format HH:mm");
  }

  // Construir les dades de la reserva
  const reservationData = {
    client_dni: formData.get("client") as string,
    service_id: parseInt(formData.get("service") as string),
    worker_dni: formData.get("worker") as string,
    hour, 
    date: new Date(formData.get("day") as string).toISOString().split("T")[0], // Format YYYY-MM-DD
    shift_id: null,
    status: "pending", 
  };

  try {
    // Afegir la nova reserva al servidor
    await addReservation(reservationData, token);
  } catch (error) {
    // Gestionar errors en crear la reserva
    const errorMessage =
      error instanceof Error ? error.message : "Error al crear la reserva";
    return { errorMessage };
  }

  return redirect("/reservations");
}
