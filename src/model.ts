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

export type TipoIva =
  | 'general'
  | 'reducido'
  | 'superreducidoA'
  | 'superreducidoB'
  | 'superreducidoC'
  | 'sinIva';

export const tiposDeIvas: TipoIva[] = [
  'general',
  'reducido',
  'superreducidoA',
  'superreducidoB',
  'superreducidoC',
  'sinIva',
];

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precioUdSinIva: number;
  totalSinIva: number;
  tipoIva: TipoIva;
  IVA: number;
  cuotaIVa: number;
  precioUdConIva: number;
  totalConIva: number;
}

export interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalCuotaIva: number;
}

export interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

export interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

export const productos: LineaTicket[] = [
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

/*
 1. **Legumbres**:
   - Precio: 2€
   - Cantidad: 2
   - IVA (21%): 0.42€
   - Subtotal: 2 + 0.42 * 2 = 4.84€

2. **Perfume**:
   - Precio: 20€
   - Cantidad: 3
   - IVA (21%): 12.60€
   - Subtotal: 20x3 + 12.60 = 72.60€

3. **Leche**:
   - Precio: 1€
   - Cantidad: 6
   - IVA (0%): Sin IVA
   - Subtotal: 1x6 = 6€

4. **Lasaña**:
   - Precio: 5€
   - Cantidad: 1
   - IVA (5%): 0.25€
   - Subtotal: 5x1 + 0.25 = 5.25€

**Precio total del ticket**: 4.42+ 72.60 + 6 + 5.25 = 88.27 €
Por lo tanto, el precio total del ticket es 88.27€. 
*/
