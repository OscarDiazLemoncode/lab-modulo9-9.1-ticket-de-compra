import './style.css';
import { TipoIva, LineaTicket, productos, Producto } from './model';

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

export const calculaIvaDeProducto = (
  tipoDeIva: TipoIva,
  precioProducto: number,
  cantidadProducto: number
): number => {
  if (
    validarPecioCantidadYTipoIva(precioProducto, cantidadProducto, tipoDeIva)
  ) {
    let iva: number;
    switch (tipoDeIva) {
      case 'sinIva':
        /* tipoDeIva * precioProducto) / 100) * cantidadProducto */
        iva = Number(
          (((0 * precioProducto) / 100) * cantidadProducto).toFixed(2)
        );
        console.log(iva);
        return iva;
        break;
      case 'general':
        iva = Number(
          (((21 * precioProducto) / 100) * cantidadProducto).toFixed(2)
        );
        return iva;
        break;
      case 'reducido':
        iva = Number(
          (((10 * precioProducto) / 100) * cantidadProducto).toFixed(2)
        );
        return iva;
        break;
      case 'superreducidoA':
        iva = Number(
          (((5 * precioProducto) / 100) * cantidadProducto).toFixed(2)
        );
        return iva;
        break;
      case 'superreducidoB':
        iva = Number(
          (((4 * precioProducto) / 100) * cantidadProducto).toFixed(2)
        );
        return iva;
        break;
      case 'superreducidoC':
        iva = Number(
          (((0 * precioProducto) / 100) * cantidadProducto).toFixed(2)
        );
        return iva;
        break;

      default:
        break;
    }
  }
  throw new Error('No se ha definido una entrada');
};
console.warn(calculaIvaDeProducto('general', 35, 1));
calculaIvaDeProducto('general', 35, 1);

// Obtenemos nombre del producto
const nombreProducto = (arrayProductos: LineaTicket[]) => {
  const nombre = arrayProductos.map((producto) => producto.producto.nombre);
  console.warn(nombre);
  return nombre;
};
nombreProducto(productos);

// Obtenemos cantidad del producto
const cantidadProducto = (arrayProductos: LineaTicket[]) => {
  const cantidad = arrayProductos.map((producto) => producto.cantidad);
  console.warn(cantidad);
  return cantidad;
};
cantidadProducto(productos);

// Obtenemos tipo de iva del producto
const tipoDeIvaProducto = (arrayProductos: LineaTicket[]) => {
  const tipoDeIva = arrayProductos.map((producto) => producto.producto.tipoIva);
  console.warn(tipoDeIva);
  return tipoDeIva;
};
tipoDeIvaProducto(productos);

// Calcula precio producto sin IVA
const calcularPrecioSinIva = (
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
    console.warn(precio);
    return precio;
  }
  throw new Error('No se ha validad el precioProducto o cantidadProducto');
};
calcularPrecioSinIva(2, 2);

/* const calculaTicket = (lineasTicket: LineaTicket[]) => {
  for (let i = 0; i < lineasTicket.length; i++) {
    const el = lineasTicket[i];
    //const nombre: string = el.producto.nombre;
    //const precio: number = el.producto.precio;
    const tipoDeIva: TipoIva = el.producto.tipoIva;
    const producto: Producto = el.producto;
    const cantidad = el.cantidad;
    const { nombre, precio } = el.producto;
    const iva = calculaIvaDeProducto(precio, cantidad, tipoDeIva);
    console.log(el);
    console.log(
      `nombre=>${nombre}, precio=>${precio}, IVA=>${tipoDeIva},producto=>${producto},cantidad=>${cantidad}`
    );
    console.log(iva);
    const ticket = precio * cantidad + iva;
    console.warn(ticket);
  }
};
calculaTicket(productos); */

/* export const calculaIvaDeProducto = (
  tipoDeIva: TipoIva,
  precioProducto: number,
  cantidadProducto: number
): number => {
  if (
    validarPecioCantidadYTipoIva(tipoDeIva, precioProducto, cantidadProducto)
  ) {
    const iva = Number(
      (((tipoDeIva * precioProducto) / 100) * cantidadProducto).toFixed(2)
    );
    console.log(iva);
    console.warn(typeof iva);
    return iva;
  }
  throw new Error('No se ha definido una entrada');
};
calculaIvaDeProducto('general', 35, 1);
 */
