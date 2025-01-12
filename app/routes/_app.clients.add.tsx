import { ActionFunction } from "@remix-run/node";
import { redirect, useActionData, useNavigate } from "@remix-run/react";
import ClientsForm from "../components/clients/ClientsForm";
import Modal from "../components/utils/Modal";
import { addClient } from "../data/client.server";
import { getTokenFromRequest } from "../utils/sessionUtils";
import { ActionData } from "~/types/interfaces";


export default function ClientsAddPage() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  // Funció per tancar el modal i tornar a la pàgina anterior
  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      {/* Formulari per afegir un client */}
      <ClientsForm error={actionData?.error}/>
    </Modal>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const token = await getTokenFromRequest(request);

  if (!token) {
    throw new Error("Inicia sessió per accedir.");
  }

  const clientData = {
    dni: formData.get("dni") as string,
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    telf: formData.get("telf") as string,
    email: formData.get("email") as string,
  };

  const message = await addClient(clientData, token);
  if (message) {
    return { error: message };
  }

  return redirect("/clients?success=Client%20afegit%20correctament");
};

