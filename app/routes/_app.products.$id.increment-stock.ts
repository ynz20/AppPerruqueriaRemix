import { ActionArgs } from "@remix-run/node";
import { incrementProductStock } from "~/data/product.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const productId = formData.get("id") as string;
  const token = formData.get("token") as string;

  if (!productId || !token) {
    throw new Response("Product ID o token és necessari", { status: 400 });
  }

  try {
    await incrementProductStock(productId, token);
    return new Response("Stock incrementat correctament", { status: 200 });
  } catch (error) {
    return new Response("Error incrementant l'estoc", { status: 500 });
  }
}
