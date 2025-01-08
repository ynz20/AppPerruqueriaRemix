export interface ActionData {
  error?: string;
  success?: string;
}

export interface Client {
  dni: string;       // DNI del client
  name: string;      // Nom del client
  surname: string;   // Cognom del client
  telf: string;      // Telèfon del client
  email: string;     // Correu electrònic del client
}

export interface Service {
  id: number;
  name: string;      // Nom del servei
  description: string; // Descripció del servei
  price: number;     // Preu del servei
  estimation: string; // Estimació del servei
}

export interface Reservation {
  id: number;        // Identificador de la reserva
  worker_dni: string;    // Treballador que ha fet la reserva
  client_dni: string;    // Client que ha fet la reserva
  service_id: number;  // Servei reservat
  date: string;      // Data de la reserva
  hour: string;      // Hora de la reserva
  status: string;    // Estat de la reserva
  user: User;    // Informació del treballador
  client: Client;    // Informació del client+
  service: Service;  // Informació del servei
}

export interface ReservationData {
  worker_dni: string | null;
  client_dni: string | null;
  service_id: number | null;
  date: Date | null;
  hour: string;
  status: string;
  shift_id?: number | null;
}


export interface User {
  dni: string;       // DNI del treballador
  name: string;      // Nom del treballador
  surname: string;   // Cognom del treballador
  nick: string;      // Nick del treballador
  telf: string;      // Telèfon del treballador
  password: string;  // Contrasenya del treballador
  email: string;     // Correu electrònic del treballador
  role: boolean;      // Rol del treballador
}

export interface Product{
  id:number // Id del producte
  name: string;  // Nom del producte
  description: string; // Descripció del producte
  price: number;
  stock: number;
}

