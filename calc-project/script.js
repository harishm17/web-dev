display=document.querySelector('.display');
back=document.querySelector('.back-button');
divide=document.querySelector('.divide-button');
multiply=document.querySelector('.multiply-button');
subtract=document.querySelector('.subtract-button');
add=document.querySelector('.add-button');
clear=document.querySelector('.clear-button');
equals=document.querySelector('.equals-button');
numbers=document.querySelectorAll('.number-button');

let temp=0;
let operator='';

numbers.forEach((number)=>{
    number.addEventListener('click',()=>{
        if(display.innerText==='0'){
            display.innerText='';
        }
        display.innerText+=number.textContent;
    });
});

function eval(operator, temp, display_val) {
    if(operator==='+'){
        return temp+parseFloat(display_val);
    }
    else if(operator==='-'){
        return temp-parseFloat(display_val);
    }
    else if(operator==='*'){
        return parseFloat(display_val)*temp;
    }
    else if(operator==='/'){
        if(display_val==='0'){
            return 0;
        }
        else
            return temp/parseFloat(display_val);
    }
}

divide.addEventListener('click',()=>{
    if(operator!=''){
        temp=eval(operator,temp,display.innerText);
    }
    else 
        temp=parseFloat(display.innerText);
    console.log(temp);
    display.innerText='0';
    operator='/';
});

multiply.addEventListener('click',()=>{
    if(operator!=''){
        temp=eval(operator,temp,display.innerText);
    }
    else 
        temp=parseFloat(display.innerText);
    display.innerText='0';
    operator='*';
});

subtract.addEventListener('click',()=>{
    if(operator!=''){
        temp=eval(operator,temp,display.innerText);
    }
    else 
        temp=parseFloat(display.innerText);
    display.innerText='0';
    operator='-';
});

add.addEventListener('click',()=>{
    if(operator!=''){
        temp=eval(operator,temp,display.innerText);
    }
    else 
        temp=parseFloat(display.innerText);
    display.innerText='0';
    operator='+';
});

clear.addEventListener('click',()=>{
    display.innerText='0';
    temp=0;
    operator='';
});

back.addEventListener('click',()=>{
    if (display.innerText.length===1){
        display.innerText='0';
    }
    else
        display.innerText=display.innerText.slice(0,-1);
});

equals.addEventListener('click',()=>{
    if(operator==='+'){
        display.innerText=temp+parseFloat(display.innerText);
    }
    else if(operator==='-'){
        display.innerText=temp-parseFloat(display.innerText);
    }
    else if(operator==='*'){
        display.innerText=parseFloat(display.innerText)*temp;
    }
    else if(operator==='/'){
        if(display.innerText==='0'){
            display.innerText='NaN';
        }
        else
            display.innerText=temp/parseFloat(display.innerText);
    }
    temp=0;
    operator='';
});


