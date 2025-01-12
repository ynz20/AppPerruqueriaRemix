import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import TornList from "~/components/torns/TornList";
import { getShifts } from "~/data/shift.server";
import { Shift } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
    const token = await getTokenFromRequest(request)

    if (!token) {
        throw new Error("Inicia sessió per accedir.");
    }

    // Obtenir la llista de torns des del servidor
    const torns = await getShifts(token);

    return torns;
}

export default function ShiftsPage() {
    const {shifts} = useLoaderData<{shifts: Shift[]}>();
    const location = useLocation();
    return (
        <>
            <Outlet />
            {
                location.pathname == "/history" ? 
                    <main>
                        <section>
                            <h1 className="text-2xl font-bold mb-2 text-black">Gestió de Torns</h1>
                        </section>
                        <div>
                            <h1 className="text-2xl font-bold mb-1 text-black">Llista de Torns</h1>
                            <TornList shifts ={shifts} />
                        </div>
                    </main> 
                : null
            }
        </>
    )
}