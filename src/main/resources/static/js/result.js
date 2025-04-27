document.addEventListener('DOMContentLoaded', () => {
    // Подставляем данные из localStorage
    document.getElementById('classValue').textContent = localStorage.getItem('selectedClass') || '-';
    document.getElementById('username').textContent = localStorage.getItem('username') || '-';
    document.getElementById('phoneNumber').textContent = localStorage.getItem('phoneNumber') || '-';
    document.getElementById('timeSpent').textContent = localStorage.getItem('timeSpent') || '0';
    document.getElementById('moneySpent').textContent = localStorage.getItem('moneySpent') || '0';

    // Очистка localStorage при возврате на главную
    const backButton = document.querySelector('.btn');
    backButton.addEventListener('click', () => {
        localStorage.removeItem('selectedClass');
        localStorage.removeItem('username');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('timeSpent');
        localStorage.removeItem('moneySpent');
        localStorage.removeItem('namae');
    });
});