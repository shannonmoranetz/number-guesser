var challengerOneName = document.querySelector('.challenger-one-name');
var challengerTwoName = document.querySelector('.challenger-two-name');
var clearButton = document.querySelector('.clear-button');
var currentMaxRange = document.querySelector('.current-max-range');
var currentMinRange = document.querySelector('.current-min-range');
var errorMaxRange = document.querySelector('.error-max-range');
var errorMinRange = document.querySelector('.error-min-range');
var errorNameOne = document.querySelector('.error-name-one');
var errorNameTwo = document.querySelector('.error-name-two');
var guessButton = document.querySelector('.guess-button');
var guessPlayerOne = document.querySelector('.guess-player-one');
var guessPlayerTwo = document.querySelector('.guess-player-two');
var maxRange = document.querySelector('.max-range').value;
var minRange = document.querySelector('.min-range').value;
var outputMessagePlayerOne = document.querySelector('.output-message-player-one');
var outputMessagePlayerTwo = document.querySelector('.output-message-player-two');
var playerOneGuess = document.querySelector('.player-one-guess');
var playerTwoGuess = document.querySelector('.player-two-guess');
var playerOneGuesses = [1];
var playerTwoGuesses = [1];
var playerOneName = document.querySelector('.player-one-name');
var playerTwoName = document.querySelector('.player-two-name');
var playerXEndTime = 0;
var playerOneTimer = 0;
var playerTwoTimer = 0;
var resetButton = document.querySelector('.reset-button');
var scoreCardContainerDiv = document.querySelector('.score-card-container');
var updateButton = document.querySelector('.update-button');

initializeGame();
generateRandomNumber();

updateButton.addEventListener('click', function() {
  checkRangeNumbers();
  if (checkRangeNumbers() === true) {
    generateRandomNumber();
    currentMinRange.innerHTML = `${minRange}`;
    currentMaxRange.innerHTML = `${maxRange}`;
  }
});

guessButton.addEventListener('click', function() {
  updateNames();
  if (updateNames() === false) {
    return;
  } else {
    gameLoop();
  }
});

resetButton.addEventListener('click', function() {
  resetGame();
});

clearButton.addEventListener('click', function() {
  playerOneGuess.value = '';
  playerTwoGuess.value = '';
  clearButton.disabled = true;
  clearButton.classList.add('hide');
});

scoreCardContainerDiv.addEventListener('click', function(event) {
  var classFind = event.target.className.substr(9,10);
  var del = document.querySelector('.div' + classFind);
  if (event.target.tagName.toLowerCase() === 'button') {
      del.remove();
  }
});

function initializeGame() {
  playerOneGuess.value = '';
  playerTwoGuess.value = '';
  playerOneName.value = '';
  playerTwoName.value = '';
  minRange.value = 1;
  document.querySelector('.min-range').value = 1;
  document.querySelector('.max-range').value = 100;
  document.querySelector('.current-min-range').innerHTML = '1';
  document.querySelector('.current-max-range').innerHTML = '100';
};

function generateRandomNumber() {
  minRange = document.querySelector('.min-range').value;
  maxRange = document.querySelector('.max-range').value;
  var minRangeInt =parseInt(minRange);
  var maxRangeInt =parseInt(maxRange);
  randomNumber = Math.floor(Math.random() * (maxRangeInt - minRangeInt+1)) + minRangeInt;
};

function checkRangeNumbers() {
  var errorMin = document.querySelector('.error-min');
  var errorMax = document.querySelector('.error-max');
  errorMin.classList.add('hide-error');
  errorMax.classList.add('hide-error');
  var minRange = document.querySelector('.min-range').value;
  var maxRange = document.querySelector('.max-range').value;
  var minRangeInt = parseInt(minRange);
  var maxRangeInt = parseInt(maxRange);

  if ((isNaN(minRange) || minRange === "") && (isNaN(maxRange) || maxRange === "")) {
    errorMin.classList.remove('hide-error');
    errorMax.classList.remove('hide-error');
  }
  else if (isNaN(maxRange) || maxRange === "") {
    errorMax.classList.remove('hide-error');
  }
  else if (isNaN(minRange) || minRange === "") {
    errorMin.classList.remove('hide-error');
  } 
  else if (minRangeInt >= maxRangeInt) {
    outputMessagePlayerOne.innerHTML = "Your minimum number is greater than or equal to than your maximum number!";
    outputMessagePlayerTwo.innerHTML = "Your minimum number is greater than or equal to than your maximum number!";
  }
  else if (minRangeInt < maxRangeInt) {
    outputMessagePlayerOne.innerHTML = "";
    outputMessagePlayerTwo.innerHTML = "";
    return true;
  }
  else {
    outputMessagePlayerOne.innerHTML = "UNEXPECTED ERROR";
    outputMessagePlayerTwo.innerHTML = "UNEXPECTED ERROR";
  }
};

