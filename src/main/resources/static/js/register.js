// Глобальные переменные
let timeSpent = 0;
let moneySpent = 0;
let timerInterval;
let currentDigit = null;
let phoneNumber = '';
let password = '';
let selectedClass = '';
let bankBannerInterval;

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
const passwordElement = document.getElementById('password');
const confirmPasswordElement = document.getElementById('confirmPassword');
const selectClassBtn = document.getElementById('selectClass');
const classValueElement = document.getElementById('classValue');
const classOptionsElement = document.getElementById('classOptions');
const captchaInput = document.getElementById('captcha');
const submitBtn = document.getElementById('submitBtn');
const bankBanner = document.getElementById('bankBanner');
const keyboardButtons = document.querySelectorAll('.key');

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    setupEventListeners();
    startBankBanner();
});
// Слушаем мышь для раздражающего баннера
document.addEventListener('mousemove', (e) => {
    localStorage.setItem('lastMouseX', e.clientX.toString());
    localStorage.setItem('lastMouseY', e.clientY.toString());
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

// Баннер Т-банка
function startBankBanner() {
    bankBannerInterval = setInterval(() => {
        showBankBanner();
    }, 7000);
}

function showBankBanner() {
    // Отслеживаем позицию курсора
    document.addEventListener('mousemove', updateBannerPosition);

    // Показываем баннер рядом с текущей позицией курсора
    const x = parseInt(localStorage.getItem('lastMouseX') || '0');
    const y = parseInt(localStorage.getItem('lastMouseY') || '0');
    updateBannerPosition({ clientX: x, clientY: y });

    bankBanner.classList.remove('hidden');
}

function updateBannerPosition(e) {
    // Сохраняем позицию курсора для последующего использования
    localStorage.setItem('lastMouseX', e.clientX.toString());
    localStorage.setItem('lastMouseY', e.clientY.toString());

    // Позиционируем баннер
    bankBanner.style.left = (e.clientX - 100) + 'px';
    bankBanner.style.top = (e.clientY - 50) + 'px';
}

function hideBankBanner() {
    // Удаляем обработчик перемещения
    document.removeEventListener('mousemove', updateBannerPosition);

    bankBanner.classList.add('hidden');
    moneySpent += 299;
}

// Обработчики событий
function setupEventListeners() {
    // Генерация цифры для номера телефона
    randomDigitBtn.addEventListener('click', () => {
        currentDigit = Math.floor(Math.random() * 10);
        currentDigitElement.textContent = currentDigit;
    });

    // Фиксация цифры в номере телефона
    fixDigitBtn.addEventListener('click', () => {
        if (currentDigit !== null && phoneNumber.length < 10) {
            phoneNumber += currentDigit;
            phoneNumberElement.textContent = phoneNumber;
            currentDigit = null;
            currentDigitElement.textContent = '-';
            checkFormValidity();
        }
    });

    // Генерация пароля
    generatePasswordBtn.addEventListener('click', () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        password = '';
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        passwordElement.textContent = password;
        checkFormValidity();
    });

    // Виртуальная клавиатура для подтверждения пароля
    keyboardButtons.forEach(button => {
        button.addEventListener('click', () => {
            confirmPasswordElement.value += button.getAttribute('data-char');
            checkFormValidity();
        });
    });

    // Выбор класса пользователя
    selectClassBtn.addEventListener('click', showClassOptions);

    // Кнопки баннера
    document.querySelectorAll('.banner-btn').forEach(button => {
        button.addEventListener('click', hideBankBanner);
    });

    // Проверка капчи при изменении
    captchaInput.addEventListener('input', checkFormValidity);

    // Отправка формы
    submitBtn.addEventListener('click', () => {
        // Сохраняем данные как строки
        localStorage.setItem('timeSpent', timeSpent.toString());
        localStorage.setItem('moneySpent', moneySpent.toString());
        window.location.href = '/result';
    });
}

// Показ вариантов классов
function showClassOptions() {
    classOptionsElement.innerHTML = '';
    classOptionsElement.classList.remove('hidden');

    userClasses.forEach((cls, index) => {
        const button = document.createElement('button');
        button.textContent = cls;
        button.className = 'class-option';
        button.style.backgroundColor = classColors[index];

        // Позиционирование и анимация
        const startX = Math.random() * (window.innerWidth - 100);
        const startY = Math.random() * (window.innerHeight - 50);

        button.style.left = `${startX}px`;
        button.style.top = `${startY}px`;

        let x = startX;
        let y = startY;
        let xSpeed = (Math.random() - 0.5) * 10;
        let ySpeed = (Math.random() - 0.5) * 10;

        const moveInterval = setInterval(() => {
            x += xSpeed;
            y += ySpeed;

            // Отскок от границ
            if (x <= 0 || x >= window.innerWidth - 100) {
                xSpeed = -xSpeed;
            }
            if (y <= 0 || y >= window.innerHeight - 50) {
                ySpeed = -ySpeed;
            }

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

// Проверка валидности формы
function checkFormValidity() {
    const isPhoneValid = phoneNumber.length === 10;
    const isPasswordValid = password.length === 10;
    const isConfirmValid = confirmPasswordElement.value === password;
    const isClassSelected = selectedClass !== '';
    const isCaptchaValid = captchaInput.value === 'مبرمج';

    submitBtn.disabled = !(isPhoneValid && isPasswordValid && isConfirmValid && isClassSelected && isCaptchaValid);
}