import { json } from "@remix-run/node";
import { Service } from "~/types/interfaces";

// Funció per afegir un servei
export async function addService(serviceData: Service, token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  try {
    const response = await fetch("http://localhost:8085/api/services", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    });

    // Si la resposta no és OK, mostrem l'error detallat
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en la creació del servei:", errorText);
      throw new Error(errorText || "Error en crear el servei.");
    }

    // Si tot va bé, obtenim la resposta
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en afegir el servei:", error);
    throw new Response("Hi ha hagut un problema en afegir el servei.", { status: 500 });
  }
}

// Funció per obtenir els serveis
export async function getServices(token: string) {
  try {
    const response = await fetch("http://localhost:8085/api/services/pull", {
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
    throw new Error("Error en carregar els serveis. Intenta-ho més tard.");
  }
}

// Funció per actualitzar un servei
export async function updateService(serviceData: Service, token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }
  const response = await fetch(`http://localhost:8085/api/services/${serviceData.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}
