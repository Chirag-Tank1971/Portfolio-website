
const passField = document.querySelector(".generate-field");
const copyBtn = document.querySelector(".copybtn");
const copyMess = document.querySelector(".copied-mess");
const passLenght = document.querySelector("#length");
const lengthSlider = document.querySelector("#lenght-slider");
const upperCheck = document.querySelector("#uppercase");
const lowerCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector(".indicator")
const getPass = document.querySelector(".generateBtn");
const allCheckBox =document.querySelectorAll("input[type=checkbox]")
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength =10;
let checkCount=1;
handleSlider();
setIndicator("#ccc");

function handleSlider(){
    lengthSlider.value=passwordLength;
    passLenght.innerText=lengthSlider.value
    const min = lengthSlider.min;
    const max = lengthSlider.max;
    lengthSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
};

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function generateRndInteger(min,max){
   return  Math.floor(Math.random()*(max-min)+min)
};

function generateRndNumber(){
    return generateRndInteger(1,9)
};
function generateUppercase(){
    return String.fromCharCode(generateRndInteger(65,90))
}
function generateLowercase(){
    return String.fromCharCode(generateRndInteger(97,122))
}
function generateRndSymbol(){
    const rndSymbol = generateRndInteger(0,symbols.length)
    return symbols.charAt(rndSymbol)
};


function displayStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCheck.checked) hasUpper = true;
    if (lowerCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 10) {
      setIndicator("#0f0");
      passLenght.style.color="#0f0";
      passField.style.color="white";

    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 5
    ) {
      setIndicator("#ff0");
      passLenght.style.color="#ff0";
      passField.style.color="white";
      
    } else {
      setIndicator("#f00");
      passLenght.style.color="#f00";
      passField.style.color="#f00";
      
    }
}

async function copyPass(){
    try{
        await navigator.clipboard.writeText(passField.value);
        copyMess.innerText="Copied";
    }

    catch(e){
        copyMess.innerText="Failed";
    };
    copyMess.classList.add("active")

    setTimeout(()=>{
        copyMess.classList.remove("active")
    },2000);
}

                                        function shufflePassword(array) {
                                        //Fisher Yates Method
                                        for (let i = array.length - 1; i > 0; i--) {
                                            //random J, find out using random function
                                            const j = Math.floor(Math.random() * (i + 1));
                                            //swap number at i index and j index
                                            const temp = array[i];
                                            array[i] = array[j];
                                            array[j] = temp;
                                        }
                                        let str = "";
                                        array.forEach((el) => (str += el));
                                        return str;
                                    }

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach( (checkbox) =>{
        if(checkbox.checked)
            checkCount++;
        console.log("checkbox")
    });

        if(passwordLength<checkCount){
            passwordLength=checkCount
            handleSlider();
        } 
};

allCheckBox.forEach( (checkbox) => {
   checkbox.addEventListener('change' , handleCheckBoxChange)
   console.log("Starting the Journley"); 
});

lengthSlider.addEventListener('input', (e)=>{
    passwordLength=e.target.value
    console.log("chirag2")
    handleSlider()
   
});

copyBtn.addEventListener('click' , ()=>{
    if(passField.value)
        copyPass(); 
    
});

getPass.addEventListener('click' , ()=>{
   
    if(checkCount == 0)
        return;

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider()
    };
    console.log("Starting the Jorney");
    password=""
    
    let passAry = [];

    if(upperCheck.checked)
        passAry.push(generateUppercase);
    if(lowerCheck.checked)
        passAry.push(generateLowercase);
    if(numbersCheck.checked)
        passAry.push(generateRndNumber);
    if(symbolsCheck.checked)
        passAry.push(generateRndSymbol);

    //compalsary addition
    for(i=0; i<passAry.length; i++){
        password +=passAry[i]();
    }
    //remaing character
    for(i=0; i<passwordLength-passAry.length; i++)
        {
        let randIndex = generateRndInteger(0,passAry.length);
        password += passAry[randIndex]();
    }    
    password = shufflePassword(Array.from(password));
    passField.value = password;
    displayStrength();
});
