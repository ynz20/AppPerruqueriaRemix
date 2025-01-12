import { ActionFunction } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import ProductsForm from "../components/products/ProductsForm";
import Modal from "../components/utils/Modal";
import { addProduct } from "../data/product.server";
import { getTokenFromRequest } from "../utils/sessionUtils";

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const token = await getTokenFromRequest(request);

  const productData = {
    id: 0,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price"),
    stock: formData.get("stock"),
  };

  await addProduct(productData, token);

  return redirect("/products");
};