function gameLoop() {
 gameStartBtnState();
 var playerOneGuessInt = parseInt(playerOneGuess.value);
 var playerTwoGuessInt = parseInt(playerTwoGuess.value);
 if (playerOneGuessInt === '') {
  outputMessagePlayerOne.innerHTML = "Please enter a guess!";
  }
  else if (isNaN(playerOneGuessInt)) {
    outputMessagePlayerOne.innerHTML = "That is not a number!";  
  }
  else if (parseInt(playerOneGuessInt) > parseInt(maxRange)) { 
    outputMessagePlayerOne.innerHTML = "That is outside the maximum range!";
  }
  else if (parseInt(playerOneGuessInt) < parseInt(minRange)) { 
    outputMessagePlayerOne.innerHTML = "That is outside the minimum range!";  
  }
  else if (parseInt(playerOneGuessInt) > randomNumber) { 
    outputMessagePlayerOne.innerHTML = "That's too high";
    playerOneGuesses.push(playerOneGuessInt);
    guessPlayerOne.innerHTML = `${playerOneGuessInt}`;
    trackTimeOne();
  }
  else if (parseInt(playerOneGuessInt) < randomNumber) {  
    outputMessagePlayerOne.innerHTML = "That's too low";
    playerOneGuesses.push(playerOneGuessInt);
    guessPlayerOne.innerHTML = `${playerOneGuessInt}`;
    trackTimeOne();
  }
  else if (parseInt(playerOneGuessInt) === randomNumber) {
    trackTimeOne();
    outputMessagePlayerOne.innerHTML = "BOOM!";
    guessPlayerOne.innerHTML = `${playerOneGuessInt}`;
    var winner = playerOneName;
    var totalGuesses = playerOneGuesses.length;
    playerXEndTime = Math.floor(Date.now() / 1000);
    gameWon(winner, totalGuesses, playerOneTimer, playerXEndTime);
  }
  else { 
    outputMessagePlayerTwo.innerHTML = "UNEXPECTED ERROR";
  }

  if (playerTwoGuessInt === '') {
    outputMessagePlayerTwo.innerHTML = "Please enter a guess!";
  }
  else if (isNaN(playerTwoGuessInt)) {
    outputMessagePlayerTwo.innerHTML = "That is not a number!";  
  }
  else if (parseInt(playerTwoGuessInt) > parseInt(maxRange)) { 
    outputMessagePlayerTwo.innerHTML = "That is outside the maximum range!";
  }
  else if (parseInt(playerTwoGuessInt) < parseInt(minRange)) { 
    outputMessagePlayerTwo.innerHTML = "That is outside the minimum range!";  
  }
  else if (parseInt(playerTwoGuessInt) > randomNumber) { 
    outputMessagePlayerTwo.innerHTML = "That's too high";
    playerTwoGuesses.push(playerTwoGuessInt);
    guessPlayerTwo.innerHTML = `${playerTwoGuessInt}`;
    trackTimeTwo();
  }
  else if (parseInt(playerTwoGuessInt) < randomNumber) {  
    outputMessagePlayerTwo.innerHTML = "That's too low";
    playerTwoGuesses.push(playerTwoGuessInt);
    guessPlayerTwo.innerHTML = `${playerTwoGuessInt}`;
    trackTimeTwo();
  }
  else if (parseInt(playerTwoGuessInt) === randomNumber) {
    trackTimeTwo();
    outputMessagePlayerTwo.innerHTML = "BOOM!";
    guessPlayerTwo.innerHTML = `${playerTwoGuessInt}`;
    var winner = playerTwoName;
    var totalGuesses = playerTwoGuesses.length;
    playerXEndTime = Math.floor(Date.now() / 1000);
    gameWon(winner, totalGuesses, playerTwoTimer, playerXEndTime);
  }
  else { 
    outputMessagePlayerTwo.innerHTML = "UNEXPECTED ERROR";
  } 
};

