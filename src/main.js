const Display = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let defult = 0;
let operatorValue = '';
let NextValue = false;

const calculate = {
    '/': (firstNumber , secondNumber) => firstNumber / secondNumber ,
    '*': (firstNumber , secondNumber) => firstNumber * secondNumber ,
    '+': (firstNumber , secondNumber) => firstNumber + secondNumber ,
    '-': (firstNumber , secondNumber) => firstNumber - secondNumber ,
    '=': (firstNumber , secondNumber) => secondNumber
}

function sendNumberValue(number){
    if(NextValue){
        Display.textContent = number;
        NextValue = false;
    }else{
        const displayValue = Display.textContent;
        Display.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

 function useOperator(operator){
    const currentValue = Number(Display.textContent);
    if(operatorValue && NextValue) {
        operatorValue = operator;
        return;
    }
    if(!defult){
        defult = currentValue;
    }else{
        const calculation = calculate[operatorValue](defult, currentValue);
        Display.textContent = calculation;
        defult = calculation;
    }
    NextValue=true;
    operatorValue = operator;
 }
inputBtns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal());
    }
});

function resetAll(){
    Display.textContent = 0;
     defult = 0;
     operatorValue = '';
     NextValue = false;
}
clearBtn.addEventListener('click', resetAll);