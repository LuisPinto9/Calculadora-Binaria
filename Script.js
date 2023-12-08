var mode = true;
const operators = ["−", "+", "×", "/"];
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
  // Asegura que ambas cadenas tengan la misma longitud agregando ceros a la izquierda si es necesario
  const maxLength = Math.max(num1.length, num2.length);

  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  let sum = "";
  let carry = 0;

  let carryant = 0;
  // Itera sobre los dígitos binarios de derecha a izquierda
  for (let i = maxLength - 1; i >= 0; i--) {
    const bit1 = parseInt(num1[i]);
    const bit2 = parseInt(num2[i]);

    // Realiza la suma de los bits y del acarreo anterior
    const total = bit1 + bit2 + carry;
    carryant = carry;
    // Calcula el bit actual del resultado y el acarreo para la siguiente suma
    const resultBit = total % 2;
    carry = total >= 2 ? 1 : 0;
    // Agrega el bit al inicio de la cadena del resultado
    sum = resultBit.toString() + sum;
  }

  if (carryant != carry) {
    alert(
      `El resultado de la suma se sale del rango de números representables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${
        bits * 2
      } bits.`
    );
    sum = "Sobreflujo";
  }

  return sum;
}

function subtractBinary(num1, num2) {
  // Asegura que ambas cadenas tengan la misma longitud agregando ceros a la izquierda si es necesario
  const maxLength = Math.max(num1.length, num2.length);

  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  let result = "";
  let borrow = 0;
  let borrowant = 0;

  // Itera sobre los dígitos binarios de derecha a izquierda
  for (let i = maxLength - 1; i >= 0; i--) {
    const bit1 = parseInt(num1[i]);
    const bit2 = parseInt(num2[i]);

    // Realiza la resta de los bits y del préstamo anterior
    let total = bit1 - bit2 - borrow;
    borrowant = borrow;

    // Ajusta el préstamo según el resultado de la resta
    if (total < 0) {
      total += 2;
      borrow = 1;
    } else {
      borrow = 0;
    }

    // Agrega el bit al inicio de la cadena del resultado
    result = total.toString() + result;
  }

  if (borrowant !== borrow) {
    alert(
      `El resultado de la resta se sale del rango de números representables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${
        bits * 2
      } bits.`
    );
    result = "Sobreflujo";
  }

  return result;
}

function sum(num1, num2) {
  // Asegura que ambas cadenas tengan la misma longitud agregando ceros a la izquierda si es necesario
  const maxLength = Math.max(num1.length, num2.length);

  if (num1.length !== num2.length) {
    if (num1.length < num2.length) {
      while (num1.length < num2.length) {
        num1 = "0" + num1;
      }
    } else if (num1.length > num2.length) {
      while (num1.length > num2.length) {
        num2 = "0" + num2;
      }
    }
  }

  let sum = "";
  let carry = 0;

  // Itera sobre los dígitos binarios de derecha a izquierda
  for (let i = maxLength - 1; i >= 0; i--) {
    const bit1 = parseInt(num1[i]);
    const bit2 = parseInt(num2[i]);

    // Realiza la suma de los bits y del acarreo anterior
    const total = bit1 + bit2 + carry;
    // Calcula el bit actual del resultado y el acarreo para la siguiente suma
    const resultBit = total % 2;
    carry = total >= 2 ? 1 : 0;
    // Agrega el bit al inicio de la cadena del resultado
    sum = resultBit.toString() + sum;
  }

  if (sum.length > bits) {
    sum = sum.slice(-bits); // Recorta los bits sobrantes manteniendo solo los últimos 'bits' dígitos
  }

  return sum;
}

function subtract(num1, num2) {
  // Asegura que ambas cadenas tengan la misma longitud agregando ceros a la izquierda si es necesario
  const maxLength = Math.max(num1.length, num2.length);

  let result = "";
  let borrow = 0;

  // Itera sobre los dígitos binarios de derecha a izquierda
  for (let i = maxLength - 1; i >= 0; i--) {
    const bit1 = parseInt(num1[i]);
    const bit2 = parseInt(num2[i]);

    // Realiza la resta de los bits y del préstamo anterior
    let total = bit1 - bit2 - borrow;

    // Ajusta el préstamo según el resultado de la resta
    if (total < 0) {
      total += 2;
      borrow = 1;
    } else {
      borrow = 0;
    }

    // Agrega el bit al inicio de la cadena del resultado
    result = total.toString() + result;
  }

  return result;
}

