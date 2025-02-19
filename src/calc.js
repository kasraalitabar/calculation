const Display = document.getElementById("display");
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
let NextValue = false;
let defult = 0;
let operatorValue = '';

const calculate = {
    '/': (first , second) => first / second ,
    '*': (first , second) => first * second ,
    '+': (first , second) => first + second ,
    '-': (first , second) => first - second ,
    '=': (first , second) => second,
}

function sendNumber(number){
    if(NextValue){
        Display.value = number;
        NextValue = false;
    }else{
        const displayValue = Display.value;
        Display.value = displayValue === '0' ? number : displayValue + number;
    }
}

inputBtns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumber(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => operator(inputBtn.value));
    }
});


 function operator(operator){
    const currentValue = Number(Display.value);
    if(!defult) {
        defult=currentValue;
        operatorValue = operator;
        NextValue=true
        return;
    }if(operatorValue){
        const calculation = calculate[operatorValue](defult, currentValue);
        Display.value = calculation;
        defult = calculation;
    }
    operatorValue = operator;
    NextValue=true;
}
 

function resetAll(){
    Display.value = 0;
     defult = 0;
     NextValue = false;
     operatorValue = '';
}
clearBtn.addEventListener('click', resetAll);