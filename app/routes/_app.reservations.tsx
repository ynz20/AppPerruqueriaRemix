import { LoaderFunction } from "@remix-run/node";
import { json, Link, Outlet, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import ReservationList from "~/components/reservations/ReservationList";
import { Reservation } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Obtenir el token de la sessió de l'usuari
    const token = await getTokenFromRequest(request);

    // Llançar un error si l'usuari no està autenticat
    if (!token) {
      throw new Response("Inicia sessió per accedir.", { status: 401 });
    }

    // Enviar una petició GET per obtenir les reserves
    const response = await fetch("http://localhost:8085/api/reservations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Token d'autenticació
        "Content-Type": "application/json", // Especificar el format de la resposta
      },
    });

    // Comprovar si la resposta no és correcta
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Retornar les reserves i el token al frontend
    const data = await response.json();
    return json({ reservations: data.reservations, token });
  } catch (err) {
    // Retornar un error genèric si hi ha problemes en carregar les reserves
    throw new Response("Error en carregar les reserves. Intenta-ho més tard.", {
      status: 500,
    });
  }
};

export default function ReservationsPage() {
  const { reservations, token } = useLoaderData<{ reservations: Reservation[]; token: string }>();

  // Estat per gestionar si el torn està obert o tancat
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estat per mostrar feedback durant operacions

  // Funció per comprovar l'estat inicial del torn
  const fetchTurnState = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/turn/status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Token per autenticar la petició
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Actualitzar l'estat del torn segons la resposta
      const data = await response.json();
      setIsOpen(data.active);
    } catch (error) {
      console.error("Error en fetchTurnState:", error.message);
    }
  };

  // Funció per alternar l'estat del torn (obrir/tancar)
  const toggleTurn = async () => {
    setIsLoading(true); // Mostrar estat de càrrega durant l'operació

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

      setIsOpen((prev) => !prev); // Alternar l'estat local del torn
    } catch (error) {
      console.error("Error en toggleTurn:", error.message);
    } finally {
      setIsLoading(false); // Amagar l'estat de càrrega
    }
  };

  // Comprovar l'estat inicial del torn quan es carrega el component
  useEffect(() => {
    fetchTurnState();
  }, []);

  // Funció per recarregar la llista de reserves
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
        {/* Nova Reserva */}
        <Link
          to="add"
          className="inline-flex items-center rounded bg-red-japan px-4 py-2 text-white-japan shadow-md hover:text-yellow-japan"
        >
          <span className="ml-2">Afegir Reserva</span>
        </Link>

        <h1 className="text-2xl font-bold text-black">Llista de Reserves</h1>
        <button
          onClick={toggleTurn}
          disabled={isLoading} // Deshabilitar el botó mentre es processa
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
