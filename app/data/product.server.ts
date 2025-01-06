import { json } from "@remix-run/node";

export async function getProducts(token: string){
  try {
    const response = await fetch("http://localhost:8085/api/products", {
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
    throw new Response("Error en carregar els productes. Intenta-ho més tard.", {
      status: 500,
    });
  }
}