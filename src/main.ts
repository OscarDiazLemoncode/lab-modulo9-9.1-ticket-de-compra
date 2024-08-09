import './style.css';
import {
  TipoIva,
  LineaTicket,
  productos,
  Producto,
  ResultadoLineaTicket,
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
  console.warn('nombreProducto =>' + nombre);
  return nombre;
};
nombreProducto(productos);

// Obtenemos cantidad del producto
const cantidadProducto = (arrayProductos: LineaTicket[]) => {
  const cantidad = arrayProductos.map((producto) => producto.cantidad);
  console.warn('cantidadProducto =>' + cantidad);
  return cantidad;
};
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
const tipoDeIvaProducto = (arrayProductos: LineaTicket[]) => {
  const tipoDeIva = arrayProductos.map((producto) => producto.producto.tipoIva);
  console.warn('tipoDeIvaProducto=>' + tipoDeIva);
  return tipoDeIva;
};
tipoDeIvaProducto(productos);

// Obtener IVA de producto
const calcularIva = (precio: number, tipoDeIva: TipoIva) => {
  switch (tipoDeIva) {
    case 'general':
      return Number(((precio * 21) / 100).toFixed(2));
      break;
    case 'reducido':
      return Number(((precio * 10) / 100).toFixed(2));
      break;
    case 'superreducidoA':
      return Number(((precio * 5) / 100).toFixed(2));
      break;
    case 'superreducidoB':
      return Number(((precio * 4) / 100).toFixed(2));
      break;
    case 'superreducidoC':
      return Number(((precio * 0) / 100).toFixed(2));
      break;
    case 'sinIva':
      return Number(((precio * 0) / 100).toFixed(2));
      break;

    default:
      return Number(((precio * 21) / 100).toFixed(2));
      break;
  }
};
console.warn('calcularIva => ' + calcularIva(10, 'general'));
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
        return Number((precioProducto + iva) * cantidadProducto);
        break;
      case 'reducido':
        return Number((precioProducto + iva) * cantidadProducto);
        break;
      case 'superreducidoA':
        return Number((precioProducto + iva) * cantidadProducto);
        break;
      case 'superreducidoB':
        return Number((precioProducto + iva) * cantidadProducto);
        break;
      case 'superreducidoC':
        return Number((precioProducto + iva) * cantidadProducto);
        break;
      case 'sinIva':
        return Number((precioProducto + iva) * cantidadProducto);
        break;

      default:
        throw new Error('No se ha ejecutado switch en precioProductoConIva');

        break;
    }
  }
  throw new Error('No se ha definido una entrada');
};
console.warn(
  'precioProductoConIva =>' + precioProductoConIva('reducido', 2, 2)
);
precioProductoConIva('reducido', 2, 2);

const calculaTicket = (lineasTicket: LineaTicket[]): ResultadoLineaTicket[] => {
  return lineasTicket.map(({ producto, cantidad }) => ({
    nombre: producto.nombre,
    cantidad: cantidad,
    precioSinIva: precioProductoSinIva(producto.precio, cantidad),
    tipoIva: producto.tipoIva,
    precioConIva: precioProductoConIva(
      producto.tipoIva,
      producto.precio,
      cantidad
    ),
  }));
};
console.table(calculaTicket(productos));
console.log(productos);
