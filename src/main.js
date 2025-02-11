const display = document.getElementsByClassName("display");
const Btns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
let main =0;
let operatorValue = '';
let awaitingNextValue = false;


function show(number){
    // Replace current display value if first value is entered
    if(awaitingNextValue){
        display.textContent = number;
        awaitingNextValue = false;
    }else{
        // if current display value is 0 , replace it , if not add number
        const displayValue = display.textContent;
        display.textContent = displayValue === '0' ? number : displayValue + number;
    }
}


const calculate = {
    '/': (firstNumber , secondNumber) => firstNumber / secondNumber ,

    '*': (firstNumber , secondNumber) => firstNumber * secondNumber ,

    '+': (firstNumber , secondNumber) => firstNumber + secondNumber ,

    '-': (firstNumber , secondNumber) => firstNumber - secondNumber ,

    '=': (firstNumber , secondNumber) => secondNumber
}

function useOperator(operator){
    const currentValue = Number(display.textContent);
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        display.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue=true;
    operatorValue = operator;
 }
 Btns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => show(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }
});
function resetAll(){
    calculatorDisplay.textContent = 0;
     firstValue = 0;
     operatorValue = '';
     awaitingNextValue = false;
}
clearBtn.addEventListener('click', resetAll);