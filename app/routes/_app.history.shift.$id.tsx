import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TornsReservations from "~/components/torns/TornsReservations";
import { getShifts } from "~/data/shift.server";
import { Shift } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request, params }) => {
    const token = await getTokenFromRequest(request);

    if (!token) {
        throw new Error("Inicia sessió per accedir.");
    }

    const { id } = params;

    if (!id) {
        throw new Response("ID de torn no proporcionat", { status: 400 });
    }

    const data = await getShifts(token);


    const shifts = data.shifts;

    if (!shifts) {
        throw new Response("No s'han trobat torns.", { status: 404 });
    }

    const shift = shifts.find((shift: Shift) => shift.id === parseInt(id, 10));

    if (!shift) {
        throw new Response("Torn no trobat", { status: 404 });
    }

    return json({ reservations: shift.reservations });
};

export default function ShiftReservationsPage() {
    const { reservations } = useLoaderData<Shift >();
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-black-japan">Reserves del Torn</h2>
            <TornsReservations reservations={reservations} />
        </div>
    );
}
