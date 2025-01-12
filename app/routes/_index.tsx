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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {/* Imatge centrada amb menys espai respecte al títol */}
      <img 
        src="/logo_App.png" 
        alt="Logo de l'aplicació" 
        className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-contain mb-4" 
      />
      
      {/* Títol centrat al mig de la pàgina */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-red-japan dark:text-yellow-japan mb-2 text-center">
        Benvingut a la nostra aplicació
      </h1>
      
      {/* Text explicatiu amb menys espai */}
      <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
        Si us plau, registra&apos;t o inicia sessió per continuar.
      </p>
      
      {/* Botons de registre i login */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          to="/register" 
          className="px-6 py-3 text-sm sm:text-base lg:text-lg font-semibold text-white rounded-lg shadow-md bg-red-japan hover:bg-yellow-japan">
          Registre
        </Link>
        <Link 
          to="/login" 
          className="px-6 py-3 text-sm sm:text-base lg:text-lg font-semibold text-white rounded-lg shadow-md bg-red-japan hover:bg-yellow-japan">
          Login
        </Link>
      </div>
    </div>
  );
}
