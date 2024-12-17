const challengeColors = ["red", "blue", "green", "yellow"];

let memorySequence = [];
let playerAttempt = [];

let challengeStarted = false;
let challengeLevel = 0;

document.addEventListener("keydown", function () {
  if (!challengeStarted) {
    updateLevel();
    generateSequenceStep();
    challengeStarted = true;
  }
});

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    const selectedColor = this.id;
    playerAttempt.push(selectedColor);
    triggerButtonEffect(selectedColor);
    validatePlayerSequence(playerAttempt.length - 1);
  });
});

function validatePlayerSequence(currentLevel) {
  if (memorySequence[currentLevel] === playerAttempt[currentLevel]) {
    if (playerAttempt.length === memorySequence.length) {
      setTimeout(function () {
        generateSequenceStep();
      }, 1000);
    }
  } else handleWrongMove();
}

function handleWrongMove() {
  document.body.classList.add("game-end");
  document.getElementById("title").textContent =
    "Game Over, Press Any Key to Restart";

  setTimeout(function () {
    document.body.classList.remove("game-end");
  }, 200);

  resetChallenge();
}

function generateSequenceStep() {
  playerAttempt = [];
  challengeLevel++;
  updateLevel();

  const randomIndex = Math.floor(Math.random() * 4);
  const randomSelectedColor = challengeColors[randomIndex];
  memorySequence.push(randomSelectedColor);
  const colorButton = document.getElementById(randomSelectedColor);

  colorButton.style.opacity = "0";
  setTimeout(() => {
    colorButton.style.opacity = "1";
  }, 100);
  setTimeout(() => {
    colorButton.style.opacity = "0";
  }, 200);
  setTimeout(() => {
    colorButton.style.opacity = "1";
  }, 300);
}

function triggerButtonEffect(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("clicked");
  setTimeout(function () {
    button.classList.remove("clicked");
  }, 100);
}

function resetChallenge() {
  challengeLevel = 0;
  memorySequence = [];
  challengeStarted = false;
}

function updateLevel() {
  document.getElementById("title").textContent = "Level " + challengeLevel;
}
