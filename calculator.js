function add(a, b) {return a+b;}
function substract (a,b) {return a-b;}
function multiply(a, b) {return a*b;}
function divide(a, b) {return a/b;}

function operate(operator, a, b) {
  return operator (a,b);
}

function operateAll () {
    console.log('operateAll: ' + op1 + ' ' + op2 );
    outputBuffer = '' + operate (add, op1, op2);
}

//function createOperatorKeys()
function addListeners()
{
    /*let keyboard = document.getElementById('keyboard');
    let key = document.createElement('button');
    key.dataset.add
    key.classList.add('key');
    key.classList.add('operator-key');
    key.style.gridArea = 'eq';*/
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
        //key.addEventListener('click', keyPressed);      
        key.textContent = i;
        keyboard.appendChild(key);
    }   
}

function keyPressed(e) {

    console.log('value: ' + this.dataset.value);
    const value = this.dataset.value;

    if (value == 'reset') resetAll();  

    else if (value == 'add') {
        currentOperator = value;
        // need to have both operands valid to compute
        if (op1 == undefined) { 
            op1 = flushInput();
        }
        else { // both operands valid
            op2 = flushInput();
            //operateAll();
            // op1 = op2;
            // op2 = undefined;
        }   
    }
    else if(value =='equal')
    {   
        op2 = flushInput();
        operateAll();
        resetOperands();
    }
    else if (!isNaN(value)) { // num keys
        let number = value;
        inputBuffer += number;
        outputBuffer = inputBuffer; 
    }
    else {
    }
    updateScreen();
}

function flushInput() {
    let temp = parseInt(inputBuffer);
    console.log({temp});
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

// let a = '';
// a = ''+3;
// console.log(typeof a);
//console.log (operate (add, 3, -4));

// module.exports = {
// 	add,
// 	subtract
// }