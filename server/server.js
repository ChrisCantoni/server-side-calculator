const express = require('express');
const app = express();
const PORT = 5003;

app.use(express.json());
app.use(express.static('server/public'));

let calculator = [];

// Receiving current equation from client
app.post('/calculate', (req, res) => {
    let newCalc = req.body;
    getAnswer(newCalc);
    res.sendStatus(201);
})

app.get('/calculate/:index', (req, res) => {
    console.log('calculate', req.params);
    let index = Number(req.params.index);
    getAnswer(calculator[index]); // Send equation to be redone
    //calculator.splice(`${index}`, 1); // Remove equation from array (to be added at the bottom)
    // Removed but left in just in case I wanted to re-implement it
    res.sendStatus(200);
})

// Sending the current calculator array to client
app.get('/calculate', (req, res) => {
    res.send(calculator);
})

// This function is where the calculations happen and then each equation
// object pushed to the calculator array.
function getAnswer(equation) {
    if (equation.operator == '+') {
        equation.finalAnswer = equation.firstNumber + equation.secondNumber;
    } else if (equation.operator == '-') {
        equation.finalAnswer = equation.firstNumber - equation.secondNumber;
    } else if (equation.operator == '*') {
        equation.finalAnswer = equation.firstNumber * equation.secondNumber;
    } else if (equation.operator == '/') {
        equation.finalAnswer = equation.firstNumber / equation.secondNumber;
    } else {
        console.log('Something went wrong');
    }
    if (!Number.isInteger(equation.finalAnswer)) {
        console.log(equation.finalAnswer);
        // Arbitrarily stopping decimal places at 3
        equation.finalAnswer = parseFloat(equation.finalAnswer);
    }
    // Adding new equation to the array
    calculator.push(equation);
    console.log(calculator);
}
// Clears the entire calculator history
app.delete('/calculate/:index', (req, res) => {
    calculator = calculator.filter((calc, i) => {
        return i < Number(req.params.index); // This seems like the wrong execution, but it works!
    })
    res.sendStatus(201);
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})