import './style.css';
import { ticket, totalDelTicket, totalDesglosePorIva, ticketFinal } from './ui';

document.addEventListener('DOMContentLoaded', () => {
  console.log(ticketFinal(ticket, totalDelTicket, totalDesglosePorIva));
  ticketFinal(ticket, totalDelTicket, totalDesglosePorIva);
});
