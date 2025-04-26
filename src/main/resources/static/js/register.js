// Глобальные переменные
let timeSpent = 0;
let moneySpent = 0;
let timerInterval;
let currentDigit = null;
let phoneNumber = '';
let password = '';
let selectedClass = '';

let bannerInitialized = false; // Как же он меня задолбал

// Классы пользователя
const userClasses = ['Ксеноморф', 'Криптотот', 'Петелинд', 'Сириец', 'Чернодырец'];
const classColors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33F0'];

// DOM элементы
const timerElement = document.getElementById('timer');
const randomDigitBtn = document.getElementById('randomDigit');
const fixDigitBtn = document.getElementById('fixDigit');
const currentDigitElement = document.getElementById('currentDigit');
const phoneNumberElement = document.getElementById('phoneNumber');
const generatePasswordBtn = document.getElementById('generatePassword');
const confirmPasswordElement = document.getElementById('confirmPassword');
const selectClassBtn = document.getElementById('selectClass');
const classValueElement = document.getElementById('classValue');
const classOptionsElement = document.getElementById('classOptions');
const captchaInput = document.getElementById('captcha');
const submitBtn = document.getElementById('submitBtn');
const banner = document.getElementById('banner');

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    setupEventListeners();
    initBankBanner();
});

// Таймер
function startTimer() {
    timerInterval = setInterval(() => {
        timeSpent++;
        const minutes = Math.floor(timeSpent / 60).toString().padStart(2, '0');
        const seconds = (timeSpent % 60).toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

// Генерация пароля
// Заменяем функцию generatePassword
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    password = '';
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Отображаем звёздочки вместо пароля
    document.getElementById('passwordDisplay').value = '•'.repeat(10);
    checkFormValidity();
}

// Добавляем защиту от копирования
document.getElementById('passwordDisplay').addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

document.getElementById('passwordDisplay').addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Баннер
function initBankBanner() {
    if (bannerInitialized) return;
    bannerInitialized = true;

    // Вешаем обработчики один раз
    document.querySelectorAll('#banner button').forEach(btn => {
        btn.addEventListener('click', () => {
            moneySpent += 299;
            hideBanner();
        });
    });

    // Первый показ через 7 секунд
    setTimeout(showBanner, 7000);
}

function showBanner() {
    banner.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('Баннер показан'); // Для отладки
}

function hideBanner() {
    banner.style.display = 'none';
    document.body.style.overflow = '';
    // Перезапускаем таймер
    setTimeout(showBanner, 7000);
}

// Обработчики событий
function setupEventListeners() {
    // Номер телефона
    randomDigitBtn.addEventListener('click', () => {
        currentDigit = Math.floor(Math.random() * 10);
        currentDigitElement.textContent = currentDigit;
    });

    fixDigitBtn.addEventListener('click', () => {
        if (currentDigit !== null && phoneNumber.length < 10) {
            phoneNumber += currentDigit;

            // Отображаем цифры зеркально
            phoneNumberElement.innerHTML = '';
            for (let i = 0; i < phoneNumber.length; i++) {
                const digitSpan = document.createElement('span');
                digitSpan.className = 'mirror-digit';
                digitSpan.textContent = phoneNumber[i];
                phoneNumberElement.appendChild(digitSpan);
            }

            currentDigit = null;
            currentDigitElement.textContent = '-';
            checkFormValidity();
        }
    });

    // Пароль
    generatePasswordBtn.addEventListener('click', generatePassword);
    confirmPasswordElement.addEventListener('input', checkFormValidity);

    // Класс пользователя
    selectClassBtn.addEventListener('click', showClassOptions);

    // Капча и отправка
    captchaInput.addEventListener('input', checkFormValidity);
    submitBtn.addEventListener('click', () => {
        localStorage.setItem('timeSpent', timeSpent.toString());
        localStorage.setItem('moneySpent', moneySpent.toString());
        window.location.href = '/result';
    });
}

// Выбор класса
function showClassOptions() {
    classOptionsElement.innerHTML = '';
    classOptionsElement.classList.remove('hidden');

    userClasses.forEach((cls, index) => {
        const button = document.createElement('button');
        button.textContent = cls;
        button.className = 'class-option';
        button.style.backgroundColor = classColors[index];

        let x = Math.random() * (window.innerWidth - 100);
        let y = Math.random() * (window.innerHeight - 50);
        let xSpeed = (Math.random() - 0.5) * 5;
        let ySpeed = (Math.random() - 0.5) * 5;

        button.style.left = `${x}px`;
        button.style.top = `${y}px`;

        const moveInterval = setInterval(() => {
            x += xSpeed;
            y += ySpeed;

            if (x <= 0 || x >= window.innerWidth - 100) xSpeed = -xSpeed;
            if (y <= 0 || y >= window.innerHeight - 50) ySpeed = -ySpeed;

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        }, 50);

        button.addEventListener('click', () => {
            clearInterval(moveInterval);
            selectedClass = cls;
            classValueElement.textContent = cls;
            classOptionsElement.classList.add('hidden');
            checkFormValidity();
        });

        classOptionsElement.appendChild(button);
    });
}

// Проверка формы
function checkFormValidity() {
    const isPhoneValid = phoneNumber.length === 10;
    const isPasswordValid = password.length === 10;
    const isConfirmValid = confirmPasswordElement.value === password;
    const isClassSelected = selectedClass !== '';
    const isCaptchaValid = captchaInput.value === 'مبرمج';

    submitBtn.disabled = !(isPhoneValid && isPasswordValid && isConfirmValid && isClassSelected && isCaptchaValid);
}
console.log('Проверка формы:', {
    phone: isPhoneValid,
    pass: isPasswordValid,
    confirm: isConfirmValid,
    class: isClassSelected,
    captcha: isCaptchaValid
});