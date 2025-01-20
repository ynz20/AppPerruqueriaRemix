import { LoaderFunction } from "@remix-run/node";
import { json, Link, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import ReservationList from "~/components/reservations/ReservationList";
import { Reservation } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";
import { ToastContainer, toast } from "react-toastify";

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
    return json({ reservations: data.reservations, token });
  } catch (err) {
    throw new Response("Error en carregar les reserves. Intenta-ho més tard.", {
      status: 500,
    });
  }
};

export default function ReservationsPage() {
  
  const { reservations, token } = useLoaderData<{
    reservations: Reservation[];
    token: string;
  }>();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const successMessage = searchParams.get("success");
    if (successMessage) {
      toast.success(successMessage);
      searchParams.delete("success");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);
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
      setIsOpen(data.active);
    } catch (error) {
      console.error("Error en fetchTurnState:", error.message);
    }
  };

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

      setIsOpen((prev) => !prev);
    } catch (error) {
      console.error("Error en toggleTurn:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnState();
  }, []);

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
    <ToastContainer />
      <head>
        <title>Gestió de Reserves</title>
      </head>
      <Outlet context={{ token, refreshReservations }} />
      <div>
        <h1 className="text-2xl font-bold text-black">Llista de Reserves</h1>
        <div className="flex justify-between items-center gap-4 mt-4">
          <Link
            to="add"
            className="flex items-center justify-center rounded bg-red-japan px-4 py-2 text-white shadow-md hover:bg-red-700 h-10 text-sm sm:text-base whitespace-nowrap"
          >
            <span>Afegir Reserva</span>
          </Link>

          <div className="flex items-center gap-2">
            {!isOpen && (
              <span className="text-gray-700 text-xs sm:text-sm">Obre un torn per tractar amb les reserves</span>
            )}
            <button
              onClick={toggleTurn}
              disabled={isLoading}
              className={`rounded px-4 py-2 text-white h-10 text-sm sm:text-base whitespace-nowrap ${
                isLoading
                  ? "bg-gray-500"
                  : isOpen
                  ? "bg-red-japan hover:bg-red-700"
                  : "bg-black-japan hover:bg-blue-700"
              }`}
            >
              {isLoading
                ? "Processant..."
                : isOpen
                ? "Tancar Torn"
                : "Obrir Torn"}
            </button>
          </div>
        </div>

        <ReservationList
          reservations={reservations}
          token={token}
          refreshReservations={refreshReservations}
        />
      </div>
    </>
  );
}
