import { Link, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { ProductListProps } from "~/types/interfaces";

export default function ProductList({ products, token }: ProductListProps) {
  const fetcher = useFetcher();
  const [filter, setFilter] = useState<string>(""); // Filtre
  const [currentPage, setCurrentPage] = useState<number>(1); // Pàgina actual
  const [itemsPerPage, setItemsPerPage] = useState<number>(4); // Elements per pàgina (dinàmics)

  // Actualitzar el nombre d'elements per pàgina segons la mida de la pantalla
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Pantalles petites: 1 producte per pàgina
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3); // Pantalles mitjanes: 3 productes per pàgina
      } else {
        setItemsPerPage(4); // Pantalles grans: 4 productes per pàgina
      }
    };

    updateItemsPerPage(); // Executar quan es munta el component
    window.addEventListener("resize", updateItemsPerPage); // Escoltar canvis de mida de pantalla

    return () => window.removeEventListener("resize", updateItemsPerPage); // Netejar esdeveniment en desmuntar
  }, []);

  // Filtrar productes segons el terme del filtre
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(filter.toLowerCase()) ||
          product.description.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  // Calcular el nombre total de pàgines
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Productes per a la pàgina actual
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Funcions de navegació
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
          onChange={(e) => setFilter(e.target.value)} // Actualitzar el filtre
          placeholder="Cercar per nom, descripció, etc."
          className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
        />
      </div>

      {/* Llista de productes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-4 mx-1"
          >
            <h2 className="text-lg font-bold text-white-japan">{product.name}</h2>
            <p className="text-sm text-white-japan">{product.description}</p>
            <p className="text-sm text-white-japan">Preu: {product.price}€</p>

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

            {/* Botons per incrementar o disminuir l'estoc */}
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
                >
                  -
                </button>
              </fetcher.Form>
            </div>

            {/* Accions d'editar i eliminar */}
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
                  >
                    🗑️ <span>Eliminar</span>
                  </button>
                </fetcher.Form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegació de pàgines */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-japan hover:bg-black-japan"
          }`}
        >
          Anterior
        </button>
        <span className="text-black">
          Pàgina {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === totalPages
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-japan hover:bg-black-japan"
          }`}
        >
          Següent
        </button>
      </div>
    </div>
  );
}
