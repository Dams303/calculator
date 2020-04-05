
//////////////////////////////////////////////////////////
const operators = ['*', '/', '+', '-'];

let isOperator = (op) => operators.includes(op);

function createCalculator() {
    let c = {};
    
    c.operatorsFunc = [ {op: '*', func: c.multiply},
                        {op: '/', func: c.divide},
                        {op: '+', func: c.add}, 
                        {op: '-', func: c.substract}];
    c.input = ['0'];
    c.currentPos = () => c.input.length -1; 
    // interface methods
    c.currentInput = () => c.input[c.currentPos()]; 
    c.isCurrentOperator = () => isOperator (c.currentInput());
    c.addDigit = (digit) => {
        if (isCurrentOperator())
            c.input[c.currentPos()+1] = digit; //go to next digit   /*c.input = input.replace(/^0+/g, '');*/
        else { 
            if (c.currentPos() == 0 && c.currentInput() == '0' && digit == '0') {} // do nothing
            else c.input[c.currentPos()] += digit; // happen digits        
        }           
    }
    c.addNumber = (number) => { (c.currentPos()==0) ? c.input[0] = number.toString() :
                                                     c.input.push(number.toString()) };
    c.addPoint = () => { c.input[c.currentPos()] += !c.input[c.currentPos()].includes('.') ? '.' : '' };
    c.addOperator = (op) => {        
        isOperator(c.currentInput()) ? c.input[c.currentPos()] = op : c.input[c.currentPos()+1] = op;
    }
    
    c.undo = () => {
        if (isCurrentOperator()) c.input.pop();
        else {
            if(currentInput().length <= 1) c.input.pop();
            else c.input[c.currentPos()] = c.currentInput().subString(0, c.currentInput.length-1);
        }
    }
    c.reset = () => c.input = [];
    c.getDisplay = () => disp = c.input.reduce((out, cell) => out+=cell, '');

    c.processWithOperator = (op) => {
        const operator = c.operatorsFunc.find((elt) => elt.op == op); // lookup for operators
        while ( (index = c.input.indexOf(op)) != -1) {
            const op1 = parseFloat(c.input[index-1]);
            const op2 = parseFloat(c.input[index+1]);
            c.input.splice(index-1, 3, c.operate(operator.func, op1, op2));
        }
    };

    c.equal = () => operators.forEach(c.processWithOperator);

//            if(c.callDisplayListener)
//              c.callDisplayListener(c.operands[c.operands.length-1]);
        
    c.add = (a, b) => a + b;
    c.substract = (a, b) => a - b;
    c.multiply = (a, b) => a * b;
    c.divide = (a, b) => a / b;
    c.operate = (operator, a, b) => operator(a, b);
    c.registerDisplayListener = (callback) => c.callDisplayListener = callback;

    return c;
}
//////////////////////////////////////////////////////////
// test new interface:
let c = createCalculator();
c.addNumber(1); 
c.addOperator('+'); 
c.addNumber(3);
console.log('test1:' + c.equal());
// c.addNumber(1); c.addOperator(c.multiply); c.addNumber(3); console.log('test2:' + c.equal());


function addListeners() {
    let keys = document.getElementsByClassName('key');
    for (key of keys) {
        key.addEventListener('click', keyPressed);
    }
}

function createNumKeys() {
    let keyboard = document.getElementById('keyboard');
    for (let i = 0; i < 10; ++i) {
        let key = document.createElement('button');
        key.classList.add('key');
        key.style.gridArea = 'n' + i;
        key.dataset.value = i;
        key.textContent = i;
        keyboard.appendChild(key);
    }
}

function keyPressed(e) {
    console.log('value: ' + this.dataset.value);
    const value = this.dataset.value;
}
updateScreen();

function updateScreen() {
    //let mainOutput = document.getElementById('main-output');
    //mainOutput.textContent = outputBuffer.length ? outputBuffer : '0';

    //let secondaryOutput = document.getElementById('secondary-output');
    //secondaryOutput.textContent = 'Ans';
}

createNumKeys();
//addListeners();
//resetAll();
//updateScreen();

// module.exports = {
// // 	add, substract
// }