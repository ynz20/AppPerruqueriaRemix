import { useNavigate } from "@remix-run/react";
import { redirect } from "react-router";
import ProductsForm from "~/components/products/ProductsForm";
import Modal from "~/components/utils/Modal";
import { updateProduct } from "~/data/product.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export default function ProductsAddPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ProductsForm />
    </Modal>
  );
}

export async function action({ request }) {
  const token = (await getTokenFromRequest(request)) as string;

  if (request.method === "PUT") {
    const formData = await request.formData();
    const productData = {
      id: formData.get("id"),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price"),
      stock: formData.get("stock"),
    };
    await updateProduct(productData, token);
  }

  return redirect("/products");
}
