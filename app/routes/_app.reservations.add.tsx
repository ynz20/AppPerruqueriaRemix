import { redirect, useNavigate } from "@remix-run/react";
import ReservationsForm from "~/components/reservations/ReservationsForm";
import Modal from "~/components/utils/Modal";
import { addReservation } from "~/data/reservation.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import { getClients } from "~/data/client.server";
import { getServices } from "~/data/service.server";
import { getWorkers } from "~/data/worker.server";
import { useState } from "react";

export const loader = async ({ request }: { request: Request }) => {
  const token = await getTokenFromRequest(request);

  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const [clientsResponse, servicesResponse, workersResponse] =
    await Promise.all([
      getClients(token),
      getServices(token),
      getWorkers(token),
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
  const [error, setError] = useState<string | null>(null); // Estado para el error
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  function handleError(message: string) {
    setError(message); // Establece el error recibido del servidor
  }

  return (
    <>
      {error && (
        <Modal onClose={() => setError(null)}>
          <div className="text-red-500">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        </Modal>
      )}
      <Modal onClose={closeHandler}>
        <ReservationsForm onError={handleError} />
      </Modal>
    </>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const token = await getTokenFromRequest(request);

  const hour = formData.get("hour") as string;

  console.log("hora", hour);

  if (!hour || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(hour)) {
    throw new Error("Hora no válida. Usa el formato HH:mm");
  }

  const reservationData = {
    client_dni: formData.get("client") as string,
    service_id: parseInt(formData.get("service") as string),
    worker_dni: formData.get("worker") as string,
    hour, // Hora ya validada
    date: new Date(formData.get("day") as string).toISOString().split("T")[0],
    shift_id: 1,
    status: "pending",
  };

  try {
    await addReservation(reservationData, token);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al crear la reserva";
    return { errorMessage };
  }

  return redirect("/reservations");
}
