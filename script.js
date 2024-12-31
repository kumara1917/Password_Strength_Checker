const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("genBtn");
const copyBtn = document.getElementById("copyIcon");
const passIndicator = document.getElementById("passIndicator");
const strengthMessage = document.getElementById("strengthMessage");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}\\|;':\",./<>?";

sliderValue.textContent = inputSlider.value;

inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
    generatePassword();
});

function checkMandatoryFields() {
    if (!uppercaseEl.checked || !symbolsEl.checked) {
        strengthMessage.textContent = "Please select uppercase and symbols options.";
        strengthMessage.className = "strength-message weak";
        passBox.value = "";
        passIndicator.className = "pass-indicator weak";
        return true;
    }
    strengthMessage.textContent = ""; 
    return false;
}

function generatePassword() {
    if (checkMandatoryFields()) {
        return; 
    }

    const length = inputSlider.value;
    let characters = "";
    let passwordArray = [];

    if (lowercaseEl.checked) {
        passwordArray.push(lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length)));
        characters += lowercaseLetters;
    }
    if (uppercaseEl.checked) {
        passwordArray.push(uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length)));
        characters += uppercaseLetters;
    }
    if (numbersEl.checked) {
        passwordArray.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
        characters += numbers;
    }
    if (symbolsEl.checked) {
        passwordArray.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
        characters += symbols;
    }

    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }

    passwordArray = passwordArray.sort(() => Math.random() - 0.5);
    const password = passwordArray.join("");

    passBox.value = password;
    updatePasswordIndicator();
}

generateBtn.addEventListener("click", () => {
    generatePassword();
});

function updatePasswordIndicator() {
    const passwordStrength = getPasswordStrength(passBox.value);
    passIndicator.className = "pass-indicator " + passwordStrength;
    strengthMessage.textContent = passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1);
    strengthMessage.className = "strength-message " + passwordStrength;
}

function getPasswordStrength(password) {
    let strength = "weak";
    const lengthCriteria = password.length >= 8;
    const varietyCriteria = (
        (/[a-z]/.test(password) && lowercaseEl.checked) &&
        (/[A-Z]/.test(password) && uppercaseEl.checked) &&
        (/[0-9]/.test(password) && numbersEl.checked) &&
        (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) && symbolsEl.checked)
    );

    if (lengthCriteria && varietyCriteria) {
        if (password.length >= 20) {
            strength = "very-strong";
        } else if (password.length >= 15) {
            strength = "strong";
        } else {
            strength = "medium";
        }
    }

    return strength;
}

window.addEventListener('DOMContentLoaded', () => {
    updatePasswordIndicator();
});

copyBtn.addEventListener("click", () => {
    if (passBox.value !== "") {
        navigator.clipboard.writeText(passBox.value);
        copyBtn.innerText = "check";

        setTimeout(() => {
            copyBtn.innerHTML = "content_copy";
        }, 3000);
    }
});
