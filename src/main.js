const display = document.getElementById("display");
const Btns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
let firstValue =null;
let operatorValue = '';
let awaitingNextValue = false;



function show(number){
    // Replace current display value if first value is entered
    if(awaitingNextValue){
        display.textContent = number;
        awaitingNextValue = false;
    }else{
        // if current display value is 0 , replace it , if not add number
        display.value = display.value ==="0" ? number :display.value + number;
    }
}

const calculate = {
    '/': (firstNumber , secondNumber) => firstNumber / secondNumber ,

    '*': (firstNumber , secondNumber) => firstNumber * secondNumber ,

    '+': (firstNumber , secondNumber) => firstNumber + secondNumber ,

    '-': (firstNumber , secondNumber) => firstNumber - secondNumber ,
}

function useOperator(operator){
    const currentValue = Number(display.value);
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
 Btns.forEach((button) =>{
    const value =button.value;

    if(!isNaN(value)){
        button.addEventListener("click",()=>show(value));
    } else if (value in calculate){
        button.addEventListener("click",()=> useOperator(value));
    }else if (value ==="="){
        button.addEventListener("click",()=> useOperator(operatorValue));
        operatorValue="";
    }else if (value === "C"){
        button.addEventListener("click", resetAll)
    }
});
function resetAll(){
    display.value = "0";
     firstValue = 0;
     operatorValue = '';
     awaitingNextValue = false;
}
