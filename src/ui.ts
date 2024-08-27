import {
  TicketFinal,
  productos,
  tiposDeIvas,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from './model';
import { resultadoTotalTicket, totalPorTipoIva, calculaTicket } from './motor';

// Ticket final
export const ticket = calculaTicket(productos);
export const totalDelTicket = resultadoTotalTicket(ticket);
export const totalDesglosePorIva = totalPorTipoIva(tiposDeIvas, ticket);
export const ticketFinal = (
  ticket: ResultadoLineaTicket[],
  totalTicket: ResultadoTotalTicket,
  desgloseIva: TotalPorTipoIva[]
): TicketFinal[] => {
  return [
    {
      lineas: ticket,
      total: totalTicket,
      desgloseIva: desgloseIva,
    },
  ];
};
