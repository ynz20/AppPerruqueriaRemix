import { redirect, useActionData, useNavigate, useParams } from "@remix-run/react";
import Modal from "~/components/utils/Modal";
import ProductsForm from "~/components/products/ProductsForm";
import { deleteProduct, updateProduct } from "~/data/product.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import type { ActionFunction } from "@remix-run/node";
import { ActionData } from "~/types/interfaces";

export default function ProductsEditPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenim l'ID del producte des de la URL
  const actionData = useActionData<ActionData>(); // Obtenim dades d'acció, com errors

  // Funció per tancar el modal i tornar a la pàgina anterior
  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      {/* Passant l'error, si existeix, al formulari per a mostrar-lo */}
      <ProductsForm error={actionData?.error} productId={id} />
    </Modal>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const token = await getTokenFromRequest(request); // Obtenim el token d'autenticació
  const formData = await request.formData(); // Recollim les dades del formulari
  const method = formData.get("_method") || request.method; // Identifiquem el mètode HTTP (PUT, DELETE)

  if (method === "PUT") {
    // Si el mètode és PUT, actualitzem el producte
    const productData = {
      id: formData.get("id"),
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
    };

    const message = await updateProduct(productData, token);
    if (message) {
      const error = message;
      return { error }; // Si hi ha un error, el passem al formulari
    }
  } else if (method === "delete") {
    // Si el mètode és DELETE, eliminem el producte
    const productId = formData.get("id"); // Obtenim l'ID del producte

    const message = await deleteProduct(productId, token);
    if (message) {
      const error = message;
      return { error }; // Si hi ha un error, el passem al formulari
    }
  }

  // Redirigim a la pàgina de productes després de l'acció
  return redirect("/products");
};
