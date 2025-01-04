import { LoaderFunction } from "@remix-run/node";
import { json, Link, Outlet, useLoaderData } from "@remix-run/react";
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return json({ reservations: data.reservations, token });
  } catch (err) {
    throw new Response("Error en carregar les reserves. Intenta-ho més tard.", {
      status: 500,
    });
  }
};

export default function ReservationsPage() {
  const { reservations, token } = useLoaderData<{ reservations: Reservation[];
  token: string }
    >();
  return (
    <>
      <Outlet context={{ token}} />
      <div className="">
        <Link
          to="add"
          className="inline-flex items-center rounded bg-red-japan px-4 py-2 text-white-japan shadow-md hover:text-yellow-japan"
        >
          <span className="ml-2">Afegir Reserva</span>
        </Link>
        <h1 className="text-2xl font-bold  text-black">Llista de Reserves</h1>
        <ReservationList reservations={reservations} />
      </div>
    </>
  );
}
