import { getTokenFromRequest } from "~/utils/sessionUtils";
import { Client } from "../types/interfaces";
import { json } from "@remix-run/node";

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


export async function getClients(token){
  try {
    const response = await fetch("http://localhost:8085/api/clients", {
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
    throw new Response("Error en carregar els clients. Intenta-ho més tard.", {
      status: 500,
    });
  }
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
