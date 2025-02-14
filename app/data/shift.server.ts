//Funcio per obtenir els torns
export async function getShifts(token: string) {
  try {
    const response = await fetch("http://localhost:8085/api/shifts", {
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
    return data;
  } catch (error) {
    throw new Error("Error en carregar els torns. Intenta-ho més tard.");
  }
}

//Funcio per veure si el torn actual esta obert/tencat
export async function revisarTorn(token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const response = await fetch("http://localhost:8085/api/turn/status", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = "Error desconegut";
    try {
      const errorResponse = await response.json();
      errorMessage = errorResponse.message || "Error desconegut";
    } catch (e) {
      errorMessage = "Error al processar la resposta del servidor";
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.active;
}

//Funcio per obrir/tencar torns
export async function alternarTorn(token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const response = await fetch("http://localhost:8085/api/turn", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = "Error desconegut";
    try {
      const errorResponse = await response.json();
      errorMessage = errorResponse.message || "Error desconegut";
    } catch (e) {
      errorMessage = "Error al processar la resposta del servidor";
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.message;
}
