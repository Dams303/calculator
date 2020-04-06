function createCalculator() {
    let c = {};

    c.add = (a, b) => a + b;
    c.substract = (a, b) => a - b;
    c.multiply = (a, b) => a * b;
    c.divide = (a, b) => a / b;
    c.operate = (operator, a, b) => operator(a, b);

    c.operatorsFunc = [{ op: 'mul', out: '×', func: c.multiply },
    { op: 'div', out: '÷', func: c.divide },
    { op: 'add', out: '+', func: c.add },
    { op: 'sub', out: '-', func: c.substract }];

    c.operators = c.operatorsFunc.map(elt => elt.op);
    c.isOperator = op => c.operators.includes(op);

    c.input = ['0'];
    c.history = [];
    c.currentPos = () => c.input.length - 1;
    c.currentInput = () => c.input[c.currentPos()];
    c.isCurrentOperator = () => c.isOperator(c.currentInput());
    
    // interface methods
    c.addDigit = (digit) => {
        if (c.isCurrentOperator())
            c.input[c.currentPos() + 1] = digit; //go to next digit   /*c.input = input.replace(/^0+/g, '');*/
        else {
            if (c.currentPos() == 0 && c.currentInput() == '0') {
                if (digit == '0');
                else c.input[c.currentPos()] = digit;
            } else
                c.input[c.currentPos()] += digit;
        }
    }
    c.addNumber = (number) => {
        (c.currentPos() == 0) ? c.input[0] = number.toString() :
        c.input.push(number.toString())
    };  // for testing purpose

    c.addPoint = () => {
        c.input[c.currentPos()] += !c.input[c.currentPos()].includes('.') ? '.' : '';
    }

    c.addOperator = (op) => {
        c.isOperator(c.currentInput()) ? c.input[c.currentPos()] = op : c.input[c.currentPos() + 1] = op;
    }

    c.undo = () => {
        if (c.isCurrentOperator() || c.currentInput().length <= 1) c.input.pop();
        else
            c.input[c.currentPos()] = c.currentInput().substring(0, c.currentInput().length - 1);

        if (!c.input.length) c.input[0] = '0';
    }
    c.reset = () => c.input = ['0'];

    c.generateDisplay = (input) => input.reduce((out, cell) => out += c.isOperator(cell) ? c.findOperatorByOp(cell).out : cell, '');
    c.getDisplay = () => c.generateDisplay(c.input);

    c.findOperatorByOp = (op) => c.operatorsFunc.find((elt) => elt.op == op);
    c.processWithOperator = (op) => {
        let operator = c.findOperatorByOp(op); // lookup for operators

        while ((index = c.input.indexOf(op)) != -1) {
            const op1 = parseFloat(c.input[index - 1]);
            const op2 = parseFloat(c.input[index + 1]);
            c.input.splice(index - 1, 3, c.operate(operator.func, op1, op2));
        }
    }
    c.equal = () => {
        c.history.push([...c.input]);
        console.table(c.history);
        c.operators.forEach(c.processWithOperator);
        return c.input[0];
    }

    c.getHistory = () => {
        let input = c.history[c.history.length-1];
        return input ? c.generateDisplay(input) : '';
    }
    return c;
}

//////////////////////////////////////////////////////////
// test calculator:
{
 //   let c = createCalculator();
 //   c.addNumber(1); c.addOperator('add'); c.addNumber(3); console.log('test1+3=5:' + c.equal());
}
{
//    let c = createCalculator();
//    c.addNumber(4); c.addOperator('add'); c.addNumber(2); c.addOperator('mul'); c.addNumber(3); console.log('test4+2*3=10:' + c.equal());
}
//////////////////////////////////////////////////////////
// ** Known bugs: 
// 

// ** Improvments: 
// ans and history feature: 70% done
// trim zero and rounding decimals

//////////////////////////////////////////////////////////

function addListeners() {
    let keys = document.getElementsByClassName('key');
    for (key of keys) {
        key.addEventListener('click', keyClicked);
    }
}

function createNumKeys() {
    let keyboard = document.getElementById('keyboard');
    for (let i = 0; i < 10; ++i) {
        let key = document.createElement('button');
        key.dataset.num = i;
        key.classList.add('key');
        key.style.gridArea = 'n' + i;
        key.textContent = i;
        keyboard.appendChild(key);
    }
}

function keyClicked(e) {
    if ('num' in this.dataset)
        c.addDigit(this.dataset.num);
    else if ('op' in this.dataset)
        c.addOperator(this.dataset.op);
    else if ('action' in this.dataset)
        c[this.dataset.action]()  // undo, equal, reset
    else if ('sep' in this.dataset)
        c.addPoint();

    updateDisplay();
}

let mainOutput = document.getElementById('main-output');
let secondaryOutput = document.getElementById('secondary-output');

function updateDisplay() {
    mainOutput.textContent = c.getDisplay();
    secondaryOutput.textContent = 'Ans = ' + c.getHistory();
}
let c = createCalculator();
createNumKeys();
addListeners();
updateDisplay();

function handleKeyDown(key) {
    if (!isNaN(key)) {c.addDigit(key);           updateDisplay()}
    else if (key == '.') {c.addPoint();          updateDisplay()}
    else if (key == '+') {c.addOperator('add');  updateDisplay()}
    else if (key == '-') {c.addOperator('sub');  updateDisplay()}
    else if (key == '*') {c.addOperator('mul');  updateDisplay()}
    else if (key == '/') {c.addOperator('div');  updateDisplay()}
    else if (key == 'Enter') {c.equal();         updateDisplay()}
    else if (key == 'Backspace') {c.undo();      updateDisplay()}
    else if (key == 'c') {c.reset();             updateDisplay()}
}

document.onkeydown = event => { event.preventDefault(); handleKeyDown(event.key);};

// module.exports = {
// // 	add, substract
// }