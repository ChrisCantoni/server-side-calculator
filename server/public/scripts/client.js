console.log('client.js sourced');

let answerDisplay = document.querySelector('#answer-display');
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
    // if (typeOfMath == '+') {
    //     finalAnswer = firstNumber + secondNumber;
        
    // } else if (typeOfMath == '-') {
    //     finalAnswer = firstNumber - secondNumber;
    // }
        
    //     else {
    //         console.log('Something went wrong');
    //     }
    //     answerDisplay.innerHTML += `
    //         <tr>
    //             <td>${firstNumber} ${typeOfMath} ${secondNumber}</td>
    //             <td>= ${finalAnswer}</td>`
}

function addFunction(event) {
    typeOfMath = '+';
    clearFunctions(); // clear every other color if you change it
    event.target.style.backgroundColor = 'yellow';
}

function clearFunctions() {
    for (let button of buttonColor) {
        button.style.backgroundColor = 'white';
    }
}

function subtractFunction(event) {
    typeOfMath = '-';
    clearFunctions();
    event.target.style.backgroundColor = 'yellow';
}