import { cantidadProducto } from './ui';

describe('cantidadProducto', () => {
  it('deberia devolver throw si las entradas son null', () => {
    // Arrange
    const arrayProductos: any = null;
    // Act
    const result = () => cantidadProducto(arrayProductos);
    // Assert
    expect(result).toThrowError('No se ha definido una entrada');
  });

  it('deberia devolver throw si las entradas son undefined', () => {
    // Arrange
    const arrayProductos: any = undefined;
    // Act
    const result = () => cantidadProducto(arrayProductos);
    // Assert
    expect(result).toThrowError('No se ha definido una entrada');
  });

  it('deberia devolver [] de numeros', () => {
    // Arrange
    const arrayProductos: any = [
      {
        producto: {
          nombre: 'Legumbres',
        },
        cantidad: 2,
      },
      {
        producto: {
          nombre: 'Perfume',
        },
        cantidad: 3,
      },
    ];
    // Act
    const result = cantidadProducto(arrayProductos);
    // Assert
    expect(result).toEqual([2, 3]);
  });
});
