import { Link } from "@remix-run/react";
import { ShiftListProps } from "~/types/interfaces";

export default function TornList({ shifts = [] }: ShiftListProps) {
    return (
        <div className="space-y-4">
            {shifts.map((shift) => {
                // Calcular el total de todas las reservas de este turno
                const totalReservations = shift.reservations.reduce((sum, reservation) => {
                    return sum + (parseFloat(reservation.service.price.toString()) || 0);
                }, 0);

                console.log(`Total per Torn #${shift.id}: ${totalReservations.toFixed(2)}`);

                return (
                    <div
                        key={shift.id}
                        className="border p-4 rounded shadow-sm bg-gray-100 text-black hover:bg-gray-200 transition"
                    >
                        <h3 className="text-lg font-bold">Torn #{shift.id}</h3>
                        <p><span className="font-semibold">Data:</span> {new Date(shift.date).toLocaleDateString()}</p>
                        <p>
                            <span className="font-semibold">Hora d&apos;inici:</span>{" "}
                            {new Date(shift.start_time).toLocaleTimeString()}
                        </p>
                        <p>
                            <span className="font-semibold">Hora de fi:</span>{" "}
                            {shift.end_time ? new Date(shift.end_time).toLocaleTimeString() : "No finalitzat"}
                        </p>

                        {/* Mostrar el total de todas las reservas */}
                        <p className="mt-2 font-semibold text-black">
                            Total de reserves: <span className="text-green-600">{totalReservations.toFixed(2)} €</span>
                        </p>

                        <Link
                            to={`/history/shift/${shift.id}`}
                            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 inline-block"
                        >
                            Mostrar Reserves
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
