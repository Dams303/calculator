

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

adaptContainerFontSize = (container) => 
{
    // current font-size-height: 40px;
    // current container-size: 316 x 51
    //const containerWidth = container.style.width;
    
    const textLength = container.textContent.length;
    let style = container.style; 
    const lengthLimit = 13;
    const originalFontSize = 40;
    const size = Math.floor (100* 40 * lengthLimit / textLength)/100;
    style.fontSize = (textLength <= lengthLimit ? originalFontSize : size) + 'px';
}

function updateDisplay() {
    mainOutput.textContent = c.getDisplay();
    secondaryOutput.textContent = c.getLastResult();

    adaptContainerFontSize(mainOutput);
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
    else if (key == 'h') {historyBtn.click()}   
    else if (key == 'H') {c.clearHistory(); updateDisplay()}   
    else if (key == 'q') {helpBtn.click()}   
}

document.onkeydown = event => { 
    if(!event.key.startsWith('F')) // allow Fn shorcuts for Chrome dev environment.
        event.preventDefault();
    handleKeyDown(event.key);
}

// help button & panel logic
let helpBtn = document.getElementById('help-btn');
let help = document.getElementById('help');

helpBtn.addEventListener('click', e => {
    helpBtn.classList.toggle('ck-btn-checked');
    help.style.display = helpBtn.classList.contains('ck-btn-checked')? 'block' : 'none';
});

// history button
let historyBtn = document.getElementById('history-btn');

historyBtn.addEventListener('click', e => {
    historyBtn.classList.toggle('ck-btn-checked');
    historyPanel.style.display = historyBtn.classList.contains('ck-btn-checked')? 'block' : 'none';
});

// history panel
let historyPanel = document.getElementById('history');
let historyEntries = document.getElementById('history-entries');

function createHistoryEntry(index) {
    let row = historyEntries.appendChild(document.createElement('div'));
    row.setAttribute('id', 'hist' + index);
    row.dataset.num = index;

    let left = row.appendChild(document.createElement('span'));
    left.dataset.type = 'left';
    left.classList.add('history-expression');

    row.appendChild(document.createTextNode('='));

    let right = row.appendChild(document.createElement('span'));
    right.dataset.type = 'right';
    right.classList.add('history-expression');

    return row;
}

function updateHistoryPanel() {

    c.history.forEach((input, index) => {
        let row = document.getElementById('hist' + index);
        
        if (row == null)
            row = createHistoryEntry(index);
        
        row.children[0].textContent = c.generateDisplay(input.slice(0, input.length-2));
        row.children[1].textContent = c.generateDisplay(input.slice(-1));   
    });


        if (!c.history.length) {
            document.getElementById('history-entries').textContent = ''; 
    }
}

// update calculator from history logic
let handleHistoryPanelClicked = (e) => {
    
    if (e.target.classList.contains('history-expression')) {
        
        const historyIndex = e.target.parentElement.dataset.num;
        let historyInput = c.history[historyIndex];

        if (e.target.dataset.type == 'left')
            c.input = [...historyInput.slice(0, historyInput.length-2)]; 
        else
            c.input = [...historyInput.slice(-1)];
        
        updateDisplay();
    }
}
historyPanel.addEventListener('click', handleHistoryPanelClicked);

// clear history button logic
let clearHistoryBtn = document.getElementById('history-clear-btn'); 

clearHistoryBtn.addEventListener('click', e => {
    console.log(e);
    c.clearHistory();
    updateDisplay();
});