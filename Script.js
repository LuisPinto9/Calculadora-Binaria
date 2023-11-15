function calculate() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operator = document.getElementById('operator').value;
    let result;
  
    switch (operator) {
      case 'add':
        result = parseInt(num1, 2) + parseInt(num2, 2);
        break;
      case 'subtract':
        result = parseInt(num1, 2) - parseInt(num2, 2);
        break;
      case 'multiply':
        result = parseInt(num1, 2) * parseInt(num2, 2);
        break;
      case 'divide':
        result = parseInt(num1, 2) / parseInt(num2, 2);
        break;
      default:
        break;
    }
  
    document.getElementById('result').value = result.toString(2);
  }
  