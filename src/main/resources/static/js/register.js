let seconds = 0;
let timerInterval;
let moneySpent = 0;

// Таймер
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${secs}`;
    }, 1000);
}

// Генерация выпадающих списков для телефона
function generatePhoneSelectors() {
    const container = document.getElementById('phoneNumberSelectors');
    const allowedChars = '0123456789!@#$%^&*';
    const shuffled = allowedChars.split('').sort(() => Math.random() - 0.5);

    for (let i = 0; i < 10; i++) {
        const select = document.createElement('select');
        shuffled.forEach(char => {
            const option = document.createElement('option');
            option.value = char;
            option.textContent = char;
            select.appendChild(option);
        });
        container.appendChild(select);
    }
}

// Генерация сложного пароля
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('generatedPassword').value = password;
}

// Прыгающее поле подтверждения пароля
function makeConfirmPasswordJump() {
    const confirmField = document.getElementById('confirmPassword');
    confirmField.addEventListener('focus', () => {
        setTimeout(() => {
            confirmField.blur();
            const offsetX = Math.random() * 100 - 50;
            const offsetY = Math.random() * 100 - 50;
            confirmField.style.position = 'relative';
            confirmField.style.top = `${offsetY}px`;
            confirmField.style.left = `${offsetX}px`;
        }, 400);
    });
}

// Баннер
function showBanner() {
    const banner = document.getElementById('banner');
    banner.classList.remove('hidden');

    const buttons = document.querySelectorAll('.banner-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            moneySpent += 299;
            banner.classList.add('hidden');
        });
    });

    const closeButton = document.getElementById('closeLater');
    closeButton.addEventListener('click', () => {
        banner.classList.add('hidden');
    });
}

// Показать подсказку к капче
function showHint() {
    document.getElementById('captchaHint').classList.remove('hint-hidden');
}

// Проверка формы перед отправкой
function validateForm(event) {
    event.preventDefault();

    // Проверка номера телефона
    const selects = document.querySelectorAll('#phoneNumberSelectors select');
    let phoneNumber = '';
    selects.forEach(select => {
        phoneNumber += select.value;
    });
    if (!/^\d{10}$/.test(phoneNumber)) {
        alert('Номер телефона должен содержать только 10 цифр!');
        return;
    }

    // Проверка капчи
    const captchaInput = document.getElementById('captchaInput').value.trim();
    if (captchaInput !== 'مبرمج') {
        alert('Неверная капча!');
        return;
    }

    // Проверка пароля
    const generatedPassword = document.getElementById('generatedPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (generatedPassword !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    // Всё ок, переходим на страницу результата
    sessionStorage.setItem('phoneNumber', phoneNumber);
    sessionStorage.setItem('timeSpent', seconds);
    sessionStorage.setItem('moneySpent', moneySpent);

    window.location.href = '/result';
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    generatePhoneSelectors();
    generatePassword();
    makeConfirmPasswordJump();
    setTimeout(showBanner, 5000); // Показать баннер через 5 секунд
    document.getElementById('captchaInput').addEventListener('focus', showHint);
    document.getElementById('registrationForm').addEventListener('submit', validateForm);
});