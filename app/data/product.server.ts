import { json } from "@remix-run/node";
import { Product } from "~/types/interfaces";

const BASE_URL = "http://localhost:8085/api/products";

export async function addProduct(productData: Product, token: string) {
  // Comprovar si no hi ha token i llançar un error d'autenticació
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  // Enviar una petició POST al servidor per afegir un nou producte
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  // Llançar un error si la resposta no és satisfactòria
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}


export async function getProducts(token: string) {
  try {
    // Enviar una petició GET al servidor per obtenir la llista de productes
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Llançar un error si la resposta del servidor no és satisfactòria
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Convertir la resposta del servidor a JSON i retornar els productes
    const data = await response.json();
    return data.products; // Retornar només la llista de productes
  } catch (err) {
    throw new Error("Error en carregar els productes. Intenta-ho més tard.");
  }
}


export async function updateProduct(productData: Product, token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }
  const response = await fetch(`${BASE_URL}/${productData.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

    // Comprovar si la resposta del servidor no és correcta
    if (!response.ok) {
      // Llançar un error amb el codi i el text de l'estat de la resposta
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
}

// Funció per incrementar l'estoc d'un producte
export async function incrementProductStock(productId: string, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}/increment-stock`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return json({ message: "Stock incrementat correctament." });
  } catch (err) {
    throw new Response("Error en incrementar l'estoc. Intenta-ho més tard.", {
      status: 500,
    });
  }
}

// Funció per disminuir l'estoc d'un producte
export async function decrementProductStock(productId: string, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}/decrement-stock`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return json({ message: "Stock disminuït correctament." });
  } catch (err) {
    throw new Response("Error en disminuir l'estoc. Intenta-ho més tard.", {
      status: 500,
    });
  }
}
