import { json } from "@remix-run/node";
import { Product } from "~/types/interfaces";

const BASE_URL = "http://localhost:8085/api/products";

export async function addProduct(productData: Product, token: string) {
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}

export async function getProducts(token: string) {
  try {
    const response = await fetch(`${BASE_URL}`, {
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
    return data.products;
  } catch (err) {
    throw new Response(
      "Error en carregar els productes. Intenta-ho més tard.",
      {
        status: 500,
      }
    );
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
