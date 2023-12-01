function complementoDos(decimal, bits) {
  if (decimal >= 0) {
    return decimalToBinary(decimal, bits); // Si es positivo, devuelve la representación binaria normal
  } else {
    let positiveBinary = decimalToBinary(Math.abs(decimal), bits); // Representación binaria positiva
    let invertedBinary = positiveBinary
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join(""); // Invierte los bits

    // Agrega ceros a la izquierda para completar el número de bits
    while (invertedBinary.length < bits) {
      invertedBinary = "0" + invertedBinary;
    }

    // Convierte el resultado invertido a decimal y le suma 1
    let complement = parseInt(invertedBinary, 2) + 1;

    // Convierte de nuevo a binario y devuelve el complemento a 2
    return complement.toString(2);
  }
}

function decimalToBinary(decimal, bits) {
  let binary = (decimal >>> 0).toString(2); // Convierte a binario sin signo

  // Añade ceros a la izquierda para cumplir con el número de bits especificado
  while (binary.length < bits) {
    binary = "0" + binary;
  }

  return binary;
}

function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}



function sumBinary(num1, num2, bits) {
  // Convierte los números binarios a decimales
  const decimal1 = binaryToDecimal(num1);
  const decimal2 = binaryToDecimal(num2);

  // Realiza la suma decimal
  let sum = decimal1 + decimal2;

  // Verifica si hay sobreflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  // Si hay sobreflujo, ajusta el valor
  if (sum > maxDecimalValue || sum < minDecimalValue) {
    sum = sum & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(sum, bits);
}

function subtractBinary(num1, num2, bits) {
  // Convierte los números binarios a decimales
  const decimal1 = binaryToDecimal(num1);
  const decimal2 = binaryToDecimal(num2);

  // Realiza la resta decimal
  let difference = decimal1 - decimal2;

  // Verifica si hay sobreflujo o subflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  // Si hay sobreflujo o subflujo, ajusta el valor
  if (difference > maxDecimalValue || difference < minDecimalValue) {
    difference = difference & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(difference, bits);
}

function multiplyBinary(num1, num2, bits) {
  // Convierte los números binarios a decimales
  const decimal1 = binaryToDecimal(num1);
  const decimal2 = binaryToDecimal(num2);

  // Realiza la multiplicación decimal
  let product = decimal1 * decimal2;

  // Verifica si hay sobreflujo o subflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  // Si hay sobreflujo o subflujo, ajusta el valor
  if (product > maxDecimalValue || product < minDecimalValue) {
    product = product & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(product, bits);
}

function divideBinary(num1, num2, bits) {
  // Convierte los números binarios a decimales
  const decimal1 = complementoDosToDecimal(num1);
  console.log(decimal1);
  const decimal2 = complementoDosToDecimal(num2);
  console.log(decimal2);

  // Manejo de división por cero
  if (decimal2 === 0) {
    return "División por cero";
  }

  // Realiza la división decimal
  let quotient = Math.trunc(decimal1 / decimal2);
  let remainder = decimal1 % decimal2;

  // Verifica si hay sobreflujo o subflujo en el cociente y el residuo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  if (
    quotient > maxDecimalValue ||
    quotient < minDecimalValue ||
    remainder > maxDecimalValue ||
    remainder < minDecimalValue
  ) {
    quotient = quotient & ((1 << bits) - 1); // Aplica máscara para ajustar el cociente al rango permitido
    remainder = remainder & ((1 << bits) - 1); // Aplica máscara para ajustar el residuo al rango permitido
  }

  // Convierte el cociente y el residuo a binario en complemento a 2
  const quotientBinary = complementoDos(quotient, bits);
  const remainderBinary = complementoDos(remainder, bits);

  return { quotient: quotientBinary, remainder: remainderBinary };
}

function leftShiftBinary(num, bits) {
  // Convierte el número binario a decimal
  const decimal = binaryToDecimal(num);

  // Realiza el desplazamiento a la izquierda
  let shifted = decimal << 1;

  // Verifica si hay sobreflujo o subflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  // Si hay sobreflujo o subflujo, ajusta el valor
  if (shifted > maxDecimalValue || shifted < minDecimalValue) {
    shifted = shifted & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(shifted, bits);
}

function rightShiftBinary(num, bits) {
  // Convierte el número binario a decimal
  const decimal = binaryToDecimal(num);

  // Realiza el desplazamiento a la derecha
  let shifted = decimal >> 1;

  // Verifica si el número original es negativo para replicar el bit de signo
  if (decimal < 0) {
    shifted |= 1 << (bits - 1); // Replica el bit de signo (1) a la derecha
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(shifted, bits);
}

function calculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const operator = document.getElementById("operator").value;
  const bits = parseInt(document.getElementById("bits").value); // Número de bits seleccionados

  let result;

  switch (operator) {
    case "add":
      result = sumBinary(num1, num2, bits);
      break;
    case "subtract":
      result = subtractBinary(num1, num2, bits);
      break;
    case "multiply":
      result = multiplyBinary(num1, num2, bits);
      break;
    case "divide":
      result = divideBinary(num1, num2, bits);
      break;
    case "leftShift":
      result = leftShiftBinary(num1, bits);
      break;
    case "rightShift":
      result = rightShiftBinary(num1, bits);
      break;
    default:
      break;
  }

  if (typeof result === "object") {
    document.getElementById(
      "result"
    ).value = `Cociente: ${result.quotient}, Residuo: ${result.remainder}`;
    document.getElementById(
      "result-decimal"
    ).value = `Cociente: ${complementoDosToDecimal(result.quotient)}, Residuo: ${complementoDosToDecimal(result.remainder)}`;
  } else {
    document.getElementById("result").value = result;
    document.getElementById("result-decimal").value =
      complementoDosToDecimal(result);
  }
}
function convertToDecimal(inputId) {
  const binaryValue = document.getElementById(inputId).value;
  const decimalValue = complementoDosToDecimal(binaryValue);
  document.getElementById(inputId + "-decimal").value = decimalValue;
}
function complementoDosToDecimal(binary) {
  return binary
    .split("")
    .reverse()
    .map((bit, index) =>
      binary.length - 1 == index
        ? Math.pow(2, index) * bit * -1
        : Math.pow(2, index) * bit
    )
    .reduce((a, b) => a + b, 0);
}


function shiftsNum1() {
  const num1 = document.getElementById("num1").value;
  const operator = document.getElementById("operator").value;
  const bits = parseInt(document.getElementById("bits").value); // Número de bits seleccionados
  let result;

  switch (operator) {
    case "leftShift":
      result = leftShiftBinary(num1, bits);
      break;
    case "rightShift":
      result = rightShiftBinary(num1, bits);
      break;
    default:
      break;
  }
  document.getElementById("num1").value = result
}

function shiftsNum2() {
  const num2 = document.getElementById("num2").value;
  const operator = document.getElementById("operator").value;
  const bits = parseInt(document.getElementById("bits").value); // Número de bits seleccionados
  let result;

  switch (operator) {
    case "leftShift":
      result = leftShiftBinary(num2, bits);
      break;
    case "rightShift":
      result = rightShiftBinary(num2, bits);
      break;
    default:
      break;
  }
  document.getElementById("num2").value = result
}
