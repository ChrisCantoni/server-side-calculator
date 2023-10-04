console.log('client.js sourced');

let answerDisplay = document.querySelector('#answer-display');
let equationDisplay = document.querySelector('#equation-display');
let operator = '';
let historyCount = 0;
const buttonColor = document.getElementsByClassName('operator');
console.log(calculator);

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
        // firstNumber = equationArray[0];
        // secondNumber = equationArray[1];
        // // Gotta turn them back into numbers!
        // firstNumber = Number(firstNumber);
        // secondNumber = Number(secondNumber);
        sendEquationToServer(equationArray)
    }
        // DISPLAY IS ONLY SHOWING THE FIRST FINAL ANSWER

     // TODO: Take axios.post out of this function and make it its own function for
     // TODO: sending each calculation to the server

    // axios.get('/finalAnswer').then((response) => {
    //     console.log(`Response data: ${response.data}`)
    //     let finalAnswer = response.data;
    //     console.log(finalAnswer);
    //     answerDisplay.innerHTML = `${finalAnswer}`;
    // }).catch((error) => {
    //     console.error(error);
    //     alert('Could not display final answer');
    // })
    displayEquations();
    clearInputs();
}

// TODO: Fix this to work with clicking on an equation
function sendEquationToServer(equationInput) {
    console.log(equationInput);
        axios.post('/calculate', {
        firstNumber: Number(equationInput[0]),
        operator: operator,
        secondNumber: Number(equationInput[1])
    }).then((response) => {
        console.log('Calculation sent to server');
    }).catch((error) => {
        console.error(error);
        alert('Something went wrong');
    })
}

function displayEquations() {
    axios.get('/calculate').then((response) => {
        let equations = response.data;
        console.log(equations);
        equationDisplay.innerHTML = '';
        for (let equation of equations) {
            equationDisplay.innerHTML += `
            <tr onClick="displayAnswer(event)">
                <td>${equation.firstNumber} ${equation.operator} ${equation.secondNumber}</td>
                <td> = ${equation.finalAnswer}</td>`
                historyCount++
        }
        historyCount = 0;
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
        operator = val;
        clearFunctions();
        event.target.style.backgroundColor = 'yellow';
        document.querySelector('#equation-input').value += val;
    }
}

function clearFunctions() {
    for (let button of buttonColor) {
        button.style.backgroundColor = 'white';
    }
}

function clearInputs(event) {
    clearFunctions();
    document.querySelector('#equation-input').value = '';
}

// TODO: Right idea for the below but wrong execution.
// TODO: Use today's lecture to figure out a better way
// Click on an equation to display the answer
// Change this to RESEND the function to server
// Use its position in the server Calculator array to create the onClick
// So: onClick="resubmit(CalculatorArray[i])" so the server will know exactly which 
// equation to resubmit. Also need to display it at the top.
// Could even just send a number and let the number figure it out.
function displayAnswer(event) {
    console.log(event.target.innerHTML);
    let redoEquation = event.target.innerHTML;
    redoEquation = redoEquation.split(' ');
    console.log(redoEquation);
    let redoFirst = Number(redoEquation[0]);
    let redoOperator = redoEquation[1];
    let redoSecond = Number(redoEquation[2]);
    axios.post('/display', {
        firstNumber: redoFirst,
        operator: redoOperator,
        secondNumber: redoSecond
    }).then((response) => {
        console.log(`Checking calculations`)
    }).catch((error) => {
        console.error(error);
        alert("Could not recalculate");
    })
}
// TODO: For displaying the answer when you click, GET request to get the answer at a certain index


function displayClick(val) {
    document.querySelector('#equation-input').value += val;
}



// function clearHistory(event) {
//     axios.delete('/calculate').then((response) => {
//         console.log('Delete request sent to server');
//     }).catch((error) => {
//         console.error(error);
//         alert('History could not be deleted');
//     })
// }