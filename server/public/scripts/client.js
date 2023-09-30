console.log('client.js sourced');

let answerDisplay = document.querySelector('#answer-display');

function runNumbers(event) {
    event.preventDefault();
    let firstNumber = document.querySelector('#first-number').value;
    firstNumber = Number(firstNumber);
    let secondNumber = document.querySelector('#second-number').value;
    secondNumber = Number(secondNumber);
    finalAnswer = firstNumber + secondNumber;
    answerDisplay.innerHTML += `
        <tr>
            <td>${firstNumber} + ${secondNumber}</td>
            <td>= ${finalAnswer}</td>
    `
}