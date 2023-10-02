console.log('client.js sourced');

let answerDisplay = document.querySelector('#answer-display');
let equationDisplay = document.querySelector('#equation-display');
let operator = '';
const buttonColor = document.getElementsByClassName('operator');
console.log(calculator);

function runNumbers(event) {
    event.preventDefault();
    let equationInput = document.querySelector('#equation-input').value;
    //firstNumber = Number(firstNumber);
    //let secondNumber = document.querySelector('#second-number').value;
    //secondNumber = Number(secondNumber);

    // Check if any part of the input is missing
    if (!equationInput.includes('+', '-', '*', '/') || !/^\d/.test(equationInput) || !/\d+$/.test(equationInput)) {
        console.log(`${equationInput} is invalid`);
        alert('Please enter a valid equation');
        return;
    } else {
        equationInput.split('')
        console.log('Cant do both!');
        return;
    }
    //let finalAnswer = 0;
    // IF OPERATOR == '' THEN DO NOTHING - FOR STRETCH GOAL
    // USE .SPLIT() TO SEPARATE FIRST NUMBER AND SECOND NUMBER!
    // USE .CONTAINS() TO CHECK FOR A MATH OPERATOR.
    // USE .IndexOf() to check that the first and last of the string are numbers!
     console.log(`${firstNumber} ${operator} ${secondNumber}`);
    axios.post('/calculate', {
        firstNumber: firstNumber,
        operator: operator,
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
            <tr onClick="displayAnswer(${equation.finalAnswer})">
                <td>${equation.firstNumber} ${equation.operator} ${equation.secondNumber}</td>
                <td> = ${equation.finalAnswer}</td>`
        }
    }).catch((error) => {
        console.error(error);
        alert('Equations could not be displayed.')
    })
}
displayEquations();

function addFunction(event) {
    operator = '+';
    clearFunctions(); // clear every other color if you change it
    event.target.style.backgroundColor = 'yellow';
}

function subtractFunction(event) {
    operator = '-';
    clearFunctions();
    event.target.style.backgroundColor = 'yellow';
}

function multiplyFunction(event) {
    operator = '*';
    clearFunctions();
    event.target.style.backgroundColor = 'yellow';
}

function divideFunction(event) {
    operator = '/';
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

// Click on an equation to display the answer
// Change this to RESEND the function to server
// Use its position in the server Calculator array to create the onClick
// So: onClick="resubmit(CalculatorArray[i])" so the server will know exactly which 
// equation to resubmit. Also need to display it at the top.
// Could even just send a number and let the number figure it out.
function displayAnswer(answer) {
    console.log(answer);
    answerDisplay.innerHTML = answer;
}

function displayClick(val) {
    let input = document.querySelector('#equation-input').value;
    console.log(input);
    if (input.includes('+', '-', '*', '/')) {
        console.log('This happened.');
        return;
    } else {
    document.querySelector('#equation-input').value += val;
    console.log(document.querySelector('#equation-input').value);
    }
}