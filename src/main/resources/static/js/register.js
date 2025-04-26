// src/main/resources/static/js/register.js

let timerInterval;
let timeSpent = 0;
let moneySpent = 0;

const timerDisplay = document.getElementById('timer');
const phoneNumberLabel = document.getElementById('phoneNumberLabel');
const phoneDigitLabel = document.getElementById('phoneDigitLabel');
const generateDigitButton = document.getElementById('generateDigit');
const confirmDigitButton = document.getElementById('confirmDigit');
const phoneHiddenInput = document.getElementById('phoneNumberHidden');
const passwordLabel = document.getElementById('passwordLabel');
const generatePasswordButton = document.getElementById('generatePassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const chooseSpeciesButton = document.getElementById('chooseSpecies');
const speciesHiddenInput = document.getElementById('speciesHidden');
const speciesButtonsContainer = document.getElementById('speciesButtons');
const captchaHint = document.getElementById('captchaHint');
const captchaInput = document.getElementById('captcha');
const registrationForm = document.getElementById('registrationForm');
const realSubmitButton = document.getElementById('realSubmit');
const banner = document.getElementById('banner');
const bannerButtons = banner.querySelectorAll('button');

const SPECIES = ['Ксеноморф', 'Криптонианец', 'Бетелианец', 'Сириусианец', 'Орвелианец'];

function startTimer() {
    timerInterval = setInterval(() => {
        timeSpent++;
        const minutes = String(Math.floor(timeSpent / 60)).padStart(2, '0');
        const seconds = String(timeSpent % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Телефон
let currentPhone = '';
let currentDigit = '';

generateDigitButton.addEventListener('click', () => {
    currentDigit = Math.floor(Math.random() * 10);
    phoneDigitLabel.textContent = currentDigit;
});

confirmDigitButton.addEventListener('click', () => {
    if (currentDigit !== '') {
        currentPhone += currentDigit;
        phoneNumberLabel.textContent = currentPhone;
        phoneHiddenInput.value = currentPhone;
        phoneDigitLabel.textContent = '_';
        currentDigit = '';
    }
});

// Пароль
function randomPassword(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

generatePasswordButton.addEventListener('click', () => {
    const password = randomPassword();
    passwordLabel.textContent = password;
});

confirmPasswordInput.addEventListener('focus', () => {
    confirmPasswordInput.removeAttribute('readonly');
});

confirmPasswordInput.addEventListener('input', () => {
    // Disable manual typing (allow only from on-screen keyboard)
    confirmPasswordInput.value = confirmPasswordInput.value;
});

// Класс пользователя
chooseSpeciesButton.addEventListener('click', () => {
    speciesButtonsContainer.innerHTML = '';
    const shuffledSpecies = [...SPECIES].sort(() => Math.random() - 0.5);
    shuffledSpecies.forEach(species => {
        const btn = document.createElement('button');
        btn.textContent = species;
        btn.className = 'species-button';
        btn.style.top = `${Math.random() * 80 + 10}%`;
        btn.style.left = `${Math.random() * 80 + 10}%`;
        btn.style.position = 'absolute';
        btn.addEventListener('click', () => {
            speciesHiddenInput.value = species;
            speciesButtonsContainer.innerHTML = '';
        });
        speciesButtonsContainer.appendChild(btn);
    });
});

// Показываем подсказку капчи сразу
captchaHint.classList.remove('hint-hidden');

// Баннер
let bannerTimeout;

function showBanner() {
    const { clientX, clientY } = lastMouseMove;
    banner.style.left = clientX + 'px';
    banner.style.top = clientY + 'px';
    banner.classList.remove('hidden');
}

function hideBanner() {
    banner.classList.add('hidden');
    clearTimeout(bannerTimeout);
    bannerTimeout = setTimeout(showBanner, 5000);
}

bannerButtons.forEach(button => {
    button.addEventListener('click', () => {
        moneySpent += 299;
        hideBanner();
    });
});

let lastMouseMove = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };

document.addEventListener('mousemove', e => {
    lastMouseMove = { clientX: e.clientX, clientY: e.clientY };
});

setTimeout(showBanner, 5000);

// Проверка заполненности всех полей
function validateForm() {
    return document.getElementById('username').value.trim() !== '' &&
        phoneHiddenInput.value.length === 10 &&
        passwordLabel.textContent.length > 0 &&
        confirmPasswordInput.value.trim() !== '' &&
        speciesHiddenInput.value.trim() !== '' &&
        captchaInput.value.trim().toLowerCase() === 'مبرمج';
}

// Отображение реальной кнопки отправки
registrationForm.addEventListener('input', () => {
    if (validateForm()) {
        realSubmitButton.classList.remove('hidden');
    } else {
        realSubmitButton.classList.add('hidden');
    }
});

// Старт таймера при открытии
startTimer();