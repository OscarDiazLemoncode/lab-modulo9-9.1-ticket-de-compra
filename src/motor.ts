import {
  TipoIva,
  tiposDeIvas,
  LineaTicket,
  productos,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
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
    return precio;
  }
  throw new Error('No se ha validado el precioProducto o cantidadProducto');
};

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

export const calculaTicket = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  if (lineasTicket !== undefined && lineasTicket !== null) {
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
  }
  throw new Error('No se ha definido una entrada de lineasTicket');
};

// Total ticket sin IVA
const totalTicketSinIVa = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.totalSinIva, 0);
};

// Total ticket con IVA
const totalTicketConIVa = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.totalConIva, 0);
};

// Total % IVA
const totalPorcentajeIva = (ticket: ResultadoLineaTicket[]): number => {
  return ticket.reduce((total, producto) => total + producto.cuotaIVa, 0);
};

// Resultado total ticket
export const resultadoTotalTicket = (
  ticket: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  ticket = calculaTicket(productos);
  return {
    totalSinIva: totalTicketSinIVa(ticket),
    totalConIva: totalTicketConIVa(ticket),
    totalCuotaIva: totalPorcentajeIva(ticket),
  };
};

// Total por tipo de IVA
export const totalPorTipoIva = (
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

// Detalle de lineas de ticket
export const ticket = calculaTicket(productos);

// Detalle de totales
export const totalDelTicket = resultadoTotalTicket(ticket);

// Desglose por tipos de IVA del ticket
export const totalDesglosePorIva = totalPorTipoIva(tiposDeIvas, ticket);
