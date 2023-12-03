var mode = true;
const operators = ["−", "+", "*", "/"];
var bits = "4";

function changeBits() {
  bits = document.getElementById("bits-options").value;
  document.getElementById("num").textContent = "";
  document.getElementById("numResult").textContent = "";
  document.getElementById("num-decimal").textContent = "";
  document.getElementById("num-decimalResult").textContent = "";
}

function styleChange() {
  if (mode) {
    document.getElementById("num-decimal").classList.add("opaque");
    document.getElementById("num-decimalResult").classList.add("opaque");
    document.getElementById("num").classList.remove("opaque");
    document.getElementById("numResult").classList.remove("opaque");
  } else {
    document.getElementById("num").classList.add("opaque");
    document.getElementById("numResult").classList.add("opaque");
    document.getElementById("num-decimal").classList.remove("opaque");
    document.getElementById("num-decimalResult").classList.remove("opaque");
  }
}

styleChange();

function complementoDos(decimal) {
  if (decimal >= 0) {
    return decimalToBinary(decimal); // Si es positivo, devuelve la representación binaria normal
  } else {
    let positiveBinary = decimalToBinary(Math.abs(decimal)); // Representación binaria positiva
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

// function complementoDosWithoutBits(decimal) {
//   if (decimal >= 0) {
//     return decToBin(decimal); // Si es positivo, devuelve la representación binaria normal
//   } else {
//     let positiveBinary = decToBin(Math.abs(decimal)); // Representación binaria positiva
//     let invertedBinary = positiveBinary
//       .split("")
//       .map((bit) => (bit === "0" ? "1" : "0"))
//       .join(""); // Invierte los bits

//     // Convierte el resultado invertido a decimal y le suma 1
//     let complement = parseInt(invertedBinary, 2) + 1;

//     // Convierte de nuevo a binario y devuelve el complemento a 2
//     return complement.toString(2);
//   }
// }

// function decToBin(dec) {
//   let binary = (dec >>> 0).toString(2);
//   if (dec >= 0) {
//     return "0" + binary; // Agregar un 0 al principio para especificar el número positivo
//   } else {
//     return "1" + binary.slice(1); // Mantener el bit de signo y el resto de la representación binaria
//   }
// }

function decimalToBinary(decimal) {
  let binary = (decimal >>> 0).toString(2); // Convierte a binario sin signo

  // Añade ceros a la izquierda para cumplir con el número de bits especificado
  while (binary.length < bits) {
    binary = "0" + binary;
  }

  return binary;
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

function sumBinary(num1, num2) {
  // Convierte los números binarios a decimales
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

  // Realiza la suma decimal
  let sum = decimal1 + decimal2;

  // Verifica si hay sobreflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  // Si hay sobreflujo, ajusta el valor
  if (sum > maxDecimalValue || sum < minDecimalValue) {
    alert(
      `El resultado de la suma se sale del rango de números representables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${
        bits * 2
      } bits.`
    );
    sum = sum & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(sum);
}

function subtractBinary(num1, num2) {
  // Convierte los números binarios a decimales
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

  // Realiza la resta decimal
  let difference = decimal1 - decimal2;

  // Verifica si hay sobreflujo o subflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  // Si hay sobreflujo o subflujo, ajusta el valor
  if (difference > maxDecimalValue || difference < minDecimalValue) {
    alert(
      `El resultado de la resta se sale del rango de números representables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${
        bits * 2
      } bits.`
    );
    difference = difference & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(difference);
}

function multiplyBinary(num1, num2) {
  // Convierte los números binarios a decimales
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

  // Realiza la multiplicación decimal
  let product = decimal1 * decimal2;

  // Verifica si hay sobreflujo o subflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  // Si hay sobreflujo o subflujo, ajusta el valor
  if (product > maxDecimalValue || product < minDecimalValue) {
    alert(
      `El resultado de la multiplicación se sale del rango de números representables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${
        bits * 2
      } bits.`
    );
    // product = "0";
    product = product & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(product);
}

function divideBinary(num1, num2) {
  // Convierte los números binarios a decimales
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

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
    alert(
      `El resultado de la división se sale del rango de números representables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${
        bits * 2
      } bits.`
    );
    quotient = quotient & ((1 << bits) - 1); // Aplica máscara para ajustar el cociente al rango permitido
    remainder = remainder & ((1 << bits) - 1); // Aplica máscara para ajustar el residuo al rango permitido
  }

  // Convierte el cociente y el residuo a binario en complemento a 2
  const quotientBinary = complementoDos(quotient);
  const remainderBinary = complementoDos(remainder);

  return { quotient: quotientBinary, remainder: remainderBinary };
}

function enableCalculate() {
  document.getElementById("btn-calculate").disabled = false;
}

function calculate() {
  const numExpression = document.getElementById("num").textContent;

  let operator = "";
  for (let i = 0; i < operators.length; i++) {
    if (numExpression.includes(operators[i])) {
      operator = operators[i];
      break;
    }
  }

  if (operator) {
    const [num1, num2] = numExpression.split(operator);

    let result;

    switch (operator) {
      case "+":
        result = sumBinary(num1, num2);
        break;
      case "−":
        result = subtractBinary(num1, num2);
        break;
      case "*":
        result = multiplyBinary(num1, num2);
        break;
      case "/":
        result = divideBinary(num1, num2);
        break;
      default:
        break;
    }
    if (typeof result === "object") {
      document.getElementById(
        "numResult"
      ).textContent = `= Cociente: ${result.quotient}, Residuo: ${result.remainder}`;
      document.getElementById(
        "num-decimalResult"
      ).textContent = `= Cociente: ${complementoDosToDecimal(
        result.quotient
      )}, Residuo: ${complementoDosToDecimal(result.remainder)}`;
    } else {
      document.getElementById("numResult").textContent = "= " + result;
      document.getElementById("num-decimalResult").textContent =
        "= " + complementoDosToDecimal(result);
    }
  } else {
    console.error("No se encontró un operador en la expresión.");
  }
}

function hasOperators(num) {
  for (let i = 0; i < operators.length; i++) {
    if (num.includes(operators[i])) {
      return true;
    }
  }
  return false;
}

function leftShift() {
  let num = document.getElementById("num").textContent;
  // Verificar que no haya otros operadores
  if (!hasOperators(num)) {
    // Desplazar a la izquierda
    let shiftedNum = leftShiftBinary(num);
    document.getElementById("num").textContent = shiftedNum;
    // Actualizar el valor decimal
    document.getElementById("num-decimal").textContent =
      complementoDosToDecimal(shiftedNum);
  }
}

function leftShiftBinary(num) {
  return (result = num.substring(1) + "0");
}

// Función para realizar el desplazamiento a la derecha
function rightShift() {
  let num = document.getElementById("num").textContent;
  // Verificar que no haya otros operadores
  if (!hasOperators(num)) {
    // Desplazar a la derecha
    let shiftedNum = rightShiftBinary(num, 1);
    document.getElementById("num").textContent = shiftedNum;
    // Actualizar el valor decimal
    document.getElementById("num-decimal").textContent =
      complementoDosToDecimal(shiftedNum);
  }
}

function rightShiftBinary(num) {
  const signBit = num.charAt(0);
  let shifted = "0" + num.substring(0, num.length - 1);
  if (signBit === "1") {
    shifted = "1" + shifted.substring(1);
  }
  return shifted;
}

function disableShift() {
  document.getElementById("btn-<").disabled = true;
  document.getElementById("btn->").disabled = true;
}

function appendToNum(digit) {
  let num = document.getElementById("num").textContent;
  let numDecimal = document.getElementById("num-decimal").textContent;
  let operatorCount = 0;
  let operator = "";
  let max = Math.pow(2, bits - 1) - 1;
  let min = -Math.pow(2, bits - 1);

  for (let i = 0; i < operators.length; i++) {
    if (num.includes(operators[i])) {
      if (operatorCount == 0) {
        operator = operators[i];
      }
      operatorCount++;
    }
  }

  if (
    operatorCount < 1 ||
    (operatorCount === 1 && !operators.includes(digit))
  ) {
    if (mode) {
      if (
        complementoDosToDecimal(
          document.getElementById("num").textContent + digit
        ) > max ||
        complementoDosToDecimal(
          document.getElementById("num").textContent + digit
        ) < min
      ) {
        alert(
          `El número se sale del rango de números representables [${min}, ${max}], intente utilizar ${
            bits * 2
          } bits`
        );
      } else {
        if (operatorCount == 1) {
          let value = document.getElementById("num").textContent + digit;
          value = value.split(operator);
          if (value[1].length > bits) {
            alert(
              "El número sobrepasa los bits disponibles para su representación"
            );
          } else {
            document.getElementById("num").textContent = num + digit;
            let num1 = num + digit;
            const decimalValues = num1
              .split(operator)
              .map((value) => complementoDosToDecimal(value))
              .join(operator);
            document.getElementById("num-decimal").textContent = decimalValues;
          }
        } else {
          let value = document.getElementById("num").textContent + digit;
          if (value.length > bits && !operators.includes(digit)) {
            alert(
              "El número sobrepasa los bits disponibles para su representación"
            );
          } else {
            document.getElementById("num").textContent = num + digit;
            let decimalValues = "";
            operators.includes(digit)
              ? (decimalValues = numDecimal + digit)
              : (decimalValues = complementoDosToDecimal(num + digit));
            document.getElementById("num-decimal").textContent = decimalValues;
          }
        }
      }
    } else {
      let cont = 0;
      let decimal = document.getElementById("num-decimal").textContent + digit;
      for (let index = 0; index < decimal.length; index++) {
        if (decimal[index] == "-") {
          cont++;
        }
      }
      if (cont > 2) {
        alert("No se pueden ingresar tantos signos '-'.");
      } else if (parseInt(decimal) > max || parseInt(decimal) < min) {
        alert(
          `El número se sale del rango de números representables [${min}, ${max}], intente utilizar ${
            bits * 2
          } bits.`
        );
      } else {
        if (operatorCount == 1) {
          let validate = (document.getElementById("num-decimal").textContent =
            numDecimal);
          validate = validate.split(operator);
          if (validate[1] > max || validate[1] < min) {
            alert(
              `ghfgfhdghdghfEl número se sale del rango de números representables [${min}, ${max}], intente utilizar ${
                bits * 2
              } bits.`
            );
          } else {
            if (digit == "-") {
              document.getElementById("num-decimal").textContent =
                numDecimal + digit;
              document.getElementById("num").textContent = num + "0";
            } else {
              document.getElementById("num-decimal").textContent =
                numDecimal + digit;
              let numDecimal1 = numDecimal + digit;
              const binary = numDecimal1
                .split(operator)
                .map((value) => complementoDos(value))
                .join(operator);
              document.getElementById("num").textContent = binary;
            }
          }
        } else {
          document.getElementById("num-decimal").textContent =
            numDecimal + digit;
          if (document.getElementById("num-decimal").textContent !== "-") {
            let binary = "";
            operators.includes(digit)
              ? (binary = num + digit)
              : (binary = complementoDos(numDecimal + digit));
            document.getElementById("num").textContent = binary;
          } else {
            document.getElementById("num").textContent = "";
          }
        }
      }
    }
  } else {
    alert("No se puede ingresar más de un operador.");
  }
}

function clearResult() {
  document.getElementById("numResult").textContent = "";
  document.getElementById("num-decimalResult").textContent = "";
}

function clearEntry() {
  let num = document.getElementById("num").textContent;
  let numDecimal = document.getElementById("num-decimal").textContent;
  let operator = "";
  let operator1 = "";
  let operatorCount = 0;
  let operatorCount1 = 0;

  if (mode) {
    if (num.length > 0) {
      num = num.slice(0, -1); // Elimina el último carácter
      document.getElementById("num").textContent = num;
      for (let i = 0; i < operators.length; i++) {
        if (num.includes(operators[i])) {
          if (operatorCount == 0) {
            operator = operators[i];
          }
          operatorCount++;
        }
      }
      if (operatorCount == 0) {
        document.getElementById("btn-<").disabled = false;
        document.getElementById("btn->").disabled = false;
        document.getElementById("btn-calculate").disabled = true;
      }
      if (operatorCount == 1) {
        const decimalValues = num
          .split(operator)
          .map((value) => complementoDosToDecimal(value))
          .join(operator);
        document.getElementById("num-decimal").textContent = decimalValues;
      } else {
        const decimalValues = complementoDosToDecimal(num);
        document.getElementById("num-decimal").textContent = decimalValues;
      }
      if (document.getElementById("num-decimal").textContent == "0") {
        document.getElementById("num-decimal").textContent = "";
      }
    }
  } else {
    if (numDecimal.length > 0) {
      numDecimal = numDecimal.slice(0, -1); // Elimina el último carácter
      document.getElementById("num-decimal").textContent = numDecimal;
      for (let i = 0; i < operators.length; i++) {
        if (numDecimal.includes(operators[i])) {
          if (operatorCount1 == 0) {
            operator1 = operators[i];
          }
          operatorCount1++;
        }
      }
      if (operatorCount1 == 0) {
        document.getElementById("btn-<").disabled = false;
        document.getElementById("btn->").disabled = false;
        document.getElementById("btn-calculate").disabled = true;
      }
      if (operatorCount1 == 1) {
        const binary = numDecimal
          .split(operator1)
          .map((value) => complementoDos(value))
          .join(operator1);
        document.getElementById("num").textContent = binary;
      } else {
        if (document.getElementById("num-decimal").textContent !== "-") {
          const binary = complementoDos(numDecimal);
          document.getElementById("num").textContent = binary;
        } else {
          document.getElementById("num").textContent = "";
        }
      }
      if (document.getElementById("num").textContent == 0) {
        document.getElementById("num").textContent = "";
      }
    }
  }
}

function clearAll() {
  document.getElementById("num").textContent = "";
  document.getElementById("num-decimal").textContent = "";
  document.getElementById("numResult").textContent = "";
  document.getElementById("num-decimalResult").textContent = "";
}

function changeMode(mode1) {
  const buttonBinary = document.getElementById("btn-binary");
  const buttonDecimal = document.getElementById("btn-decimal");
  const buttonN = document.getElementById("btn--");

  for (let i = 2; i <= 9; i++) {
    const button = document.getElementById(`btn-${i}`);
    if (mode1) {
      button.hidden = true;
    } else {
      button.hidden = false;
    }
  }

  if (mode1) {
    buttonBinary.disabled = true;
    buttonDecimal.disabled = false;
    buttonN.hidden = true;
  } else {
    buttonBinary.disabled = false;
    buttonDecimal.disabled = true;
    buttonN.hidden = false;
  }
  mode = mode1;
}

changeMode(mode);
