import {
  TicketFinal,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from './model';
import { totalDelTicket, totalDesglosePorIva } from './motor';

export const ticketFinal = (
  ticket: ResultadoLineaTicket[],
  totalTicket: ResultadoTotalTicket,
  desgloseIva: TotalPorTipoIva[]
): TicketFinal[] => {
  if (
    ticket !== undefined &&
    ticket !== null &&
    totalDelTicket !== undefined &&
    totalDelTicket !== null &&
    totalDesglosePorIva !== undefined &&
    totalDesglosePorIva !== null
  ) {
    return [
      {
        lineas: ticket,
        total: totalTicket,
        desgloseIva: desgloseIva,
      },
    ];
  }
  throw new Error(
    'No se ha definido una entrada de ticket, totalTicket, desgloseIva'
  );
};
