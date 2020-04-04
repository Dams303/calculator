
function createCalculator() {
  let currentOperator, op1, op2 ,input, output;  
    
  let calc = {};
  // interface methods
  calc.appendDigit = (string) => input +=string;
  calc.addDecimal = () => { input += !input.includes('.') ? '.' : '' };
  calc.undo = () => { input = input.substring(0, input.length-1) };
  calc.reset = () => {input = undefined, output = undefined, op1 = undefined, op2 = undefined, currentOperator = undefined;};
  //calc.equal = () => 
//  calc.getOutputDispay = () => output;

  // internal logic
  calc.add = (a,b) => a+b;      
  calc.substract = (a,b) => a-b;
  calc.multiply = (a,b) => a*b;
  calc.divide = (a,b) => a/b;
  calc.operate = (operator, a,b) => operator(a,b);

  return calc;
}

// interface


let calc = createCalculator();
console.log(calc.operate(add, 2,3));
console.log(calc.currentOperator);


// OLD WAY TO DO:
function add(a, b) {return a+b;}
function substract (a,b) {return a-b;}
function multiply(a, b) {return a*b;}
function divide(a, b) {return a/b;}

function operate(operator, a, b) {
  return operator (a,b);
}

function operateAll () {
    console.log('operateAll: ' + op1 + ' ' + op2 );
    const res = operate (currentOperator, op1, op2)
    outputBuffer = '' + res;
    return res;
}

function addListeners() {
    let keys = document.getElementsByClassName('key');
    for (key of keys) {
        key.addEventListener('click', keyPressed);
    }
}

function createNumKeys() {
    let keyboard = document.getElementById('keyboard');
    for (let i=0; i<10; ++i)
    {
        let key = document.createElement('button');
        key.classList.add('key');
        key.style.gridArea = 'n'+ i;
        key.dataset.value = i;   
        key.textContent = i;
        keyboard.appendChild(key);
    }   
}

function keyPressed(e) {

    console.log('value: ' + this.dataset.value);
    const value = this.dataset.value;
    
    if (value == 'sep') {
        if (!inputBuffer.includes('.')) {  
            inputBuffer = inputBuffer += '.';
            outputBuffer = inputBuffer;
        }
    }
    else if (value == 'undo') {
        inputBuffer = inputBuffer.substring(0, inputBuffer.length-1);
        outputBuffer = inputBuffer; 
    }
    else if (value == 'reset') resetAll();  

    else if (value == 'add' || value == 'substract' || value =="multiply" || value =="divide") {
        currentOperator = window[value];
        if (op1 == undefined) { 
            op1 = flushInput();
        }
        else if (op2 == undefined) {
            op2 = flushInput();
        }   
        else {
           op1 = operateAll();
           op2 = undefined;
        }
    }
    else if(value =='equal') {   
        op2 = flushInput();
        if (!isNaN(op1) && !isNaN(op2)) {
            op1 = operateAll();
            op2 = undefined;    
        }
    }
    else if (!isNaN(value)) { // num keys
        inputBuffer += value;
        outputBuffer = inputBuffer; 
    } 
    updateScreen();
}

function flushInput() {
    let temp = parseFloat(inputBuffer);
    if (isNaN(temp)) 
      temp = undefined;
    inputBuffer = '';
    return temp;
}

function resetAll() {
    inputBuffer = '';
    outputBuffer = '';
    op1 = undefined;
    op2 = undefined;
    currentOperator = '';
}

let inputBuffer;
let outputBuffer;
let op1, op2;
let currentOperator;

function updateScreen() {
  let screenOutput = document.getElementById('screen-output');
  screenOutput.textContent = outputBuffer.length ? outputBuffer : '0';  
}

createNumKeys();
addListeners();
resetAll();
updateScreen();

// module.exports = {
// 	add, substract
// }