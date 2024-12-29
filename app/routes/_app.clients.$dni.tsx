import { redirect, useNavigate } from "@remix-run/react";
import Modal from "../components/utils/Modal";
import ClientsForm from "~/components/clients/ClientsForm";
import { updateClient } from "~/data/client.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";


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
    const token = await getTokenFromRequest(request);
    if (request.method === 'PUT') {
        const formData = await request.formData();
        const clientData = {
            name: formData.get('name'),
            surname: formData.get('surname'),
            dni: formData.get('dni'),
            telf: formData.get('telf'),
            email: formData.get('email'),
        };
        await updateClient(clientData, token);
    }
    return redirect('/clients');
}