function multiplyBinary(num1, num2) {
  const maxDecimalValue = Math.pow(2, bits - 1) - 1; // Calcula el máximo valor positivo representable
  const minDecimalValue = -Math.pow(2, bits - 1); // Calcula el máximo valor negativo representable

  let num1Decimal = complementoDosToDecimal(num1);
  let num2Decimal = complementoDosToDecimal(num2);

  let decimalResult = num1Decimal * num2Decimal;

  let A = "";
  while (A.length < bits) {
    A += "0";
  }

  while (complementoDosToDecimal(num2) !== 0) {
    if (num2[num2.length - 1] === "1") {
      A = sum(A, num1);
    }

    num1 = num1.slice(0) + "0"; // Agregar un 0 a la derecha de X (multiplicación por 2 en binario)
    num2 = "0" + num2.slice(0, -1); // Quitar el bit menos significativo de Y (división por 2 en binario)
  }

  if (decimalResult !== complementoDosToDecimal(A)) {
    alert(
      `El resultado de la multiplicación se sale del rango de números representables [${minDecimalValue}, ${maxDecimalValue}], intente utilizar ${
        bits * 2
      } bits.`
    );
    A = "Sobreflujo";
  }

  return A;
}

function divideBinary(num1, num2) {
  // Convierte los números binarios a decimales
  const decimal1 = complementoDosToDecimal(num1);
  const decimal2 = complementoDosToDecimal(num2);

  // Manejo de división por cero
  if (decimal2 === 0) {
    return "División por cero";
  }

  if (decimal1 < 0) {
    let conversion = Math.abs(decimal1);
    num1 = complementoDos(conversion);
  }

  if (decimal2 < 0) {
    let conversion = Math.abs(decimal2);
    num2 = complementoDos(conversion);
  }

  let R = num1;
  let C = "";

  while (C.length < bits) {
    C += "0";
  }

  let n1 = "1";

  while (n1.length < bits) {
    n1 = "0" + n1;
  }

  while (R >= num2) {
    R = subtract(R, num2);
    C = sum(C, n1);
  }

  let aux = "1";
  while (aux.length < bits) {
    aux = "0" + aux;
  }

  if (decimal1 < 0 && decimal2 > 0) {
    C = C.split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join(""); // Invierte los bits
    C = sum(C, aux);
    R = R.split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join(""); // Invierte los bits
    R = sum(R, aux);
  } else if (decimal1 > 0 && decimal2 < 0) {
    C = C.split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join(""); // Invierte los bits
    C = sum(C, aux);
  } else if (decimal1 < 0 && decimal2 < 0) {
    R = R.split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join(""); // Invierte los bits
    R = sum(R, aux);
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

    return { quotient: "Sobreflujo", remainder: "Sobreflujo" };
  } else {
    return { quotient: C, remainder: R };
  }
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
    let [num1, num2] = numExpression.split(operator);

    num1 = num1.padStart(bits, num1[0]);
    num2 = num2.padStart(bits, num2[0]);

    let result;

    switch (operator) {
      case "+":
        result = sumBinary(num1, num2);
        break;
      case "−":
        result = subtractBinary(num1, num2);
        break;
      case "×":
        result = multiplyBinary(num1, num2);
        break;
      case "/":
        result = divideBinary(num1, num2);
        break;
      default:
        break;
    }
    //osea la division
    if (typeof result === "object") {
      document.getElementById(
        "numResult"
      ).textContent = `= Cociente: ${result.quotient}, Residuo: ${result.remainder}`;

      if (result.quotient == "Sobreflujo" || result.remainder == "Sobreflujo") {
        document.getElementById(
          "num-decimalResult"
        ).textContent = `= Cociente: ${result.quotient}, Residuo: ${result.remainder}`;
      } else {
        document.getElementById(
          "num-decimalResult"
        ).textContent = `= Cociente: ${complementoDosToDecimal(
          result.quotient
        )}, Residuo: ${complementoDosToDecimal(result.remainder)}`;
      }
    } else {
      document.getElementById("numResult").textContent = "= " + result;

      if (result == "Sobreflujo") {
        document.getElementById("num-decimalResult").textContent =
          "= " + result;
      } else {
        document.getElementById("num-decimalResult").textContent =
          "= " + complementoDosToDecimal(result);
      }
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
