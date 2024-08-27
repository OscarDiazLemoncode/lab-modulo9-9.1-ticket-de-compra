import './style.css';
import { ticketFinal } from './ui';
import { ticket, totalDelTicket, totalDesglosePorIva } from './motor';

document.addEventListener('DOMContentLoaded', () => {
  console.log(ticketFinal(ticket, totalDelTicket, totalDesglosePorIva));
  ticketFinal(ticket, totalDelTicket, totalDesglosePorIva);
});
