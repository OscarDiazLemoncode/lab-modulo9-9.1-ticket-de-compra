import {
  TipoIva,
  LineaTicket,
  productos,
  /* Producto, */
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  /* TotalPorTipoIva, */
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
  const nombre = arrayProductos.map((producto) => producto.producto.nombre);
  return nombre;
};
nombreProducto(productos);

// Obtenemos cantidad del producto
export const cantidadProducto = (arrayProductos: LineaTicket[]): number[] => {
  if (arrayProductos !== undefined && arrayProductos !== null) {
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
  throw new Error('No se ha validad el precioProducto o cantidadProducto');
};
precioProductoSinIva(2, 2);

// Obtenemos tipo de iva del producto
const porcentajeIva = (tipoDeIva: TipoIva): number => {
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
      throw new Error('No está definido tipoDeIva para obtener %');
      break;
  }
};

// Obtener IVA de producto
const calcularIva = (precio: number, tipoDeIva: TipoIva) => {
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
      return Number(((precio * porcentaje) / 100).toFixed(2));
      break;
  }
};
calcularIva(10, 'general');

// Obtener precio producto con IVA
export const precioProductoConIva = (
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
    precioSinIva: precioProductoSinIva(producto.precio, cantidad),
    tipoIva: producto.tipoIva,
    IVA: porcentajeIva(producto.tipoIva),
    precioUdConIva:
      calcularIva(producto.precio, producto.tipoIva) + producto.precio,
    precioConIva: precioProductoConIva(
      producto.tipoIva,
      producto.precio,
      cantidad
    ),
  }));
};

const ticket = calculaTicket(productos);
//console.table(ticket);
//console.log(ticket);

// Tipo de IVA
const tipoIvaProducto = (ticket: ResultadoLineaTicket[]) => {
  return ticket.map((producto) => producto.tipoIva);
};
//console.warn(`tipoIvaProducto=> ${tipoIvaProducto(ticket)}`);

// Total ticket sin IVA
const totalTicketSinIVa = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.precioSinIva, 0);
};
//console.warn(`totalTicketSinIVa=> ${totalTicketSinIVa(ticket)}`);

// Total ticket con IVA
const totalTicketConIVa = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.precioConIva, 0);
};
//console.warn(`totalTicketConIVa=> ${totalTicketConIVa(ticket)}`);

// Total % IVA
const totalPorcentajeIva = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.IVA, 0);
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
    totalIva: totalPorcentajeIva(ticket),
  };
};
//console.warn(resultadoTotalTicket(ticket));
resultadoTotalTicket(ticket);

// Total por tipo de IVA
/* const totalPorTipoIva = (ticket: ResultadoLineaTicket[]): TotalPorTipoIva => {
    return ticket.reduce((totalPorTipo, producto) => {
      const { tipoIva, precioSinIva } = producto;
      if (!totalPorTipo[tipoIva]) {
        totalPorTipo[tipoIva] = 0;
      }
      totalPorTipo[tipoIva] += precioSinIva;
      const cuantia = totalPorTipo[tipoIva];
      //console.log(tipoIva, cuantia);
      return totalPorTipo;
    }, {});
  };
  
  console.log(totalPorTipoIva(ticket));
  totalPorTipoIva(ticket); */
/* 
  //TODO:
  en cuanto a los totales:
  - El total sin IVA. XXX
  - El IVA. XXX
  - Un desglose del total por tipo de IVA, es decir, la suma de los importes correspondientes a cada tipo de IVA.
  - El total del ticket, incluyendo el IVA. XXX
  */
