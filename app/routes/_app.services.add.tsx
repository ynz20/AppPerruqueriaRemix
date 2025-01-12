import { redirect, useNavigate } from "@remix-run/react";
import ServicesForm from "~/components/services/ServiceForm";
import Modal from "~/components/utils/Modal";
import { addService } from "~/data/service.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export default function ServicesAddPage() {
    const navigate = useNavigate();
    
    function closeHandler() {
        navigate("..");
    }

    return (
        <Modal onClose={closeHandler}>
           <ServicesForm/> 
        </Modal>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const token = await getTokenFromRequest(request) as string;

    const serviceData = {
        id: 0,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        estimation: formData.get("estimation") as string,
    };

    await addService(serviceData, token);

    // Redirigir amb un paràmetre d'èxit
    return redirect("/services?success=Servei%20afegit%20correctament");
}
