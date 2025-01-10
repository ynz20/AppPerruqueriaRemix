import { ActionArgs } from "@remix-run/node";
import { decrementProductStock } from "~/data/product.server"; // Asegúrate de tener esta función implementada en el servidor

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const productId = formData.get("id") as string;
  const token = formData.get("token") as string;

  if (!productId || !token) {
    throw new Response("Product ID o token són necessaris", { status: 400 });
  }

  try {
    // Llamar a la función que decrementa el stock (deberías implementarla en tu archivo server)
    await decrementProductStock(productId, token);
    return new Response("Stock decrementat correctament", { status: 200 });
  } catch (error) {
    return new Response("Error decrementant l'estoc", { status: 500 });
  }
}
