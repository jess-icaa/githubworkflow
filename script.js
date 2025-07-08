// Declare variables for tracking scores and round number
let userScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

// Get references to DOM elements
const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');
const roundNumberDisplay = document.getElementById('round-number');

const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset-game');

const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const gameResultDisplay = document.getElementById('game-result');
const finalResultDisplay = document.getElementById('final-result-text');

// Randomly return rock, paper, or scissors
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Determine winner based on rules
function getWinner(user, computer) {
  if (user === computer) return 'tie';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) return 'user';
  return 'computer';
}

// Update score, round, and result on the screen
function updateUI(userChoice, computerChoice, winner) {
  userChoiceDisplay.textContent = `Your choice: ${userChoice}`;
  computerChoiceDisplay.textContent = `Computer's choice: ${computerChoice}`;

  if (winner === 'user') {
    userScore++;
    gameResultDisplay.textContent = 'You win this round!';
  } else if (winner === 'computer') {
    computerScore++;
    gameResultDisplay.textContent = 'Computer wins this round!';
  } else {
    gameResultDisplay.textContent = "It's a tie!";
  }

  userScoreDisplay.textContent = userScore;
  computerScoreDisplay.textContent = computerScore;
  roundNumberDisplay.textContent = round;
}

// Check for game over and declare result if 5 rounds completed
function checkGameOver() {
  if (round > maxRounds) {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;

    if (userScore > computerScore) {
      finalResultDisplay.textContent = 'Congratulations! You won the game!';
    } else if (computerScore > userScore) {
      finalResultDisplay.textContent = 'Game Over! Computer wins the game!';
    } else {
      finalResultDisplay.textContent = "It's a tie! Try again!";
    }
  }
}

// Handle a player choice
function playRound(userChoice) {
  if (round > maxRounds) return;

  const computerChoice = getComputerChoice();
  const winner = getWinner(userChoice, computerChoice);

  updateUI(userChoice, computerChoice, winner);
  round++;
  checkGameOver();
}

// Reset the game
function resetGame() {
  userScore = 0;
  computerScore = 0;
  round = 1;

  userScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;
  roundNumberDisplay.textContent = 1;

  userChoiceDisplay.textContent = 'Your choice:';
  computerChoiceDisplay.textContent = "Computer's choice:";
  gameResultDisplay.textContent = 'Game Result:';
  finalResultDisplay.textContent = '';

  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
}

// Attach event listeners to buttons
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);
