import { ReservationData } from "~/types/interfaces";

export async function addReservation(
  reservationData: ReservationData,
  token: string
) {
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
    // Intentamos obtener un mensaje de error desde el cuerpo de la respuesta
    let errorMessage = "Error desconocido";
    try {
      const errorResponse = await response.json();
      errorMessage =
        errorResponse.message || errorResponse.error || "Error desconocido";
    } catch (e) {
      errorMessage = "Error al procesar la respuesta del servidor";
    }

    // Lanzamos el error con el mensaje específico del servidor
    throw new Error(errorMessage);
  }
}


