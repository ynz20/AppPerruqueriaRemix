import { Link, useFetcher } from "@remix-run/react";
import { Product } from "~/types/interfaces";
import { useState } from "react";

interface ProductListProps {
  products: Product[] | undefined;
  token: string;
}

export default function ProductList({ products, token }: ProductListProps) {
  const [filter, setFilter] = useState<string>(""); 
  const fetcher = useFetcher();

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(filter.toLowerCase()) ||
          product.description.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div className="p-4">
      {/* Filtre */}
      <div className="mb-4">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700"
        >
          Filtrar productes
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Cercar per nom, descripció, etc."
          className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
        />
      </div>
      {/* Llista de productes */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto"
        style={{ maxHeight: "400px" }} 
      >
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-4 mx-1 "
          >
            <h2 className="text-lg font-bold text-white-japan">
              {product.name}
            </h2>
            <p className="text-sm text-white-japan">{product.description}</p>
            <p className="text-sm text-white-japan">
              Preu: {product.price}€
            </p>

            {/* Estoc: Millorat visualment */}
            <div className="flex items-center space-x-3 text-white mt-4">
              <span className="font-semibold">Estoc:</span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full ${
                  product.stock > 20
                    ? "bg-green-japan"
                    : product.stock > 5
                    ? "bg-yellow-japan text-black-japan"
                    : "bg-red-japan"
                }`}
              >
                {product.stock} Unitats
              </span>
            </div>

            {/* Botons per gestionar l'estoc */}
            <div className="flex justify-between items-center gap-3 mt-4">
              <fetcher.Form
                method="post"
                action={`/products/${product.id}/increment-stock`}
                aria-label="Incrementar stock"
              >
                <input type="hidden" name="id" value={product.id.toString()} />
                <input type="hidden" name="token" value={token} />
                <button
                  type="submit"
                  className="bg-green-japan text-white text-lg rounded-full px-4 py-2 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                  aria-label="Incrementar stock de aquest producte"
                >
                  +
                </button>
              </fetcher.Form>
              <fetcher.Form
                method="post"
                action={`/products/${product.id}/decrement-stock`}
                aria-label="Disminuir stock"
              >
                <input type="hidden" name="id" value={product.id.toString()} />
                <input type="hidden" name="token" value={token} />
                <button
                  type="submit"
                  className="bg-red-japan text-white text-lg rounded-full px-4 py-2 hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                  aria-label="Disminuir stock de aquest producte"
                >
                  -
                </button>
              </fetcher.Form>
            </div>

            {/* Accions */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Link
                  to={`../products/${product.id}`}
                  className="text-white-japan hover:text-blue-700 text-sm font-semibold flex items-center space-x-2"
                  aria-label="Editar aquest producte"
                >
                  ✏️ <span>Editar</span>
                </Link>
                <fetcher.Form method="post" action={`/products/${product.id}`}>
                  <input type="hidden" name="_method" value="delete" />
                  <input
                    type="hidden"
                    name="id"
                    value={product.id.toString()}
                  />
                  <button
                    type="submit"
                    className="text-white-japan hover:text-red-500 text-sm font-semibold flex items-center space-x-2"
                    aria-label="Eliminar aquest producte"
                  >
                    🗑️ <span>Eliminar</span>
                  </button>
                </fetcher.Form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
