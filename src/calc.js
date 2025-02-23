const Display = document.getElementById('display');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
let NextValue = false;
let defult = 0;
let operatorDefult = '';

function plus(first,second){
    return first+ second;
}
function minus(first,second){
    return first -second;
}
function multiply(first,second){
    return first * second
}
function divide(first,second){
    return first/ second;
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
        
    }else{
        if(operatorDefult === "+"){
            defult=plus(defult,currentValue);
        } else if(operatorDefult ==="-"){
            defult=minus(defult,currentValue);
        }else if(operatorDefult ==="*"){
            defult=multiply(defult,currentValue);
        }else if(operatorDefult ==="/"){
            defult=divide(defult,currentValue);
        }
        Display.value=defult
    }
    operatorDefult = operator;
    NextValue=true;
}
 

function resetAll(){
    Display.value = 0;
     defult = 0;
     NextValue = false;
     operatorDefult = '';
}
clearBtn.addEventListener('click', resetAll);