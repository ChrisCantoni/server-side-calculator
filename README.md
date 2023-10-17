# Server-side Calculator

## Description

This project required me to build a fully-functioning calculator app utilizing server-side calculations and replicating your typical handheld calculator. The calculator can be used for decimal input, and can add, subtract, multiply, and divide. Equations are only calculated once an appropriate sequence of number, operator, number has been entered. Once an equation is ready, the input is sent to the server to calculate and then return the answer and display it on the DOM, additionally keeping a history of equations below the display.

There are also buttons to clear the input field as well as clear the history of calculations, which display themselves below the calculator itself.

Clicking on any calculation will rerun that calculation and display the results, as well as losslessly adding that calculation to the bottom of the calculator's history.

The calculator was designed to have a familiar layout for ease of use, with large button text to make each button and its function clear.

## Screenshot
![A screenshot of the calculator layout with history of calculation below](/images/calculator_image.png?raw=true "Calculator screenshot")

## Skills Practiced
- Javascript
- Express & Node for server
- HTML & CSS

## Steps

#### Steps taken to build this project:
- [x] Create necessary files - HTML, server.js, client.js
- [x] Install node modules and express
- [x] Create inputs for number field on HTML
- [x] Collect inputs on client.js
- [x] Create table for display of inputs on DOM
- [x] Turn input strings into numbers
- [x] Send inputs to server -POST
- [x] Have server run addition on inputs
- [x] Return results from server to client - GET
- [x] Display inputs on DOM
- [x] Add a clear button and function
- [x] Keep history of inputs and results on server - POST
- [x] Write history to DOM after each input - GET
- [x] Add subtraction, multiplication, division options
#### Stretch Goals
- [x] Have all inputs required before contacting server and calculating
- [x] Split inputs using .split() to create multiple inputs
- [x] Add option to add decimal points
- [x] Add button to let user clear all history (using DELETE request)
- [x] Clicking on an entry in history list will rerun the equation and display the answer
- [x] Add CSS layout to make the calculator welcoming and familiar

## Built with:
- Javascript
- Express & Node.js

## Acknowledgements
Thanks to Prime Digital Academy for the challenge and providing the skills to achieve!

## Support

If you have suggestions or issues, please email me at TBD.
