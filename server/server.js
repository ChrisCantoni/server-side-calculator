const express = require('express');
const app = express();
const PORT = 5003;

app.use(express.json());
app.use(express.static('server/public'));

const calculator = [];



app.post('/calculate', (req, res) => {
    let newCalc = req.body;
    getAnswer(newCalc);
    res.sendStatus(201);
})


app.get('/calculate', (req, res) => {
    res.send(calculator);
})

function getAnswer(equation) {
    if (equation.operator == '+') {
        equation.finalAnswer = equation.firstNumber + equation.secondNumber;
        console.log(`Final answer calculated: ${equation.finalAnswer}`);
    } else if (equation.operator == '-') {
        equation.finalAnswer = equation.firstNumber - equation.secondNumber;
    } else if (equation.operator == '*') {
        equation.finalAnswer = equation.firstNumber * equation.secondNumber;
    } else if (equation.operator == '/') {
        equation.finalAnswer = equation.firstNumber / equation.secondNumber;
    } else {
        console.log('Something went wrong');
    }
    console.log(`Before app.get ${equation.finalAnswer}`);
    displayCalc(equation);
    calculator.push(equation);
    console.log(`Outside of app.get: ${equation.finalAnswer}`)
    console.log(calculator);
}
// TODO: Redo the original app.post instead of this
// Get rid of the below
app.post('/display', (req, res) => {
    console.log(req.body);
    let redoEquation = req.body;
    displayCalc(redoEquation);
    res.sendStatus(201);
})

function displayCalc(equation) {
    app.get('/finalAnswer', (req, res) => {
        console.log('we are in displayCalc')
        console.log(`Equation is: ${equation.firstNumber} ${equation.operator} ${equation.secondNumber}`);
        console.log(`The answer is ${equation.finalAnswer}`);
        stringAnswer = equation.finalAnswer.toString();
        res.send(stringAnswer);
    })
}
// app.delete('/calculate', (req, res) => {
//     calculator = [];
//     res.sendStatus(201);
// })



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})