console.log('client.js sourced');

let answerDisplay = document.querySelector('#answer-display');
let equationDisplay = document.querySelector('#equation-display');
let typeOfMath = '';
const buttonColor = document.getElementsByClassName('typeOfMath');
console.log(calculator);

function runNumbers(event) {
    event.preventDefault();
    let firstNumber = document.querySelector('#first-number').value;
    firstNumber = Number(firstNumber);
    let secondNumber = document.querySelector('#second-number').value;
    secondNumber = Number(secondNumber);
    //let finalAnswer = 0;
    console.log(`${firstNumber} ${typeOfMath} ${secondNumber}`);
    axios.post('/calculate', {
        firstNumber: firstNumber,
        typeOfMath: typeOfMath,
        secondNumber: secondNumber
    }).then((response) => {
        console.log('Calculation sent to server');
    }).catch((error) => {
        console.error(error);
        alert('Something went wrong');
    })
    axios.get('/finalAnswer').then((response) => {
        let finalAnswer = response.data;
        console.log(finalAnswer);
        answerDisplay.innerHTML = `${finalAnswer}`;
    }).catch((error) => {
        console.error(error);
        alert('Could not display final answer');
    })
    displayEquations();
}

function displayEquations() {
    axios.get('/calculate').then((response) => {
        let equations = response.data;
        console.log(equations);
        equationDisplay.innerHTML = '';
        for (let equation of equations) {
            equationDisplay.innerHTML += `
            <tr>
                <td>${equation.firstNumber} ${equation.typeOfMath} ${equation.secondNumber}</td>
                <td> = ${equation.finalAnswer}</td>`
        }
    }).catch((error) => {
        console.error(error);
        alert('Equations could not be displayed.')
    })
}
displayEquations();

function addFunction(event) {
    typeOfMath = '+';
    clearFunctions(); // clear every other color if you change it
    event.target.style.backgroundColor = 'yellow';
}

function subtractFunction(event) {
    typeOfMath = '-';
    clearFunctions();
    event.target.style.backgroundColor = 'yellow';
}

function multiplyFunction(event) {
    typeOfMath = '*';
    clearFunctions();
    event.target.style.backgroundColor = 'yellow';
}

function divideFunction(event) {
    typeOfMath = '/';
    clearFunctions();
    event.target.style.backgroundColor = 'yellow';
}

function clearFunctions() {
    for (let button of buttonColor) {
        button.style.backgroundColor = 'white';
    }
}

function clearInputs(event) {
    clearFunctions();
    document.querySelector('#first-number').value = '';
    document.querySelector('#second-number').value = '';
}
