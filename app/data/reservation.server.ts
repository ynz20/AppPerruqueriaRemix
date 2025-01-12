import { ReservationData } from "~/types/interfaces";


//Funcio per afegir reserves a la BBDD
export async function addReservation(reservationData: ReservationData, token: string) {

  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const response = await fetch("http://localhost:8085/api/reservations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  });

  if (!response.ok) {
    let errorMessage = "Error desconegut";
    try {
      const errorResponse = await response.json();
      errorMessage = errorResponse.message || errorResponse.error || "Error desconegut";
    } catch (e) {
      errorMessage = "Error al processar la resposta del servidor";
    }

    throw new Error(errorMessage);
  }
}



