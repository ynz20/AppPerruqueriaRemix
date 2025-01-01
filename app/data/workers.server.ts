import { json } from "@remix-run/node";

export async function getWorkers(token){
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