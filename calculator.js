function add(a, b) {return a+b;}
function substract (a,b) {return a-b;}
function multiply(a, b) {return a*b;}
function divide(a, b) {return a/b;}

function operate(operator, a, b) {
  return operator (a,b);
}

function createNumKeys()
{
    let keyboard = document.getElementById('keyboard');
    for (let i=0; i<10; ++i)
    {
        let key = document.createElement('button');
        key.classList.add('key');
        key.style.gridArea = 'n'+i;
        key.addEventListener('click', keyPressed);      
        key.textContent = i;
        keyboard.appendChild(key);
    }   
}

function keyPressed(e) {
    
}

createNumKeys();
console.log (operate (add, 3, -4));

module.exports = {
	add,
	subtract
}