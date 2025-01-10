import { json } from "@remix-run/node";

export async function getWorkers(token: string) {
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
        console.log(data);
        return json(data);
    } catch (error) {
        throw new Response("Error en carregar els treballadors. Intenta-ho més tard.", {
            status: 500,
        });
    }
}

export async function updateWorker(workerData: { dni: string, name: string, surname: string, nick: string, telf: string, email: string }, token: string) {
    try {
        const response = await fetch(`http://localhost:8085/api/users/${workerData.dni}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: workerData.name,
                surname: workerData.surname,
                nick: workerData.nick,
                telf: workerData.telf,
                email: workerData.email,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return json(data);
    } catch (error) {
        throw new Response("Error en actualitzar les dades del treballador. Intenta-ho més tard.", {
            status: 500,
        });
    }
}
