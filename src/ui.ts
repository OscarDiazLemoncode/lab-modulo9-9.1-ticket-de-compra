import {
  TipoIva,
  tiposDeIvas,
  LineaTicket,
  productos,
  /* Producto, */
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
  TicketFinal,
} from './model';

// Validar parámetros para la función calculaIvaDeProducto
const validarPecioCantidadYTipoIva = (
  tipoDeIva: TipoIva,
  precioProducto: number,
  cantidadProducto: number
): boolean => {
  if (
    tipoDeIva !== null &&
    tipoDeIva !== undefined &&
    tipoDeIva === tipoDeIva &&
    precioProducto !== null &&
    precioProducto !== undefined &&
    cantidadProducto !== null &&
    cantidadProducto !== undefined
  ) {
    return true;
  }
  throw new Error(
    'No se ha validado precioProducto, cantidadProducto, tipoDeIva'
  );
};

// Obtenemos nombre del producto
const nombreProducto = (arrayProductos: LineaTicket[]) => {
  if (arrayProductos !== undefined && arrayProductos !== null) {
    return arrayProductos.map((producto) => producto.producto.nombre);
  }
  throw new Error('No se ha definido una entrada');
};
nombreProducto(productos);

// Obtenemos cantidad del producto
export const cantidadProducto = (arrayProductos: LineaTicket[]): number[] => {
  if (
    arrayProductos !== undefined &&
    arrayProductos !== null &&
    arrayProductos
  ) {
    return arrayProductos.map((producto) => producto.cantidad);
  }
  throw new Error('No se ha definido una entrada');
};
console.log(cantidadProducto(productos));
cantidadProducto(productos);

// Calcula precio producto sin IVA
const precioProductoSinIva = (
  precioProducto: number,
  cantidadProducto: number
): number => {
  if (
    precioProducto !== null &&
    precioProducto !== undefined &&
    cantidadProducto !== null &&
    cantidadProducto !== undefined
  ) {
    const precio = precioProducto * cantidadProducto;
    //console.warn('precioProductoSinIva =>' + precio);
    return precio;
  }
  throw new Error('No se ha validado el precioProducto o cantidadProducto');
};
precioProductoSinIva(2, 2);

// Obtenemos % de iva del producto a aplicar
export const porcentajeIva = (tipoDeIva: TipoIva): number => {
  if (
    tipoDeIva !== null &&
    tipoDeIva !== undefined &&
    typeof tipoDeIva === 'string'
  ) {
    switch (tipoDeIva) {
      case 'general':
        return 21;
      case 'reducido':
        return 10;
      case 'superreducidoA':
        return 5;
      case 'superreducidoB':
        return 4;
      case 'superreducidoC':
        return 0;
      case 'sinIva':
        return 0;
        break;
      default:
        throw new Error('No está definido tipoDeIva');
        break;
    }
  }
  throw new Error('No está definido tipoDeIva para obtener %');
};

// Obtener IVA de producto
export const calcularIva = (precio: number, tipoDeIva: TipoIva) => {
  if (
    precio !== null &&
    precio !== undefined &&
    !isNaN(precio) === true &&
    tipoDeIva !== null &&
    tipoDeIva !== undefined &&
    typeof tipoDeIva === 'string'
  ) {
    const porcentaje = porcentajeIva(tipoDeIva);
    switch (tipoDeIva) {
      case 'general':
        return Number(((precio * porcentaje) / 100).toFixed(2));
        break;
      case 'reducido':
        return Number(((precio * porcentaje) / 100).toFixed(2));
        break;
      case 'superreducidoA':
        return Number(((precio * porcentaje) / 100).toFixed(2));
        break;
      case 'superreducidoB':
        return Number(((precio * porcentaje) / 100).toFixed(2));
        break;
      case 'superreducidoC':
        return Number(((precio * porcentaje) / 100).toFixed(2));
        break;
      case 'sinIva':
        return Number(((precio * porcentaje) / 100).toFixed(2));
        break;

      default:
        throw new Error('No se ha definido precio o tipoDeIva en caclularIva');
        break;
    }
  }
  throw new Error('No se ha definido precio o tipoDeIva en caclularIva');
};
console.log(calcularIva(10, 'general'));
calcularIva(10, 'general');

// Obtener precio producto con IVA
const precioProductoConIva = (
  tipoDeIva: TipoIva,
  precioProducto: number,
  cantidadProducto: number
): number => {
  if (
    validarPecioCantidadYTipoIva(tipoDeIva, precioProducto, cantidadProducto)
  ) {
    const iva = calcularIva(precioProducto, tipoDeIva);
    switch (tipoDeIva) {
      case 'general':
        return (precioProducto + iva) * cantidadProducto;
        break;
      case 'reducido':
        return (precioProducto + iva) * cantidadProducto;
        break;
      case 'superreducidoA':
        return (precioProducto + iva) * cantidadProducto;
        break;
      case 'superreducidoB':
        return (precioProducto + iva) * cantidadProducto;
        break;
      case 'superreducidoC':
        return (precioProducto + iva) * cantidadProducto;
        break;
      case 'sinIva':
        return (precioProducto + iva) * cantidadProducto;
        break;

      default:
        throw new Error('No se ha ejecutado switch en precioProductoConIva');
        break;
    }
  }
  throw new Error('No se ha definido una entrada');
};

