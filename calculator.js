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

function addListeners()
{
    let operatorKeys = document.getElementsByClassName('key');
    for (key of operatorKeys) {
        key.addEventListener('click', keyPressed);
    }
}

function createNumKeys()
{
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

    if (value == 'reset') resetAll();  

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
// 2 + 3 + 5 
// 2 + 3 x 5 x 6

function flushInput() {
    let temp = parseInt(inputBuffer);
    if (isNaN(temp)) 
      temp = undefined;
    inputBuffer = '';
    return temp;
}

function resetOperands() {
    op1 = undefined;
    op2 = undefined;
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
//createOperatorKeys();
updateScreen();

// module.exports = {
// 	add,
// 	subtract
// }