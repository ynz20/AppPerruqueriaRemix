import { redirect, useNavigate } from "@remix-run/react";
import ReservationsForm from "~/components/reservations/ReservationsForm";
import Modal from "~/components/utils/Modal";
import { addReservation } from "~/data/reservation.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import { getClients } from "~/data/client.server";
import { getServices } from "~/data/service.server";
import { getWorkers } from "~/data/workers.server";

export const loader = async ({ request }: { request: Request }) => {
  const token = await getTokenFromRequest(request);

  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const [clientsResponse, servicesResponse, workersResponse] = await Promise.all([
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
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ReservationsForm />
    </Modal>
  );
}


export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const token = await getTokenFromRequest(request);
  
  const hour = formData.get("hour") as string;

  console.log(hour);
  if (!hour || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(hour)) {
    throw new Error("Hora no válida. Usa el formato HH:mm:ss.");
  }

  const reservationData = {
    client_dni: formData.get("client") as string,
    service_id: parseInt(formData.get("service") as string),
    worker_dni: formData.get("worker") as string,
    hour,
    date: new Date(formData.get("day") as string),
    status: "pending",
  };

  await addReservation(reservationData, token);

  return redirect("/reservations");
}


