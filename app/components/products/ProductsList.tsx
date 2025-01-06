import { Link, useFetcher } from "@remix-run/react";
import { Product } from "~/types/interfaces";
import { useState } from "react";

interface ProductListProps {
  products: Product[] | undefined;
}

export default function ProductList({ products }: ProductListProps) {
  const [filter, setFilter] = useState<string>("");
  const fetcher = useFetcher();

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Filtro */}
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
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-4 mx-1 hover:bg-red-japan"
          >
            <h2 className="text-lg font-bold text-white-japan">
              {product.name}
            </h2>
            <p className="text-sm text-white-japan">{product.description}</p>
            <p className="text-sm text-white-japan">Preu: {product.price}€</p>
            <p className="text-sm text-white-japan">
              Estoc: {product.stock} Unitats
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Link
                  to={`../products/${product.id}`}
                  className="text-white-japan hover:text-blue-700 text-sm font-semibold flex items-center space-x-1"
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
                    className="text-white-japan hover:text-red-500 text-sm font-semibold flex items-center space-x-1"
                  >
                    🗑️ <span>Eliminar</span>
                  </button>
                </fetcher.Form>
              </div>
              {/* Botons per gestionar l'estoc */}
              <div className="flex justify-between items-center gap-1">
                <fetcher.Form
                  method="post"
                  action={`/products/${product.id}/decrement-stock`}
                >
                  <input
                    type="hidden"
                    name="id"
                    value={product.id.toString()}
                  />
                  <button
                    type="submit"
                    className="bg-red-500 text-white text-xs rounded px-2 py-1 hover:bg-red-700"
                  >
                    -
                  </button>
                </fetcher.Form>
                <fetcher.Form
                  method="post"
                  action={`/products/${product.id}/increment-stock`}
                >
                  <input
                    type="hidden"
                    name="id"
                    value={product.id.toString()}
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white text-xs rounded px-2 py-1 hover:bg-green-700"
                  >
                    +
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
