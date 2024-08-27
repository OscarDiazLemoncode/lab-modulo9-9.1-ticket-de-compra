import { cantidadProducto, porcentajeIva, calcularIva } from './motor';

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

describe('porcentajeIva', () => {
  it('deberia devolver throw si las entradas son null', () => {
    // Arrange
    const tipoDeIva: any = null;
    // Act
    const result = () => porcentajeIva(tipoDeIva);
    // Assert
    expect(result).toThrowError('No está definido tipoDeIva para obtener %');
  });

  it('deberia devolver throw si las entradas son undefined', () => {
    // Arrange
    const tipoDeIva: any = undefined;
    // Act
    const result = () => porcentajeIva(tipoDeIva);
    // Assert
    expect(result).toThrowError('No está definido tipoDeIva para obtener %');
  });

  it('deberia devolver throw si la entrada es !==string', () => {
    // Arrange
    const tipoDeIva: any = 5;
    // Act
    const result = () => porcentajeIva(tipoDeIva);
    // Assert
    expect(result).toThrowError('No está definido tipoDeIva para obtener %');
  });
});

describe('calcularIva', () => {
  it('deberia devolver throw error si la entrada es null', () => {
    // arrange
    const precio: any = null;
    const tipoDeIva: any = null;
    // act
    const result = () => calcularIva(precio, tipoDeIva);
    // assert
    expect(result).toThrowError(
      'No se ha definido precio o tipoDeIva en caclularIva'
    );
  });

  it('deberia devolver throw error si la entrada es undefined', () => {
    // arrange
    const precio: any = undefined;
    const tipoDeIva: any = undefined;
    // act
    const result = () => calcularIva(precio, tipoDeIva);
    // assert
    expect(result).toThrowError(
      'No se ha definido precio o tipoDeIva en caclularIva'
    );
  });

  it('deberia devolver throw error si precio isNaN y tipoDeIva !== string', () => {
    // arrange
    const precio: any = isNaN;
    const tipoDeIva: any = 21;
    // act
    const result = () => calcularIva(precio, tipoDeIva);
    // assert
    expect(result).toThrowError(
      'No se ha definido precio o tipoDeIva en caclularIva'
    );
  });
});
