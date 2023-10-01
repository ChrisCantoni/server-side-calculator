const express = require('express');
const app = express();
const PORT = 5003;

app.use(express.json());
app.use(express.static('server/public'));

const calculator = [];



app.post('/calculate', (req, res) => {
    console.log(req.body);
    let newCalc = req.body;
    getAnswer(newCalc);
    res.sendStatus(201);
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

function getAnswer(newCalc) {
    if (newCalc.typeOfMath == '+') {
        newCalc.finalAnswer = newCalc.firstNumber + newCalc.secondNumber;
    } else if (newCalc.typeOfMath == '-') {
        newCalc.finalAnswer = newCalc.firstNumber - newCalc.secondNumber;
    }
        
    else {
        console.log('Something went wrong');
    }
    calculator.push(newCalc);
    console.log(calculator);
}