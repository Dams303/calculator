

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
    console.log(key);
    if (!isNaN(key)) {c.addDigit(key);           updateDisplay()}
    else if (key == '.') {c.addPoint();          updateDisplay()}
    else if (key == '+') {c.addOperator('add');  updateDisplay()}
    else if (key == '-') {c.addOperator('sub');  updateDisplay()}
    else if (key == '*') {c.addOperator('mul');  updateDisplay()}
    else if (key == '/') {c.addOperator('div');  updateDisplay()}
    else if (key == '%') {c.addOperator('per');  updateDisplay()}
    else if (key == 'Enter') {c.equal();         updateDisplay()}
    else if (key == 'Backspace') {c.undo();      updateDisplay()}
    else if (key == 'Escape') {c.reset();        updateDisplay()}
}

document.onkeydown = event => { 
    if(!event.key.startsWith('F')) // allow Fn shorcuts for Chrome dev environment.
        event.preventDefault();
    handleKeyDown(event.key);
}

let menu = document.getElementById('ck-button');
//let help = document.getElementById('help');

menu.addEventListener('change', (e) => {
    console.log(e);
    e.target.checked ? menu.classList.add('ck-btn-checked') : menu.classList.remove('ck-btn-checked');
    help.style.display = e.target.checked ? 'block' : 'none';
});

