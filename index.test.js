import { test, expect, describe } from "vitest";

function parseNumber(number) {
  let resultado = 0;
  if (typeof number === "string") {
    resultado = parseInt(number);
  }

  if (isNaN(resultado)) {
    return "isNaN";
  }

  return resultado;
}

function suma(a, b) {
  let parsedA = parseNumber(a);
  let parsedB = parseNumber(b);

  if (a === null || b === null) {
    return null;
  }

  if (parsedA === "isNaN" || parsedB === "isNaN") {
    throw new Error("isNaN");
  }

  return a + b;
}

describe("Función Suma", () => {
  test("debería retornar 4", () => {
    //Arrange -> Iniciar el test
    let resultado = 0;

    //Act
    resultado = suma(2, 2);

    //Assert
    expect(resultado).toBe(4);
  });

  test("debería retornar una resta si uno de los valores ingresados es negativo", () => {
    let resultado = 0;
    resultado = suma(4, -3);
    expect(resultado).toBe(1);
  });

  test("debería retornar un seis negativo", () => {
    let resultado = suma(-3, -3);
    expect(resultado).toBe(-6);
  });

  test("debería retornar null si 'a' es null", () => {
    let resultado = 0;
    resultado = suma(null, 5);
    expect(resultado).toBeNull();
  });

  test("debería retornar null si 'b' es null", () => {
    let resultado = 0;
    resultado = suma(5, null);
    expect(resultado).toBeNull();
  });

  test("si se pasa un string, debería retornar isNaN si no se puede convertir", () => {
    expect(() => suma("hola", 5)).toThrowError("isNaN");
  });
});
