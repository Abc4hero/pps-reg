// Здесь будет имя, время и деньги, переданные через sessionStorage
document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username') || 'Неизвестный';
    const timeSpent = sessionStorage.getItem('timeSpent') || 0;
    const moneySpent = sessionStorage.getItem('moneySpent') || 0;

    const congratulationsText = document.getElementById('congratulations-text');
    const summaryText = document.getElementById('summary-text');

    congratulationsText.textContent = `Поздравляем, ${username}!`;
    summaryText.textContent = `Ты потратил бесполезно ${timeSpent} секунд и подарил Т-банку ${moneySpent}₽!`;

    const finishButton = document.getElementById('finish-button');
    const loadingSpinner = document.getElementById('loading-spinner');

    finishButton.addEventListener('click', () => {
        finishButton.style.display = 'none';
        loadingSpinner.style.display = 'block';
    });
});
