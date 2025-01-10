import { redirect, useNavigate } from "@remix-run/react";
import Modal from "../components/utils/Modal";
import ClientsForm from "~/components/clients/ClientsForm";
import { deleteClient, getReservationsByDNI, updateClient } from "~/data/client.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import type { ActionFunction } from "@remix-run/node";


export default function ClientsAddPage() {
    const navigate = useNavigate();
    
    function closeHandler() {
        navigate('..');
    }

    return(
        <Modal onClose={closeHandler}>
           <ClientsForm /> 
        </Modal>
    )
}



export const action: ActionFunction = async ({ request }) => {
    const token = await getTokenFromRequest(request);
    const formData = await request.formData();
    const method = formData.get("_method") || request.method;
  
    if (method === "PUT") {
      const clientData = {
        name: formData.get("name"),
        surname: formData.get("surname"),
        dni: formData.get("dni"),
        telf: formData.get("telf"),
        email: formData.get("email"),
      };
      await updateClient(clientData, token);
    } else if (method === "delete") {
      const dni = formData.get("dni");
      const reservesClient = await getReservationsByDNI(token, dni);
      if (!reservesClient.reservations){
        await deleteClient(dni, token);
      } else {
        throw new Error("No es pot eliminar un client amb reserves actives.");
      }
    }
  
    return redirect("/clients");
  }
  