function resetGame() {
  initializeGame();
  gameResetBtnState();
  generateRandomNumber();
  playerOneGuesses = [1];
  playerTwoGuesses = [1];
};

function gameResetBtnState() {
  resetButton.disabled = true;
  resetButton.classList.add('hide');
  updateButton.disabled = false;
  updateButton.classList.remove('hide');
  clearButton.disabled = true;
  clearButton.classList.add('hide');
  minRange.disabled = false;
  maxRange.disabled = false;
};

function gameStartBtnState() {
  minRange.disabled = true;
  maxRange.disabled = true;
  clearButton.disabled = false;
  clearButton.classList.remove('hide');
  resetButton.disabled = false;
  resetButton.classList.remove('hide');
  updateButton.disabled = true;
  updateButton.classList.add('hide');
};

function gameWinBtnState() {
  updateButton.disabled = false;
  updateButton.classList.remove('hide');
  minRange.disabled = false;
  maxRange.disabled = false;
};

function updateNames() {
  playerOneName = document.querySelector('.player-one-name').value;
  playerTwoName = document.querySelector('.player-two-name').value;
  if (playerOneName === '') {
    var errorNameOne = document.querySelector('.error-name-one');
    errorNameOne.classList.remove('hide-error');
    var errorBoxOne = document.querySelector('.player-one-name');
    errorBoxOne.classList.add('box-error');
  } else {
   challengerOneName.innerHTML = playerOneName;
   var errorNameOne = document.querySelector('.error-name-one');
   errorNameOne.classList.add('hide-error');
   var errorBoxOne = document.querySelector('.player-one-name');
   errorBoxOne.classList.remove('box-error');
  }
   if (playerTwoName === '') {
    var errorNameTwo = document.querySelector('.error-name-two');
    errorNameTwo.classList.remove('hide-error');
    var errorBoxTwo = document.querySelector('.player-two-name');
    errorBoxTwo.classList.add('box-error');
  } else {
   challengerTwoName.innerHTML = playerTwoName;
   var errorNameTwo = document.querySelector('.error-name-two');
   errorNameTwo.classList.add('hide-error');
   var errorBoxTwo = document.querySelector('.player-two-name');
   errorBoxTwo.classList.remove('box-error');
  }
  if ((playerOneName === '') || (playerTwoName === '')) {
    return false;
  }
};

function gameWon(winner, totalGuesses, playerXTimer, playerXEndTime) {
  var diffM = Math.floor((playerXEndTime - playerXTimer) / 60);
  var diffS = (playerXEndTime - playerXTimer) % 60;
  if (playerXTimer === 0) {
    diffS = 0;
    diffM = 0;
  }
  if (diffS < 10) {
    diffS = '0' + diffS;
  }
  createDiv(winner, totalGuesses, diffM, diffS, playerXEndTime);
  resetGame();
};

function createDiv(winner, totalGuesses, diffM, diffS, playerXEndTime) {
  var newDiv = document.createElement('div');
  newDiv.className = 'div' + playerXEndTime + ' score-card';
  newDiv.innerHTML = `
  <div class="score-card-vs">
  <div class="score-card-challenger">${playerOneName}</div>
  <div class="score-card-static-vs">vs</div>
  <div class="score-card-challenger">${playerTwoName}</div>
  </div>   
  <div class="score-card-winner">
  <div class="score-card-winner-name">${winner}</div>
  <div class="score-card-static-winner">WINNER</div>
  </div> 
  <div class="score-card-stats">
  <div class="score-card-guesses">${totalGuesses} GUESSES</div>
  <div class="score-card-timer">${diffM}:${diffS} MINUTES</div>
  <button class="timestamp${playerXEndTime} delete-card">Delete</button>
  </div>
  `
  scoreCardContainerDiv.appendChild(newDiv);
};

function trackTimeOne() {
  if (playerOneGuesses.length === 2) {
    playerOneTimer = Math.floor(Date.now() / 1000);
  }
  if (playerOneGuesses.length === 1) {
    playerOneTimer = 0;
  }
};

function trackTimeTwo() {
  if (playerTwoGuesses.length === 2) {
    playerTwoTimer = Math.floor(Date.now() / 1000);
  }
  if (playerTwoGuesses.length === 1) {
    playerTwoTimer = 0;
  }
};
