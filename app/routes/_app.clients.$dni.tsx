import { redirect, useActionData, useNavigate } from "@remix-run/react";
import Modal from "../components/utils/Modal";
import ClientsForm from "~/components/clients/ClientsForm";
import { deleteClient, getReservationsByDNI, updateClient } from "~/data/client.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import type { ActionFunction } from "@remix-run/node";
import { ActionData } from "~/types/interfaces";

export default function ClientsAddPage() {
  const navigate = useNavigate();
  const actionData = useActionData<ActionData>();
  // Funció per tancar el modal i tornar a la pàgina anterior
  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      {/* Formulari per afegir o modificar clients */}
      <ClientsForm error={actionData?.error}/>
    </Modal>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const token = await getTokenFromRequest(request); // Obtenir el token d'autenticació
  const formData = await request.formData(); // Recollir les dades enviades pel formulari
  const method = formData.get("_method") || request.method; // Identificar el mètode HTTP utilitzat

  if (method === "PUT") {
    // Actualitzar les dades d'un client
    const clientData = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      dni: formData.get("dni"),
      telf: formData.get("telf"),
      email: formData.get("email"),
    };
    const message = await updateClient(clientData, token);
    if (message){
      const error = message;
      return {error};
    }
  } else if (method === "delete") {
    // Eliminar un client
    const dni = formData.get("dni"); // Obtenir el DNI del client a eliminar

    // Obtenir les reserves associades al client
    const reservesClient = await getReservationsByDNI(token, dni);


    if (reservesClient.reservations && reservesClient.reservations.length === 0) {
      // Eliminar el client si no té reserves actives
      await deleteClient(dni, token);
    } else {
      // Llançar un error si el client té reserves actives
      throw new Error("No es pot eliminar un client amb reserves actives.");
    }
  }

  // Redirigir a la pàgina de llista de clients després de l'operació
  return redirect("/clients");
};
