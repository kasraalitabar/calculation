const Display = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let NextValue = false;

function sendNumberValue(number){
    // Replace current display value if first value is entered
    if(NextValue){
        Display.textContent = number;
        NextValue = false;
    }else{
        // if current display value is 0 , replace it , if not add number
        const displayValue = Display.textContent;
        Display.textContent = displayValue === '0' ? number : displayValue + number;
    }
}


// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber , secondNumber) => firstNumber / secondNumber ,
    '*': (firstNumber , secondNumber) => firstNumber * secondNumber ,
    '+': (firstNumber , secondNumber) => firstNumber + secondNumber ,
    '-': (firstNumber , secondNumber) => firstNumber - secondNumber ,
    '=': (firstNumber , secondNumber) => secondNumber
}

 function useOperator(operator){
    const currentValue = Number(Display.textContent);
    // Prevent multiple operators
    if(operatorValue && NextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        Display.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    NextValue=true;
    operatorValue = operator;
 }
// Add Event Listeners for numbers , operators , decimal buttons
inputBtns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal());
    }
});

//Reset all values, display
function resetAll(){
    Display.textContent = 0;
     firstValue = 0;
     operatorValue = '';
     NextValue = false;
}

// Add Event Listener for reset display numbers
clearBtn.addEventListener('click', resetAll);