const calculaTicket = (lineasTicket: LineaTicket[]): ResultadoLineaTicket[] => {
  return lineasTicket.map(({ producto, cantidad }) => ({
    nombre: producto.nombre,
    cantidad: cantidad,
    precioUdSinIva: producto.precio,
    totalSinIva: precioProductoSinIva(producto.precio, cantidad),
    tipoIva: producto.tipoIva,
    IVA: porcentajeIva(producto.tipoIva),
    cuotaIVa: calcularIva(producto.precio, producto.tipoIva),
    precioUdConIva:
      calcularIva(producto.precio, producto.tipoIva) + producto.precio,
    totalConIva: precioProductoConIva(
      producto.tipoIva,
      producto.precio,
      cantidad
    ),
  }));
};

const ticket = calculaTicket(productos);
console.table(ticket);
//console.log(ticket);

// Tipo de IVA
/* const tipoIvaProducto = (ticket: ResultadoLineaTicket[]) => {
  return ticket.map((producto) => producto.tipoIva);
};
const tipoDeIva = tipoIvaProducto(ticket);
console.warn(`tipoIvaProducto=> ${tipoIvaProducto(ticket)}`); */

// Total ticket sin IVA
const totalTicketSinIVa = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.totalSinIva, 0);
};
//console.warn(`totalTicketSinIVa=> ${totalTicketSinIVa(ticket)}`);

// Total ticket con IVA
const totalTicketConIVa = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.totalConIva, 0);
};
//console.warn(`totalTicketConIVa=> ${totalTicketConIVa(ticket)}`);

// Total % IVA
const totalPorcentajeIva = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.cuotaIVa, 0);
};
//console.warn(`totalPorcentajeIva=> ${totalPorcentajeIva(ticket)}`);

// Resultado total ticket
const resultadoTotalTicket = (
  ticket: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  ticket = calculaTicket(productos);
  return {
    /* ...ticket, */
    totalSinIva: totalTicketSinIVa(ticket),
    totalConIva: totalTicketConIVa(ticket),
    totalCuotaIva: totalPorcentajeIva(ticket),
  };
};
console.warn(resultadoTotalTicket(ticket));
const totalDelTicket = resultadoTotalTicket(ticket);

/*  */
/* const totalesPorIva = (ticket: ResultadoLineaTicket[]) => {
  let totalesPorIva: TotalPorTipoIva[] = {};
  ticket.forEach((producto) => {
    const tipoIva = producto.tipoIva;
    totalesPorIva[tipoIva] = (totalesPorIva[tipoIva] || 0) + producto.cuotaIVa;
  });
  return totalesPorIva;
};
console.log(totalesPorIva(ticket)); */

/*  */

// Total por tipo de IVA
const totalPorTipoIva = (
  tiposDeIvas: TipoIva[],
  ticket: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  const resultado = tiposDeIvas.reduce<TotalPorTipoIva[]>((acc, iva) => {
    const productosFiltrados = ticket.filter(
      (producto) => producto.tipoIva === iva
    );
    const totalSinIva = productosFiltrados.reduce(
      (total, producto) => total + producto.totalSinIva,
      0
    );
    if (totalSinIva > 0) {
      acc.push({ tipoIva: iva, cuantia: totalSinIva });
    }
    return acc;
  }, []);
  return resultado;
};

console.table(totalPorTipoIva(tiposDeIvas, ticket));
const totalDesglosePorIva = totalPorTipoIva(tiposDeIvas, ticket);

// Ticket final
const ticketFinal = (
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
console.log(ticketFinal(ticket, totalDelTicket, totalDesglosePorIva));
ticketFinal(ticket, totalDelTicket, totalDesglosePorIva);
/* 
  //TODO:
  en cuanto a los totales:
  - El total sin IVA. XXX
  - El IVA. XXX
  - Un desglose del total por tipo de IVA, es decir, la suma de los importes correspondientes a cada tipo de IVA.
  - El total del ticket, incluyendo el IVA. XXX

  const arrayIvas : TipoIva[] =[
  "general",
  ...
  ] 
  const obtenertotalIvaProducto = (tiposIVa, lineasTicket)=>{
  tiposDeIva.map((tipoDeIva)=>{
  const prodPorIva = lineasTicket.filter(lineaTicket)=>{
  lineaTicket.tipoIva === tipoDeIVa)

  */
