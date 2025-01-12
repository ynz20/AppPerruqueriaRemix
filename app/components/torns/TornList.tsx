import { Link } from "@remix-run/react";
import { ShiftListProps } from "~/types/interfaces";


export default function TornList({ shifts = [] }: ShiftListProps) {
  return (
    <>
      <head>
        <title>Historial de Torn</title>
      </head>
      <div className="space-y-4">
        {shifts.map((shift) => {

          const totalReservations = shift.reservations.reduce((sum, reservation) => {
            return sum + (parseFloat(reservation.service.price.toString()) || 0);
          }, 0);

          return (
            <div
              key={shift.id}
              className="border p-4 rounded shadow-sm bg-black-japan text-white-japan hover:bg-black transition"
            >
              <h3 className="text-lg font-bold">Torn #{shift.id}</h3>
              <p>
                <span className="font-semibold">Data:</span> {new Date(shift.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Hora d&apos;inici:</span>{" "}
                {new Date(shift.start_time).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-semibold">Hora de fi:</span>{" "}
                {shift.end_time ? new Date(shift.end_time).toLocaleTimeString() : "No finalitzat"}
              </p>

              <p className="mt-2 font-semibold text-yellow-japan">
                Total de reserves: <span className="text-green-600">{totalReservations.toFixed(2)} €</span>
              </p>

              <Link
                to={`/history/shift/${shift.id}`}
                className="mt-2 text-sm bg-red-japan text-white px-3 py-1 rounded hover:bg-black-japan inline-block"
              >
                Mostrar Reserves
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
