let row=1;
let col=1;
let word='';
let done=false;

console.log('start0');

async function init(){
    console.log('start');
    const response=await fetch('https://words.dev-apis.com/word-of-the-day');
    const data=await response.json();
    const word_of_the_day=data.word.toUpperCase();
    // return word;
    async function valid(word_temp) {
        if(word_temp.length!=5){
            invalid_word();
            return false;
        }
        const res = await fetch("https://words.dev-apis.com/validate-word", {
            method: "POST",
            body: JSON.stringify({ word: word_temp }),
        });
        const { validWord } = await res.json();     
        if(!validWord){
            invalid_word();
            return false;
        }
        return true;
    }
    function invalid_word() {
        alert('Invalid word');
        word='';
        col=1;
        document.querySelector(`.row-${row}`).querySelectorAll('.letter-box').forEach((letter)=>{
            letter.innerText='';
        });
    }
    async function check(word_temp) {
        console.log(word_temp)
        let cnt=0;
        if(word_temp.length!=5){
            invalid_word();
            return false;
        }
        const res = await fetch("https://words.dev-apis.com/validate-word", {
            method: "POST",
            body: JSON.stringify({ word: word_temp }),
        });
        const { validWord } = await res.json();     
        if(!validWord){
            invalid_word();
            return false;
        }
        console.log('valid');
        for(let i=0;i<5;i++){
            document.querySelector(`.row-${row}`).querySelectorAll('.letter-box')[i].style.backgroundColor='red';
        }
        for(let i=0;i<5;i++){
            if(word_of_the_day.includes(word_temp[i])){
                document.querySelector(`.row-${row}`).querySelectorAll('.letter-box')[i].style.backgroundColor='yellow';
            }
        }
        for(let i=0;i<5;i++){
            if(word_of_the_day[i]==word_temp[i]){
                document.querySelector(`.row-${row}`).querySelectorAll('.letter-box')[i].style.backgroundColor='green';
                cnt++;
            }
        }
        if(cnt==5){
            alert('You have won');
            done=true;
        }
        else{
            if(row==6){
                alert('You have lost, the word was '+word_of_the_day);
                done=true;
                col=1;
                row=1;
            }
            else{
                word='';
                row++;
                col=1;
            }
        }
    }
    console.log(word);
    document.addEventListener("keydown", function handleKeyPress(e){
        
        let letter=e.key;
        if(done)
            return;
        console.log(letter)
        if (letter === "Enter") {
            console.log('checking')
            check(word);
        }
        if(letter==="Backspace"){
            if(col!=1){
                document.querySelector(`.row-${row}`).querySelectorAll('.letter-box')[col-2].innerText='';
                col--;
                word=word.slice(0,-1);
            }
        }
        if(isLetter(letter)){
            letter=letter.toUpperCase();
            if(col==6){
                alert('You have reached the maximum number of letters');
            }
            if(row<=6 && col<=5){
                word+=letter;
                document.querySelector(`.row-${row}`).querySelectorAll('.letter-box')[col-1].innerText=letter;
                col++;
            }
        }
    });
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

init();