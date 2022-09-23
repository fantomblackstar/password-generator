const inputLength = document.querySelector('.generator__input_type_range');

let passwordLength = 10;
let upperCaseFlag = true;
let loverCaseFlag = true;
let numberFlag = false;
let symbolFlag = false;

generatePassword();
inputLength.onchange = changePasswordLength;

function changePasswordLength() {
    passwordLength = +inputLength.value;
    document.querySelector('.generator__length').textContent = passwordLength;
    generatePassword();
}

document.querySelector('.generator__button_range_minus').onclick = () => {
    inputLength.value = +inputLength.value - 1;
    changePasswordLength();
}

document.querySelector('.generator__button_range_plus').onclick = () => {
    inputLength.value = +inputLength.value + 1;
    changePasswordLength();
}

function generatePassword() {
    document.querySelector('.characters-error').classList.add('hide');
    if (!upperCaseFlag && !loverCaseFlag && !numberFlag && !symbolFlag) {
        document.querySelector('.characters-error').classList.remove('hide');
        return;
    }

    let randomString = Math.random().toString(36).replace('.', '');
    while (randomString.length < passwordLength + 400) randomString += Math.random().toString(36).replace('.', '');

    let password = formatingPassword(randomString);
    showDifficulty();
    document.querySelector('.generator__input_white').value = password;
}

function formatingPassword(password) {
    if (upperCaseFlag) {
        password = [...password].map(elem => (Math.trunc(Math.random() * 10) % 2 == 0) ? elem.toUpperCase() : elem).join('');
    }
    if (symbolFlag) {
        let symbols = `~!@#$%^&*()_-+={[}]|\:;"'<,>.?/`;
        password = [...password].map(elem => (Math.trunc(Math.random() * 10) > 8) ? symbols[Math.trunc(Math.random() * 100) % 31] : elem).join('');
    }
    if (!loverCaseFlag) {
        password = password.replace(/[a-z]/g, '');
    }
    if (!numberFlag) {
        password = password.replace(/[0-9]/g, '');
    }
    return password.slice(-passwordLength);
}

function showDifficulty() {
    let difficultyBlock = document.querySelector('.generator__difficulty');
    let charactersDifficulty = 0;
    document.querySelectorAll('.generator__input_type_checkbox').forEach(elem => { if (elem.checked) charactersDifficulty += 1 });
    let difficulty = charactersDifficulty * 5 + passwordLength;
    if (passwordLength < 8 || difficulty < 20) difficultyBlock.style.backgroundColor = 'red';
    else if (difficulty < 30) difficultyBlock.style.backgroundColor = '#FF680A';
    else if (difficulty < 40) difficultyBlock.style.backgroundColor = 'green';
    else if (difficulty < 50) difficultyBlock.style.backgroundColor = 'blue';
    else if (difficulty < 60) difficultyBlock.style.backgroundColor = 'black';
}

document.querySelector('#ch1').onchange = () => {
    upperCaseFlag = !upperCaseFlag;
    generatePassword();
};
document.querySelector('#ch2').onchange = () => {
    loverCaseFlag = !loverCaseFlag;
    generatePassword();
}
document.querySelector('#ch3').onchange = () => {
    numberFlag = !numberFlag;
    generatePassword();
}
document.querySelector('#ch4').onchange = () => {
    symbolFlag = !symbolFlag;
    generatePassword();
}
document.querySelector('.btn-generate').onclick = function () {
    generatePassword();
    this.children[0].style.animationName = 'roll';
    setTimeout(() => document.querySelector('.btn-generate').children[0].style.animationName = 'none', 500);
};

document.querySelector('.btn-copy').onclick = function () {
    this.children[0].style.opacity = '0.5';
    setTimeout(() => document.querySelector('.btn-copy').children[0].style.opacity = '1', 300);
    let password =  document.querySelector('.generator__input_white').value;
    document.querySelector('#textarea-password').value = password;
    document.querySelector('#textarea-password').select();
    document.execCommand('copy');
    document.querySelector('.container').click();
};