createCalculator = function () {
    let c = {};

    c.add = (a, b) => a + b;
    c.substract = (a, b) => a - b;
    c.multiply = (a, b) => a * b;
    c.divide = (a, b) => a / b;
    c.percent = (a) => a*0.01;
    c.operate = (operator, a, b) => operator(a, b);

    c.operatorsFunc = [
      { op: 'per', out: '% ',  func: c.percent,     type: 'unary' }, 
      { op: 'mul', out: ' × ', func: c.multiply,    type: 'binary' },
      { op: 'div', out: ' ÷ ', func: c.divide,      type: 'binary' }, 
      { op: 'add', out: ' + ', func: c.add,         type: 'binary' },
      { op: 'sub', out: ' - ', func: c.substract,   type: 'binary' }];

    c.isUnaryOperator = op =>  c.isOperator(op) && c.findOperatorByOp(op).type == 'unary';
    c.isBinaryOperator = op => c.isOperator(op) && c.findOperatorByOp(op).type == 'binary';

    c.validate = () => {
        let checkOperandsValid = (cell, index) => {
            if (c.isOperator(cell))
            {    
                const operatorType = c.findOperatorByOp(cell).type;
                if (operatorType == 'binary')
                    return ( !isNaN(c.input[index-1]) || c.isUnaryOperator(c.input[index-1]) ) && !isNaN(c.input[index+1]);
                else if (operatorType == 'unary')
                    return !isNaN(c.input[index-1]) || c.isUnaryOperator(c.input[index-1]); // allow to chain % like 4%%
            }
            return true;
        }
        return c.input.every(checkOperandsValid);
    }
    c.operators = c.operatorsFunc.map(elt => elt.op);
    c.isOperator = op => c.operators.includes(op);

    c.input = ['0'];
    c.history = [];
    c.currentPos = () => c.input.length - 1;
    c.currentInput = () => c.input[c.currentPos()];
    c.isCurrentOperator = () => c.isOperator(c.currentInput());
    
    // interface methods
    c.addDigit = (digit) => {
        if (c.isUnaryOperator(c.currentInput())) return;
        if (c.isCurrentOperator())
            c.input[c.currentPos() + 1] = digit;
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
    }  // for unit testing purpose

    c.addPoint = () => { 
        if (c.isOperator(c.currentInput())) 
            c.input[c.currentPos()+1] = '0.';
        else 
            c.input[c.currentPos()] += !c.input[c.currentPos()].includes('.') ? '.' : '';
    }

    c.addOperator = (op) => {
        // add cell when: 4%, 4%%, 4.%, 4x; %x;
        // replace cell when: x% => when current is binary and op is unary
        if (c.isCurrentOperator() && c.isBinaryOperator(c.currentInput()) /*&& c.isUnaryOperator(op)*/)
            c.input[c.currentPos()] = op;
        else 
            c.input[c.currentPos() + 1] = op;
    }

    c.undo = () => {
        if (c.isCurrentOperator() || c.currentInput().length <= 1 || c.currentInput() == 'Infinity') c.input.pop();
        else
            c.input[c.currentPos()] = c.currentInput().substring(0, c.currentInput().length - 1);

        if (!c.input.length) c.input[0] = '0';
    }
    c.reset = () => c.input = ['0'];

    c.generateDisplay = (input) => input.reduce((out, cell) => out += c.isOperator(cell) ? c.findOperatorByOp(cell).out : cell, '');
    c.getDisplay = () => c.generateDisplay(c.input);

    c.findOperatorByOp = (op) => c.operatorsFunc.find((elt) => elt.op == op);

    const MAX_DECIMALS = 9;
    c.processWithOperator = (op) => {
        let operator = c.findOperatorByOp(op); // lookup for operators

        while ((index = c.input.indexOf(op)) != -1) {
            const op1 = parseFloat(c.input[index - 1]);
            const op2 = parseFloat(c.input[index + 1]);
            c.input.splice(index - 1, operator.type == 'binary' ? 3:2, c.operate(operator.func, op1, op2));
        }
    }
    c.equal = () => {
        if (c.validate()) {
            c.feedHistory();
            console.table(c.history);
            //console.table(c.input);
            c.operators.forEach(c.processWithOperator);
            c.input[0] = parseFloat( parseFloat(c.input[0]).toFixed(MAX_DECIMALS)).toString();
            //console.table(c.input);
        }
        //else {console.log('validation failed'); console.table(c.input);};
        return c.input;
    }
    const HISTORY_SIZE = 10;
    c.feedHistory = () => {
        if(c.history.length == HISTORY_SIZE) c.history.shift(); 
        c.history.push([...c.input]);
    }

    c.getHistory = () => {
        let input = c.history[c.history.length-1];
        return input ? c.generateDisplay(input) : '';
    }
    return c;
}

//////////////////////////////////////////////////////////
// ** Known bugs:

// ** Improvments:
// ans and history feature: 70% done: When to display it : 
// after equal if digit then erase the previous cell: 
// allow minus sign after other operators.

//////////////////////////////////////////////////////////

if (this.document == null) { // call export when exectued by node.js for unit tests. 
  module.exports = {
    createCalculator
 }
}