import { ReservationData } from "~/types/interfaces";


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

export async function revisarTorn(token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const response = await fetch("http://localhost:8085/api/turn/status", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = "Error desconegut";
    try {
      const errorResponse = await response.json();
      errorMessage = errorResponse.message || "Error desconegut";

    } catch (e) {
      errorMessage = "Error al processar la resposta del servidor";
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.active;
}


export async function alternarTorn(token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const response = await fetch("http://localhost:8085/api/turn", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = "Error desconegut";
    try {
      const errorResponse = await response.json();
      errorMessage = errorResponse.message || "Error desconegut";
    } catch (e) {
      errorMessage = "Error al processar la resposta del servidor";
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.message;
}

