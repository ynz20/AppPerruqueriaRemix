export interface Client {
  dni: string;       // DNI del client
  name: string;      // Nom del client
  surname: string;   // Cognom del client
  telf: string;      // Telèfon del client
  email: string;     // Correu electrònic del client
}

export interface Service {
  id: number;        // Identificador del servei
  name: string;      // Nom del servei
  description: string; // Descripció del servei
  price: number;     // Preu del servei
}

export interface Reservation {
  id: number;        // Identificador de la reserva
  worker_dni: string;    // Treballador que ha fet la reserva
  client_dni: string;    // Client que ha fet la reserva
  service_id: number;  // Servei reservat
  date: string;      // Data de la reserva
  hour: string;      // Hora de la reserva
  status: string;    // Estat de la reserva
}