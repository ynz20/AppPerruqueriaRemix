import { json } from "@remix-run/node";
import { User } from "~/types/interfaces";

export async function login(data: { email?: string; nick?: string; password: string }) {
  try {
    // Enviar petició POST al servidor per realitzar el login
    const response = await fetch("http://localhost:8085/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Convertir la resposta del servidor a JSON
    const result = await response.json();

    if (!response.ok) {
      // Llançar un error si la resposta no és l'esperada
      throw new Error(result.message || "Error en el inici de sessió.");
    }

    // Retornar les dades d'èxit si la resposta és l'esperada
    return result;
  } catch (error: unknown) {
    // Capturar i gestionar errors
    const errorMessage = (error instanceof Error)
      ? error.message
      : "Error del servidor. Torna-ho a intentar més tard.";
    // Llançar un nou error amb el missatge capturat o un genèric
    throw new Error(errorMessage);
  }
}

export async function register(data: User) {
  try {
    // Enviar una petició POST al servidor per registrar l'usuari
    const response = await fetch("http://localhost:8085/api/register", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Comprovar si la resposta del servidor no és correcta
    if (!response.ok) {
      const error = await response.json();
      return json(
        { error: error.message || "Error en el registre." }, // Retornar el missatge d'error
        { status: response.status } // Retornar el codi d'estat de la resposta
      );
    }

    // Si tot és correcte, retornar la resposta del servidor en format JSON
    return response.json();
  } catch (error) {
    return json(
      { error: "Error del servidor. Torna-ho a intentar més tard." }, 
      { status: 500 }
    );
  }
}



export async function getWorkers(token: string) {
  try {
    const response = await fetch("http://localhost:8085/api/users", {
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
  } catch (error) {
    throw new Response(
      "Error en carregar els treballadors. Intenta-ho més tard.",
      {
        status: 500,
      }
    );
  }
}

export async function getWorkersnotAdmin(token: string) {
  try {
    const response = await fetch("http://localhost:8085/api/users/pull", {
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
  } catch (error) {
    throw new Response(
      "Error en carregar els treballadors. Intenta-ho més tard.",
      {
        status: 500,
      }
    );
  }
}

export async function updateWorker(
  workerData: {
    dni: string;
    name: string;
    surname: string;
    nick: string;
    telf: string;
    email: string;
  },
  token: string
) {
  try {
    const response = await fetch(
      `http://localhost:8085/api/users/${workerData.dni}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: workerData.name,
          surname: workerData.surname,
          nick: workerData.nick,
          telf: workerData.telf,
          email: workerData.email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    throw new Response(
      "Error en actualitzar les dades del treballador. Intenta-ho més tard.",
      {
        status: 500,
      }
    );
  }
}

export async function getWorkerById(token: string, userId: string) {
  const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw json(
      { error: "Error carregant el perfil." },
      { status: response.status }
    );
  }

  const userData = await response.json();
  return json(userData);
}
// Peticio per actualizar cualsevol usuari
export async function updateUser(
  updatedData: User,
  DNI: string,
  token: string
) {
  const response = await fetch(`http://localhost:8085/api/users/${DNI}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();;
    throw json(errorData, { status: response.status });
  }

  return response.json();
}

export async function getReservationsByDNI(token: string, dni: string) {
  try {
    // Enviar una petició GET al servidor per obtenir les reserves d'un client específic
    const response = await fetch(
      `http://localhost:8085/api/reservations/worker/${dni}`, 
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
      return { reservations: [] };
    }

    // Retornar les reserves del client
    return { reservations: data.reservations };
  } catch (err) {
    // Gestionar errors i retornar una resposta d'error genèrica
    throw new Response("Error al carregar les reserves.", {
      status: 500,
    });
  }
}