import { LoaderFunction } from "@remix-run/node";
import { json, Link, Outlet, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import ReservationList from "~/components/reservations/ReservationList";
import { Reservation } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const token = await getTokenFromRequest(request);

    if (!token) {
      throw new Response("Inicia sessió per accedir.", { status: 401 });
    }

    const response = await fetch("http://localhost:8085/api/reservations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('reserves des de la bbdd: ', data);

    return json({ reservations: data.reservations, token });
  } catch (err) {
    throw new Response("Error en carregar les reserves. Intenta-ho més tard.", {
      status: 500,
    });
  }
};

export default function ReservationsPage() {
  const { reservations, token } = useLoaderData<{ reservations: Reservation[]; token: string }>();

  // Estat per gestionar el torn (obert/tancat)
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estat per mostrar feedback visual

// Funció per comprovar l'estat inicial del torn
  const fetchTurnState = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/turn/status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Resposta del backend:", data); // Depuració
      setIsOpen(data.active); // Actualitza l'estat segons la resposta
    } catch (error) {
      console.error("Error en fetchTurnState:", error.message);
    }
  };


  // Funció per alternar l'estat del torn
  const toggleTurn = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:8085/api/turn", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Resposta del toggleTurn:", data); // Depuració
      setIsOpen((prev) => !prev); // Alternar l'estat local
    } catch (error) {
      console.error("Error en toggleTurn:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Comprovar l'estat inicial del torn en carregar el component
  useEffect(() => {
    fetchTurnState();
  }, []);

  // Funció per recarregar les reserves
  const refreshReservations = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/reservations", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en carregar les reserves.");
      }

      const data = await response.json();
      return data.reservations;
    } catch (error) {
      console.error("Error en obtenir les reserves:", error);
    }
  };

  return (
    <>
      <Outlet context={{ token, refreshReservations }} />
      <div>
        <Link
          to="add"
          className="inline-flex items-center rounded bg-red-japan px-4 py-2 text-white-japan shadow-md hover:text-yellow-japan"
        >
          <span className="ml-2">Afegir Reserva</span>
        </Link>
        <h1 className="text-2xl font-bold text-black">Llista de Reserves</h1>
        <button
          onClick={toggleTurn}
          disabled={isLoading}
          className={`mt-4 rounded px-4 py-2 text-white ${
            isLoading
              ? "bg-gray-500"
              : isOpen
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Processant..." : isOpen ? "Tancar Torn" : "Obrir Torn"}
        </button>
        <ReservationList
          reservations={reservations}
          token={token}
          refreshReservations={refreshReservations}
        />
      </div>
    </>
  );
}
