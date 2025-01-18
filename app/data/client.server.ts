import { Client } from "../types/interfaces";
import { json } from "@remix-run/node";

export async function addClient(clientData: Client, token: string) {
  // Enviar una petició POST al servidor per afegir un nou client
  const response = await fetch("http://localhost:8085/api/clients", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  // Comprovar si la resposta del servidor no és correcta
  if (!response.ok) {
    // Llançar un error amb el codi i el text de l'estat de la resposta
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  // Convertir la resposta del servidor a JSON
  const data = await response.json();

  // Retornar un missatge d'error específic si hi ha problemes amb les dades del client
  if (data.id == 1 || data.id == 2 || data.id == 3) {
    return data.message; // Missatge d'error proporcionat pel servidor
  }
}


export async function getClients(token: string) {
  try {
    // Enviar una petició GET al servidor per obtenir la llista de clients
    const response = await fetch("http://localhost:8085/api/clients", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Comprovar si la resposta no és correcta i llançar un error amb el codi d'estat
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Convertir la resposta a JSON i retornar-la
    const data = await response.json();
    return json(data);
  } catch (err) {
    // Llançar un error genèric si no es poden carregar els clients
    throw new Error("Error en carregar els clients. Intenta-ho més tard.");
  }
}


export async function updateClient(clientData: Client, token: string) {
  // Enviar una petició PUT al servidor per actualitzar les dades d'un client
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

  // Comprovar si la resposta no és correcta i llançar un error amb el codi d'estat
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

    // Convertir la resposta del servidor a JSON
    const data = await response.json();

    // Retornar un missatge d'error específic si hi ha problemes amb les dades del client
    if (data.id == 1 || data.id == 2 || data.id == 3) {
      return data.message; // Missatge d'error proporcionat pel servidor
    }
}


export async function deleteClient(dni: string, token: string) {
  // Enviar una petició DELETE al servidor per eliminar un client específic
  const response = await fetch(`http://localhost:8085/api/clients/${dni}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Comprovar si la resposta no és correcta i llançar un error amb el codi d'estat
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}


export async function getReservationsByDNI(token: string, dni: string) {
  try {
    // Enviar una petició GET al servidor per obtenir les reserves d'un client específic
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

    // Llançar un error si la resposta no és satisfactòria
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Convertir la resposta del servidor a JSON
    const data = await response.json();
    // Retornar un array buit si no hi ha reserves
    if (!data.reservations) {
      return { reservations: [], treballador: data.treballador };
    }

    // Retornar les reserves del client
    return { reservations: data.reservations, treballador: data.treballador };
  } catch (err) {
    // Gestionar errors i retornar una resposta d'error genèrica
    throw new Response("Error al carregar les reserves.", {
      status: 500,
    });
  }
}

