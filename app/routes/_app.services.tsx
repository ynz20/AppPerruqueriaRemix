import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import ServiceList from "~/components/services/ServiceList";
import { Service } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
    try {
        const token = await getTokenFromRequest(request);
    
        if (!token) {
        throw new Response("Inicia sessió per accedir.", { status: 401 });
        }
    
        const response = await fetch("http://localhost:8085/api/services", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });
    
        if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    
        const data = await response.json();
        return json(data);
    } catch (err) {
        throw new Response("Error en carregar els serveis. Intenta-ho més tard.", {
        status: 500,
        });
    }
};

export default function ServicesPage() {
    const { services } = useLoaderData<{ services: Service[] }>();
    console.log(services);
    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Llista de Serveis</h1>
        <ServiceList services={services} />
        </div>
    );
}