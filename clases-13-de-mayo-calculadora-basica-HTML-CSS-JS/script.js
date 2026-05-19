// Referencias a los elementos de entrada del HTML
const firstNumberInput = document.getElementById("number1");
const secondNumberInput = document.getElementById("number2");
const resultText = document.getElementById("result");

// Referencias a los botones de operaciones
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");

// Función que obtiene y convierte a número los valores escritos por el usuario
const getNumbers = () => {
    const firstNumber = parseFloat(firstNumberInput.value);
    const secondNumber = parseFloat(secondNumberInput.value);

    // Devuelve ambos números agrupados en un objeto
    return { firstNumber, secondNumber };
};

// Función que muestra un texto dentro del área de resultado
const showResult = (text) => {
    resultText.textContent = text;
};

// Función que valida que ambos valores sean números válidos
const validateNumbers = (firstNumber, secondNumber) => {
    return !isNaN(firstNumber) && !isNaN(secondNumber);
};

// Evento del botón de suma
addButton.addEventListener("click", () => {
    const { firstNumber, secondNumber } = getNumbers();

    if (validateNumbers(firstNumber, secondNumber)) {
        showResult(firstNumber + secondNumber);
    } else {
        showResult("You must enter two numbers.");
    }
});

// Evento del botón de resta
subtractButton.addEventListener("click", () => {
    const { firstNumber, secondNumber } = getNumbers();

    if (validateNumbers(firstNumber, secondNumber)) {
        showResult(firstNumber - secondNumber);
    } else {
        showResult("You must enter two numbers.");
    }
});

// Evento del botón de multiplicación
multiplyButton.addEventListener("click", () => {
    const { firstNumber, secondNumber } = getNumbers();

    if (validateNumbers(firstNumber, secondNumber)) {
        showResult(firstNumber * secondNumber);
    } else {
        showResult("You must enter two numbers.");
    }
});

// Evento del botón de división
divideButton.addEventListener("click", () => {
    const { firstNumber, secondNumber } = getNumbers();

    if (!validateNumbers(firstNumber, secondNumber)) {
        showResult("You must enter two numbers.");
    } else if (secondNumber === 0) {
        showResult("Cannot divide by zero.");
    } else {
        showResult(firstNumber / secondNumber);
    }
});