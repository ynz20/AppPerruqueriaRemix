import { json } from "@remix-run/node";
import { User } from "~/types/interfaces";

export async function getWorkers(token:string){
    try {
        const response = await fetch("http://localhost:8085/api/users", {
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
    } catch (error) {
        throw new Response("Error en carregar els treballadors. Intenta-ho més tard.", {
            status: 500,
    });
    }
}

export async function getWorkerById(token: string, userId: string){
const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw json({ error: "Error carregant el perfil." }, { status: response.status });
  }

  const userData = await response.json();
  return json(userData);
}

export async function updateUser(updatedData: User, userId: string, token: string) {
  const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw json(errorData, { status: response.status });
  }

  return response.json();
}