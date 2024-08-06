import './style.css';
import { TipoIva /* , Producto, LineaTicket, productos  */ } from './model';

/* 

Producto:         Precio ---- IVA -------- Cantidad
- Legumbres  ----   2€    ---- 21% --------     2
- Perfume  ----     20€    ---- 21% --------    3
- Leche  ----       1€     ---- 0% --------     6
- Lasaña  ----      5€     ---- 5% --------     1

*/

/* 
TODO: calcular precio total del ticket de compra, contanto con que la
función  calculaTicket() devolverá un ticket con la información:
  => Por cada producto queremos saber:
  - Nombre
  - Cantidad
  - Precio sin IVA
  - Precio con IVA
  - Tipo de IVA
 */

/* type TipoIva =
  | 'general'
  | 'reducido'
  | 'superreducidoA'
  | 'superreducidoB'
  | 'superreducidoC'
  | 'sinIva';

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

const productos: LineaTicket[] = [
  {
    producto: {
      nombre: 'Legumbres',
      precio: 2,
      tipoIva: 'general',
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: 'Perfume',
      precio: 20,
      tipoIva: 'general',
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: 'Leche',
      precio: 1,
      tipoIva: 'superreducidoC',
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: 'Lasaña',
      precio: 5,
      tipoIva: 'superreducidoA',
    },
    cantidad: 1,
  },
];

console.log(productos); */

// Validar parámetros para la función calculaIvaDeProducto
const validarPecioCantidadYTipoIva = (
  precioProducto: number,
  cantidadProducto: number,
  tipoDeIva: TipoIva
): boolean => {
  if (
    precioProducto !== null &&
    precioProducto !== undefined &&
    cantidadProducto !== null &&
    cantidadProducto !== undefined &&
    tipoDeIva !== null &&
    tipoDeIva !== undefined &&
    tipoDeIva === tipoDeIva
  ) {
    return true;
  }
  throw new Error(
    'No se ha validado precioProducto, cantidadProducto, tipoDeIva'
  );
};

export const calculaIvaDeProducto = (
  precioProducto: number,
  cantidadProducto: number,
  tipoDeIva: TipoIva
): number => {
  if (
    validarPecioCantidadYTipoIva(precioProducto, cantidadProducto, tipoDeIva)
  ) {
    //let iva: number;
    switch (tipoDeIva) {
      case 'sinIva':
        return Number(
          (((precioProducto * 0) / 100) * cantidadProducto).toFixed(2)
        );
        break;
      case 'general':
        return Number(
          (((precioProducto * 21) / 100) * cantidadProducto).toFixed(2)
        );
        break;
      case 'reducido':
        return Number(
          (((precioProducto * 10) / 100) * cantidadProducto).toFixed(2)
        );
        break;
      case 'superreducidoA':
        return Number(
          (((precioProducto * 5) / 100) * cantidadProducto).toFixed(2)
        );
        break;
      case 'superreducidoB':
        return Number(
          (((precioProducto * 4) / 100) * cantidadProducto).toFixed(2)
        );
        break;
      case 'superreducidoC':
        return Number(
          (((precioProducto * 0) / 100) * cantidadProducto).toFixed(2)
        );
        break;

      default:
        break;
    }
  }
  throw new Error('No se ha definido una entrada');
};

calculaIvaDeProducto(100, 1, 'general');

/* export const calculaIvaDeProducto = (
  precioProducto: number,
  cantidadProducto: number,
  tipoDeIva: TipoIva
): number => {
  if (
    validarPecioCantidadYTipoIva(precioProducto, cantidadProducto, tipoDeIva)
  ) {
    const iva = Number(
      (((precioProducto * 21) / 100) * cantidadProducto).toFixed(2)
    );
    console.log(iva);
    console.warn(typeof iva);
    return iva;
  }
  throw new Error('No se ha definido una entrada');
};
calculaIvaDeProducto(5, 3, 'general'); */
