import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Homepage" },
    { name: "description", content: "Homepage with Login and Register options." },
  ];
};

export default function Index() {
  
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-6">
          <h1 className="text-5xl font-extrabold text-red-japan dark:text-yellow-japan">
            Benvingut a la nostra aplicació
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Si us plau, registra&apos;t o inicia sessió per continuar.
          </p>
        </header>
        <div className="flex gap-6">
          <Link 
            to="/register" 
            className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md bg-red-japan hover:bg-yellow-japan">
            Registre
          </Link>
          <Link 
            to="/login" 
            className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md bg-red-japan hover:bg-yellow-japan">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
