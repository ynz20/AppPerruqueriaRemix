import { Client } from "../types/interfaces";
import { json } from "@remix-run/node";

export async function addClient(clientData: Client, token: string) {
  const response = await fetch("http://localhost:8085/api/clients", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}

export async function getClients(token: string) {
  try {
    const response = await fetch("http://localhost:8085/api/clients", {
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
    return json(data);
  } catch (err) {
    throw new Error("Error en carregar els clients. Intenta-ho més tard.");
  }
}

export async function updateClient(clientData: Client, token: string) {
  const response = await fetch(
    `http://localhost:8085/api/clients/${clientData.dni}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}

export async function deleteClient(dni: string, token: string) {
  const response = await fetch(`http://localhost:8085/api/clients/${dni}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}

export async function getReservationsByDNI(token: string, dni: string) {
  try {
    const response = await fetch(
      `http://localhost:8085/api/reservations/client/${dni}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.reservations) {
      return ({ reservations: [] });
    }

    return ({ reservations: data.reservations });
  } catch (err) {
    throw new Response("Error al carregar les reserves.", {
      status: 500,
    });
  }
}
