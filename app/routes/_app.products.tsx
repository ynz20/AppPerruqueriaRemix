import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ProductList from "~/components/products/ProductsList";
import { getProducts } from "~/data/product.server";
import { Product } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
  // Obtenir el token de la sessió de l'usuari
  const token = await getTokenFromRequest(request);

  // Llançar un error si l'usuari no està autenticat
  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  // Obtenir la llista de productes utilitzant el token
  const products = await getProducts(token);

  return { products, token };
};

export default function ProductsPage() {
  // Obtenir les dades carregades amb el loader
  const { products, token } = useLoaderData<{
    products: Product[];
    token: string;
  }>();

  return (
    <>
      <head>
        <title>Gestió de Productes</title>
      </head>
      <Outlet />
      <main>
        <section>
          <h1 className="text-2xl font-bold mb-4 text-black-japan">
            Gestió de Productes
          </h1>

          {/* Afegir nous productes */}
          <Link
            to="add"
            className="inline-flex items-center rounded bg-red-japan px-4 py-2 text-white-japan shadow-md hover:text-yellow-japan"
          >
            <span>Afegir Productes</span>
          </Link>
        </section>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-black-japan">
            Llista de Productes
          </h1>

          {/* Llista de productes. Es passa el token com a prop al component ProductList */}
          <ProductList products={products} token={token} />
        </div>
      </main>
    </>
  );
}
