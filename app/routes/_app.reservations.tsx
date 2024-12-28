import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import ReservationList from "~/components/reservations/ReservationList";
import { Reservation } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
    try {
        const token = await getTokenFromRequest(request);
    
        if (!token) {
        throw new Response("Inicia sessió per accedir.", { status: 401 });
        }
    
        const response = await fetch("http://localhost:8085/api/reservations", {
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
        throw new Response("Error en carregar les reserves. Intenta-ho més tard.", {
        status: 500,
        });
    }
}

export default function ReservationsPage() {
    const { reservations } = useLoaderData<{ reservations: Reservation[] }>();
    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Llista de Reserves</h1>
        <ReservationList reservations={reservations} />
        </div>
    );
}