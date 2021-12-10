// add drop down menu's find ways to bend the code


// DOM elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");   //creates password length
const uppercaseEl = document.getElementById("uppercase"); 
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers"); 
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate"); // generate button
const clipboard = document.getElementById("clipboard"); // clipboard button

const randomFunc =                // makes the objects into randomFunc
{
    lower: getRandomLower,        
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// making generate password click event work, generates event listen
generateEl.addEventListener("click", () => // when this is clicked, needs to get value of the elements
{
const length = +lengthEl.value; // adding "+" makes it turn into a number rather than a string
const hasLower = lowercaseEl.checked; // checking if check boxes are checked or not
const hasUpper = uppercaseEl.checked; // checking if check boxes are checked or not
const hasNumber = numbersEl.checked; // checking if check boxes are checked or not
const hasSymbol = symbolsEl.checked; // checking if check boxes are checked or not

resultEl.innerText = generatePassword (hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy password to clipboard
clipboard.addEventListener("click" , () => 
{
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;  // putting the  value of password into textarea
    if(!password) 
    {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea); // appendChild puts textarea into the body
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard :)");
});

// Generate password function
function generatePassword (lower, upper, number, symbol, length)
// 1. Initiate password var
// 2. Filter out unchecked types
// 3. Loop over length call generator function for each type
// 4. Add final password to the password var and return it
{
let generatedPassword = "";
const typesCount = lower + upper + number + symbol; // counting the number of checked values
const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); // {} turns arrays into objects , filter filters out the false objects

if(typesCount === 0)  // Step 2
{
    return "";
}

for (let i=0; i<length; i+=typesCount) // Step 3
{
    typesArr.forEach(type => 
{
        const funcName = Object.keys(type)[0];

        generatedPassword += randomFunc[funcName]();
});
}

const finalPassword = generatedPassword.slice(0, length); // Step 4

return finalPassword;  //generates final pw
}

// Generator functions  ----  https://net-comber.com/charset.html

function getRandomLower() // makes the letters upper case
{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // 26 letters in the alphabet (Math.floor rounds down)
}
function getRandomUpper() // makes the letters upper case
{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // 26 letters in the alphabet (Math.floor rounds down)
}

function getRandomNumber() // generates random number
{
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 0-9 (so 10 entries) & starting at 48
}

function getRandomSymbol() // generates random symbol
{
    const symbols  = "!@#$%^&*(){}=<>/,.";
    return symbols [Math.floor(Math.random() * symbols.length)]; // randomizes symbols 
}