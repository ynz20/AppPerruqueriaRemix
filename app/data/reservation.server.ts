import {  ReservationData } from "~/types/interfaces";

export async function addReservation(reservationData: ReservationData, token) {
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
}