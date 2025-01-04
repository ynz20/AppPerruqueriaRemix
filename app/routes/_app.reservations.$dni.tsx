import { json, LoaderFunction } from "@remix-run/node";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ params, request }) => {
  const token = await getTokenFromRequest(request);

  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const {dni} = params;

  try {
    const response = await fetch(`http://localhost:8085/api/reservations/client/${dni}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const reservations = await response.json();
      console.log(reservations);
      return json({ reservations });

  } catch (error) {
    console.error(error);
    throw new Response("Error al carregar les reserves del client.", { status: 500 });
  }
}