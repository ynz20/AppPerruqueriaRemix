import { Client } from "../types/interfaces";

export async function addClient(clientData: Client, token) {
    if (!token) {
      throw new Response("Inicia sessió per accedir.", { status: 401 });
    }
    const response = await fetch("http://localhost:8085/api/clients", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
}

export async function updateClient(clientData: Client, token) {
    if (!token) {
      throw new Response("Inicia sessió per accedir.", { status: 401 });
    }
    const response = await fetch(`http://localhost:8085/api/clients/${clientData.dni}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
}
