

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
    secondaryOutput.textContent = c.getLastResult();

    updateHistoryPanel();
}
let c = createCalculator();
createNumKeys();
addListeners();
updateDisplay();

// Keyboard shortcuts
function handleKeyDown(key) {
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

// help panel
let helpBtn = document.getElementById('help-btn');
let help = document.getElementById('help');

helpBtn.addEventListener('change', e => {
    e.target.checked ? helpBtn.classList.add('ck-btn-checked') : helpBtn.classList.remove('ck-btn-checked');
    help.style.display = e.target.checked ? 'block' : 'none';
});


// history button
let historyBtn = document.getElementById('history-btn');

historyBtn.addEventListener('change', e => {
    e.target.checked ? historyBtn.classList.add('ck-btn-checked') : historyBtn.classList.remove('ck-btn-checked');
    historyPanel.style.display = e.target.checked ? 'block' : 'none';
});


// history panel
let historyPanel = document.getElementById('history');

function updateHistoryPanel() {
    
    c.history.forEach((input, index) => {
        let entry = historyPanel.children[index];
        if (entry == null) 
            entry = historyPanel.appendChild(document.createElement('div'));
        entry.textContent = c.generateDisplay(input); 
    }
);}


