let currentInput = '0';
let previousInput = '0';
let operation = null;
let resetScreen = false;

const displayCurrent = document.querySelector('.current');
const displayPrevious = document.querySelector('.previous');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value >= '0' && value <= '9') {
      appendNumber(value);
    } else if (value === '.') {
      appendDecimal();
    } else if (value === 'AC') {
      clearAll();
    } else if (value === 'DEL') {
      deleteLast();
    } else if (value === '=') {
      compute();
    } else {
      chooseOperation(value);
    }

    updateDisplay();
  });
});

function appendNumber(number) {
  if (currentInput === '0' || resetScreen) {
    currentInput = number;
    resetScreen = false;
  } else {
    currentInput += number;
  }
}

function appendDecimal() {
  if (resetScreen) {
    currentInput = '0.';
    resetScreen = false;
    return;
  }
  if (currentInput.includes('.')) return;
  currentInput += '.';
}

function clearAll() {
  currentInput = '0';
  previousInput = '0';
  operation = null;
}

function deleteLast() {
  if (currentInput.length === 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
}

function chooseOperation(op) {
  if (operation !== null) compute();
  previousInput = currentInput;
  operation = op;
  resetScreen = true;
}

function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toLocaleString('en-IN'); // with commas
  operation = null;
}

function updateDisplay() {
  displayCurrent.textContent = currentInput;
  if (operation != null) {
    displayPrevious.textContent = `${previousInput} ${operation}`;
  } else {
    displayPrevious.textContent = '';
  }
}
