console.log('client.js sourced');

let answerDisplay = document.querySelector('#answer-display');
let equationDisplay = document.querySelector('#equation-display');
let operator = '';
const buttonColor = document.getElementsByClassName('operator');

function runNumbers(event) {
    event.preventDefault();
    let equationInput = document.querySelector('#equation-input').value;
    let firstNumber;
    let secondNumber;

    // Check if any part of the input is missing
    if (!(equationInput.includes('+') || equationInput.includes('-') || equationInput.includes('*') || equationInput.includes('/')) || !/^\d/.test(equationInput) || !/\d+$/.test(equationInput)) {
        console.log(`${equationInput} is invalid`);
        alert('Please enter a valid equation');
        return;
    } else {
        equationArray = equationInput.split(`${operator}`)
        sendEquationToServer(equationArray)
    }
}

function sendEquationToServer(equationInput) {
    console.log(equationInput);
        axios.post('/calculate', {
        firstNumber: Number(equationInput[0]),
        operator: operator,
        secondNumber: Number(equationInput[1])
    }).then((response) => {
        console.log('Calculation sent to server');
        clearInputs(); // Clears out the display
        displayEquations(); // displays the equations
    }).catch((error) => {
        console.error(error);
        alert('Something went wrong');
    })
}
// Displaying the functions on the DOM
function displayEquations() {
    axios.get('/calculate').then((response) => {
        let equations = response.data;
        console.log(equations);
        equationDisplay.innerHTML = '';
        answerDisplay.innerHTML = '';
        // Ensuring there is something to put into the display
        if (equations.length > 0) {
            // equations.length - 1 is always the last equation. So it is always the displayed equation.
            answerDisplay.innerHTML = `${equations[(equations.length - 1)].finalAnswer}`;
        }
        i = 0;
        for (let equation of equations) {
            equationDisplay.innerHTML += `
            <tr onClick="redoEquation(${i})">
                <td><li>${equation.firstNumber} ${equation.operator} ${equation.secondNumber}</li></td>`
                i++;
        }
    }).catch((error) => {
        console.error(error);
        alert('Equations could not be displayed.')
    })
}
displayEquations();

// Condensed setting the operator into this one function!
function displayOperator(val, event) {
    let input = document.querySelector('#equation-input').value;
    if (input.includes('+') || input.includes('-') || input.includes('*')  || input.includes('/')) {
        console.log("Can't add another operator");
        return;
    } else {
        // added spaces around my operators for readability so gotta get rid of those!
        operator = val.trim(); 
        clearFunctions();
        event.target.style.backgroundColor = '#D9C096';
        document.querySelector('#equation-input').value += val;
    }
}
// This function clears all operators of any color
function clearFunctions() {
    for (let button of buttonColor) {
        button.style.backgroundColor = 'white';
    }
}
// This function removes all inputs after an equation is sent
function clearInputs(event) {
    clearFunctions();
    document.querySelector('#equation-input').value = '';
}


function redoEquation(index) {
    console.log('Redo Equation at', index);
    axios.get(`/calculate/${index}`).then(() => {
        displayEquations();
    }).catch((error) => {
        console.error(error);
        alert('Redo Equation didnt work');
    })
}

// Displays whatever input has been selected into the field.
function displayClick(val) {
    document.querySelector('#equation-input').value += val.trim();
}

// clearHistory iterates through the indices of the Calculator array
function clearHistory(index) {
    axios.delete(`/calculate/${index}`).then(() => {
        console.log('Delete request sent to server');
        displayEquations();
    }).catch((error) => {
        console.error(error);
        alert('History could not be deleted');
    })
}

console.log(parseFloat(1/3));
console.log(parseFloat(0.33333));
console.log(parseFloat(1/2))