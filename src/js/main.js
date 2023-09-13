import '../assets/styles/normalize.css'
import '../assets/styles/index.css'
import Confetti from './confetti';

let randomNum = 0;
let attempts = 0;
let minNum = 1;
let maxNum = 100;
let failedAttempts = 0;
const guessBtnElement = document.getElementById('guessBtn');
const startGameAgainBtnElement = document.getElementById('startGameAgainBtn');
const changeRangeBtnElement = document.getElementById('changeRangeBtn');
const startGameBtnElement = document.getElementById('startGameBtn');

const gameCard = document.getElementById('game');
const rangeCard = document.getElementById('range');
const minInput = document.getElementById('minNum');
const maxInput = document.getElementById('maxNum');
const attemptText = document.getElementById('attempts');
const hintText = document.getElementById('hint');
const userGuessInput = document.getElementById('userGuess');
const Confety = new Confetti('confetti', 100)
let isGuessed = false

const changeRange = function() {
    gameCard.style.display = 'none';
    rangeCard.style.display = 'flex';
}

const startGame = function() {
    guessBtnElement.classList.remove('btn-main__disabled')
    isGuessed = false
    maxNum = parseInt(maxInput.value, 10);
    minNum = parseInt(minInput.value, 10);
    randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    attempts = 0;
    failedAttempts = 0;
    rangeCard.style.display = 'none';
    gameCard.style.display = 'flex';
    attemptText.innerText = attempts;
    hintText.innerText = '';
}

const checkGuess = function() {
    let userGuess = parseInt(userGuessInput.value);
    if (isGuessed) {
        return
    }
    if (isNaN(userGuess)) {
        hintText.innerText = 'Укажите число!';
        return
    }
    if (userGuess < minNum || userGuess > maxNum) {
        hintText.innerText = 'Вне выбранного диапазона!';
        return;
    }
    attempts++;
    attemptText.innerText = attempts;
    if (userGuess === randomNum) {
        isGuessed = true
        guessBtnElement.classList.add('btn-main__disabled')
        Confety.startConfetti(3000)
        hintText.innerText = 'Поздравляем! Вы угадали!';
    } else {
        failedAttempts++;

        if (failedAttempts % 3 === 0) {
            hintText.innerText = `${randomNum > userGuess ? 'Загаданное число больше' : 'Загаданное число меньше'}\nЧисло ${randomNum % 2 === 0 ? 'четное' : 'нечетное'}`;
        } else {
            hintText.innerText = randomNum > userGuess ? 'Загаданное число больше' : 'Загаданное число меньше';
        }
    }
}


guessBtnElement.addEventListener('click', () => {
    checkGuess();   
});


startGameAgainBtnElement.addEventListener('click', () => {
    startGame();
});


changeRangeBtnElement.addEventListener('click', () => {
    changeRange();
})


startGameBtnElement.addEventListener('click', () => {
    startGame();
});

