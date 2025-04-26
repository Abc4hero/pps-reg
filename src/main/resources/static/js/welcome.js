let workingButtons = [];
let totalButtons = 0;
let gamePhase = 1;

function createButton(x, y, isWorking = false) {
    const btn = document.createElement('button');
    btn.style.left = `${x}%`;
    btn.style.top = `${y}%`;
    btn.textContent = 'REG';
    document.body.appendChild(btn);

    if (isWorking) {
        btn.onclick = nextRound;
    } else {
        btn.onclick = () => {};
    }
}

function startGame() {
    document.getElementById('startButton').remove();
    createMultipleButtons(3, true);
}

function createMultipleButtons(count, firstRound = false) {
    totalButtons += count;
    workingButtons = [];

    for (let i = 0; i < count; i++) {
        const isWorking = firstRound && i === 0; // только первая волна, только одна рабочая
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        createButton(x, y, isWorking);
        if (isWorking) workingButtons.push(document.body.lastChild);
    }

    if (!firstRound && workingButtons.length === 0) {
        // На следующих раундах случайно выбрать работающую кнопку
        const buttons = Array.from(document.querySelectorAll('button'));
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        randomButton.onclick = nextRound;
        workingButtons.push(randomButton);
    }
}

function nextRound() {
    // Удалить старые рабочие кнопки
    workingButtons.forEach(btn => btn.remove());
    workingButtons = [];

    if (totalButtons >= 12) {
        // Переход к уравнению
        showEquation();
        return;
    }

    createMultipleButtons(3);
}

function showEquation() {
    // Удаляем все кнопки
    document.querySelectorAll('button').forEach(btn => btn.remove());

    const container = document.createElement('div');
    container.id = 'equationContainer';

    const a = Math.floor(Math.random() * 20 + 1);
    const b = Math.floor(Math.random() * 20 + 1);
    const op = Math.random() > 0.5 ? '+' : '-';
    const correctAnswer = op === '+' ? a + b : a - b;

    container.innerHTML = `
    <div id="equation">Решите уравнение: (${a}) ${op} (${b}) = ?</div>
    <input type="number" id="answerInput" />
    <button id="submitAnswer" onclick="checkAnswer(${correctAnswer})">Ответить</button>
`;

    document.body.appendChild(container);
}

function checkAnswer(correctAnswer) {
    const userAnswer = document.getElementById('answerInput').value;
    if (parseInt(userAnswer) === correctAnswer) {
        window.location.href = '/register';
    } else {
        window.location.href = '/';
    }
}

window.onload = function () {
    document.getElementById('startButton').onclick = startGame;
};