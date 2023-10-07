'use strict';

let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isGameActive = true;

const SCORE_TO_WIN_THE_GAME = 100;
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const initBoard = function () {
  resetScores();
  isGameActive = true;
  dice.classList.add('hidden');
};

const resetScores = function () {
  const scores = document.querySelectorAll('.score');
  scores.forEach(score => (score.textContent = 0));
};

initBoard();

btnRoll.addEventListener('click', function () {
  if (isGameActive) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber === 1) {
      currentScore = 0;
      updatePlayerScore(activePlayer, currentScore);
      endPlayerTurn();
    } else {
      currentScore += diceNumber;
      updatePlayerScore(activePlayer, currentScore);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isGameActive) {
    totalScore[activePlayer] += currentScore;
    currentScore = 0;
    updatePlayerScore(activePlayer, currentScore);
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= SCORE_TO_WIN_THE_GAME) {
      isGameActive = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      dice.classList.add('hidden');
    } else {
      endPlayerTurn();
    }
  }
});

btnNew.addEventListener('click', function () {
  initBoard();
  currentScore = 0;
  totalScore = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
});

const updatePlayerScore = function (activePlayer, currentScore) {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const endPlayerTurn = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
