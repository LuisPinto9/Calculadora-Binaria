var mode = true;
const operators = ["—", "+", "*", "/", ">", "<"];
var bits = "4";

function changeBits() {
  bits = document.getElementById("bits-options").value;
}

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
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

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
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

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
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

  // Realiza la multiplicación decimal
  let product = decimal1 * decimal2;

  // Verifica si hay sobreflujo o subflujo
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  console.log(maxDecimalValue);
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable
  console.log(minDecimalValue);

  // Si hay sobreflujo o subflujo, ajusta el valor
  if (product > maxDecimalValue || product < minDecimalValue) {
    alert(
      `El resultado de la multiplicación se sale del rango de números repressentables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${bits * 2
      } bits`
    );
    product = "0";
    // product = product & ((1 << bits) - 1); // Aplica máscara para ajustar al rango permitido
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
  const decimal = complementoDosToDecimal(num);

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
  const decimal = complementoDosToDecimal(num);

  // Realiza el desplazamiento a la derecha
  let shifted = decimal >> 1;

  // Verifica si el número original es negativo para replicar el bit de signo
  if (decimal < 0) {
    shifted |= 1 << (bits - 1); // Replica el bit de signo (1) a la derecha
  }

  // Convierte el resultado a binario en complemento a 2
  return complementoDos(shifted, bits);
}



// function calculate() {
//   const num1 = document.getElementById("num1").value;
//   const num2 = document.getElementById("num2").value;
//   const operator = document.getElementById("operator").value;
//   const bits = parseInt(document.getElementById("bits").value); // Número de bits seleccionados

//   let result;

//   switch (operator) {
//     case "add":
//       result = sumBinary(num1, num2, bits);
//       break;
//     case "subtract":
//       result = subtractBinary(num1, num2, bits);
//       break;
//     case "multiply":
//       result = multiplyBinary(num1, num2, bits);
//       break;
//     case "divide":
//       result = divideBinary(num1, num2, bits);
//       break;
//     case "leftShift":
//       result = leftShiftBinary(num1, bits);
//       break;
//     case "rightShift":
//       result = rightShiftBinary(num1, bits);
//       break;
//     default:
//       break;
//   }

//   if (typeof result === "object") {
//     document.getElementById(
//       "result"
//     ).value = `Cociente: ${result.quotient}, Residuo: ${result.remainder}`;
//     document.getElementById(
//       "result-decimal"
//     ).value = `Cociente: ${complementoDosToDecimal(
//       result.quotient
//     )}, Residuo: ${complementoDosToDecimal(result.remainder)}`;
//   } else {
//     // result = "0" + result
//     document.getElementById("result").value = result;
//     document.getElementById("result-decimal").value =
//       complementoDosToDecimal(result);
//   }
// }

function calculate() {
  const numExpression = document.getElementById("num").textContent;
  const bits = parseInt(document.getElementById("bits-options").value); 


  let operator = "";
  for (let i = 0; i < operators.length; i++) {
    if (numExpression.includes(operators[i])) {
      operator = operators[i];
      break; 
    }
  }

  if (operator) {
    
    const [num1, num2] = numExpression.split(operator);
    console.log("result", num1, num2, bits);

    let result;

    switch (operator) {
      case "+":
        result = sumBinary(num1, num2, bits);
        console.log("resultsss=",result);
        break;
      case "-":
        result = subtractBinary(num1, num2, bits);
        break;
      case "*":
        result = multiplyBinary(num1, num2, bits);
        break;
      case "/":
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
      document.getElementById("numResult").textContent = `Cociente: ${result.quotient}, Residuo: ${result.remainder}`;
     document.getElementById("num-decimalResult").textContent = `Cociente: ${complementoDosToDecimal(result.quotient)}, Residuo: ${complementoDosToDecimal(result.remainder)}`;
    } else {
      document.getElementById("numResult").textContent = result;
       document.getElementById("num-decimalResult").textContent = complementoDosToDecimal(result);
    }

  } else {
    console.error("No se encontró un operador en la expresión.");
  }
}

function convertToDecimal(inputId) {
  const binaryValue = document.getElementById(inputId).value;
  const decimalValue = complementoDosToDecimal(binaryValue);
  document.getElementById(inputId + "-decimal").value = decimalValue;
}

function complementoDosToDecimal(binary) {
  // binary = "0" + binary
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
  document.getElementById("num1").value = result;
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
  document.getElementById("num2").value = result;
}

function appendToNum(digit) {
  let num = document.getElementById("num").textContent;
  let numDecimal = document.getElementById("num-decimal").textContent;
  let operatorCount = 0;
  let operator = "";

  for (let i = 0; i < operators.length; i++) {
    if (num.includes(operators[i])) {
      if (operatorCount == 0) {
        operator = operators[i];
      }
      operatorCount++;
    }
  }

  if (operatorCount < 1 || (operatorCount === 1 && !operators.includes(digit))) {
    if (mode) {
      if (operatorCount == 1) {
        document.getElementById("num").textContent = num + digit;
        let num1 = num + digit;
        const decimalValues = num1.split(operator).map((value) => complementoDosToDecimal(value)).join(operator);
        document.getElementById("num-decimal").textContent = decimalValues;
      } else {
        document.getElementById("num").textContent = num + digit;
        let decimalValues = "";
        operators.includes(digit) ? (decimalValues = numDecimal + digit) : (decimalValues = complementoDosToDecimal(num + digit));
        document.getElementById("num-decimal").textContent = decimalValues;
      }
    } else {
      if (operatorCount == 1) {
        document.getElementById("num-decimal").textContent = numDecimal + digit;
        let numDecimal1 = numDecimal + digit;
        const binary = numDecimal1.split(operator).map((value) => complementoDos(value, bits)).join(operator);
        document.getElementById("num").textContent = binary;
      } else {
        document.getElementById("num-decimal").textContent = numDecimal + digit;
        let binary = "";
        operators.includes(digit) ? (binary = num + digit) : (binary = complementoDos(numDecimal + digit, bits));
        document.getElementById("num").textContent = binary;
      }
    }
  } else {
    alert("No se puede ingresar más de un operador.");
  }
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
      if (operatorCount == 1) {
        const decimalValues = num.split(operator).map((value) => complementoDosToDecimal(value)).join(operator);
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
      if (operatorCount1 == 1) {
        const binary = numDecimal.split(operator1).map((value) => complementoDos(value, bits)).join(operator1);
        document.getElementById("num").textContent = binary;
      } else {
        const binary = complementoDos(numDecimal, bits);
        document.getElementById("num").textContent = binary;
      }
      if (document.getElementById("num").textContent == "0") {
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
