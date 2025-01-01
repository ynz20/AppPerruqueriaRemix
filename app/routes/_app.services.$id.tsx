import { redirect, useNavigate } from "@remix-run/react";
import ServicesForm from "~/components/services/ServiceForm";
import Modal from "~/components/utils/Modal";
import { updateService } from "~/data/service.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export default function ServicesAddPage() {
    const navigate = useNavigate();
    
    function closeHandler() {
        navigate('..');
    }

    return(
        <Modal onClose={closeHandler}>
           <ServicesForm /> 
        </Modal>
    )
}

export async function action({ request }) {
    const token = await getTokenFromRequest(request) as string;
    if (request.method === 'PUT') {
        const formData = await request.formData();
        const serviceData = {
            id: formData.get('id'),
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price')),
            estimation: formData.get('estimation') as string,
        };
        await updateService(serviceData, token);
    }
    return redirect('/services');
}