import { redirect, useNavigate } from "@remix-run/react";
import ClientsForm from "../components/clients/ClientsForm";
import Modal from "../components/utils/Modal";
import { addClient } from "../data/client.server";
import { getTokenFromRequest } from "../utils/sessionUtils";

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

export async function action({ request }) {
    const formData = await request.formData();
    const token = await getTokenFromRequest(request);
    const clientData = {
        dni: formData.get('dni') as string,
        name: formData.get('name') as string,
        surname: formData.get('surname') as string,
        telf: formData.get('telf') as string,
        email: formData.get('email') as string,
    };

    await addClient(clientData, token);

    return redirect("/clients");
}