// Глобальные переменные
let timeSpent = 0;
let moneySpent = 0;
let timerInterval;
let currentDigit = null;
let phoneNumber = '';
let password = '';
let selectedClass = '';

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

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    setupEventListeners();
    setupBankBanner(); // Заменяем initBankBanner() на новую функцию
});

// Переносим вызов на load для полной готовности DOM
window.addEventListener('load', () => {
    // Дополнительная проверка, если нужно
    if (!document.querySelector('#bankBanner .banner-footer')) {
        console.error('Footer баннера не найден!');
        // Принудительно пересоздаём структуру
        recreateBannerFooter();
    }
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

// Генерация пароля с спецсимволами
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    password = '';
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordElement.textContent = password;
    checkFormValidity();
}

// Баннер Т-банка
function setupBankBanner() {
    const banner = document.getElementById('bankBanner');
    if (!banner) {
        console.error('Баннер не найден!');
        return;
    }

    // Принудительно создаём footer если его нет
    if (!banner.querySelector('.banner-footer')) {
        recreateBannerFooter();
    }

    let bannerTimeout;

    function showBanner() {
        banner.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Баннер показан');
    }

    function hideBanner() {
        banner.style.display = 'none';
        document.body.style.overflow = '';
        moneySpent += 299;
        console.log('Баннер скрыт, moneySpent:', moneySpent);
        startBannerTimer();
    }

    function startBannerTimer() {
        clearTimeout(bannerTimeout);
        bannerTimeout = setTimeout(showBanner, 7000);
        console.log('Таймер баннера запущен');
    }

    // Вешаем обработчики с проверкой
    const buttons = banner.querySelectorAll('button');
    console.log('Найдено кнопок:', buttons.length);

    buttons.forEach(btn => {
        btn.addEventListener('click', hideBanner);
        console.log('Обработчик добавлен для:', btn.textContent);
    });

    startBannerTimer();
}

function recreateBannerFooter() {
    const banner = document.getElementById('bankBanner');
    if (!banner) return;

    const footerHtml = `
        <div class="banner-footer">
            <button class="banner-btn" data-action="ok">ОК</button>
            <button class="banner-btn" data-action="cancel">ОТМЕНА</button>
            <button class="banner-btn" data-action="good">Хорошо</button>
            <button class="banner-btn" data-action="agree">Я согласен</button>
        </div>
    `;

    const container = banner.querySelector('.banner-container');
    if (container) {
        container.insertAdjacentHTML('beforeend', footerHtml);
        console.log('Footer баннера пересоздан');
    }
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
    generatePasswordBtn.addEventListener('click', generatePassword);

    // Подтверждение пароля
    confirmPasswordElement.addEventListener('input', checkFormValidity);

    // Выбор класса пользователя
    selectClassBtn.addEventListener('click', showClassOptions);

    // Проверка капчи при изменении
    captchaInput.addEventListener('input', checkFormValidity);

    // Отправка формы
    submitBtn.addEventListener('click', () => {
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