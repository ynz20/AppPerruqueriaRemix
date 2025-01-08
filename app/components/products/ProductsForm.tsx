import {
    Form,
    Link,
    useActionData,
    useNavigation,
    useParams,
    useMatches,
  } from "@remix-run/react";
  import React from "react";
  import { Product } from "~/types/interfaces";
  
  interface ValidationErrors {
    [key: string]: string;
  }
  
  const ProductsForm: React.FC = () => {
    const navigation = useNavigation();
    const validationErrors = useActionData<ValidationErrors>();
    const isSubmitting = navigation.state !== "idle";
    const params = useParams();
    const matches = useMatches();
  
    const matchedRoute = matches.find(
      (match) => match.id === "routes/_app.products"
    );
  
    const products = matchedRoute?.data?.products as Product[] | undefined;
  
    const productData = products?.find(({ id }) => id === Number(params.id)) || {
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
    };
  
    return (
      <Form
        method={productData.id ? "put" : "post"}
        action={productData.id ? `/products/${productData.id}` : "/products/add"}
        className="flex flex-col rounded-lg bg-white-japan p-6 shadow-lg border border-gray-200"
        id="products-form"
      >
        {productData.id && (
          <input type="hidden" name="id" value={productData.id} />
        )}
        <h1 className="text-2xl font-bold text-red-japan mb-6">
          {productData.id ? "Edita Producte" : "Afegeix Producte"}
        </h1>
  
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Nom del producte
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={productData.name}
            maxLength={100}
            className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            placeholder="Nom del producte"
          />
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Descripció
          </label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={productData.description}
            maxLength={255}
            rows={3}
            className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            placeholder="Escriu una descripció del producte"
          />
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Preu
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            defaultValue={productData.price}
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            placeholder="Exemple: 50.00"
          />
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Estoc
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            required
            defaultValue={productData.stock}
            min="0"
            className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            placeholder="Exemple: 100"
          />
        </div>
  
        {validationErrors && (
          <ul className="mb-4 list-inside list-disc text-sm text-red-500">
            {Object.values(validationErrors).map((error: string) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
  
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-red-japan px-6 py-3 text-sm font-medium text-white hover:bg-black-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
          >
            {isSubmitting ? "Guardant..." : "Desar"}
          </button>
          <Link
            to=".."
            className="text-sm font-medium text-gray-500 hover:text-red-japan focus:outline-none focus:underline"
          >
            Cancel·la
          </Link>
        </div>
      </Form>
    );
  };
  
  export default ProductsForm;
  