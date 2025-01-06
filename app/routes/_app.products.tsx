import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ProductList from "~/components/products/ProductsList";
import { getProducts } from "~/data/product.server";
import { Product } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
    const token = await getTokenFromRequest(request);
  
    if (!token) {
      throw new Response("Inicia sessió per accedir.", { status: 401 });
    }

    const products = await getProducts(token);
    return products;
}


export default function ProductsPage() {
    const { products } = useLoaderData<{ products: Product[] }>();
    return (
      <>
        <Outlet />
        <main>
          <section>
            <h1 className="text-2xl font-bold mb-4 text-black">
              Gestió de Productes
            </h1>
            <Link
              to="add"
              className="inline-flex items-center rounded bg-red-japan px-4 py-2 text-white-japan shadow-md hover:text-yellow-japan"
            >
              <span>Afegir Productes</span>
            </Link>
          </section>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-black">
              Llista de Productes
            </h1>
            <ProductList products={products} />
          </div>
        </main>
      </>
    );
  }