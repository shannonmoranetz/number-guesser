// input & output
var userGuess = document.querySelector('.user-guess');
var outputMessage = document.querySelector('.output-message');

// Initial random Number
initializeGame();
generateRandomNumber();

var minRange = document.querySelector('.min-range').value;
var maxRange = document.querySelector('.max-range').value;

function initializeGame() 
{
  document.querySelector('.user-guess').value = "";
  document.querySelector('.min-range').value = 1;
  document.querySelector('.max-range').value = 100;
  document.querySelector('.current-min-range').innerHTML = '1';
  document.querySelector('.current-max-range').innerHTML = '100';
}

function checkRangeNumbers() 
{
  minRange = document.querySelector('.min-range').value;
  maxRange = document.querySelector('.max-range').value;
  if (isNaN(minRange) || minRange === "")
  {
    var errorMin = document.querySelector('.error-min');
    errorMin.classList.remove('hide-error');

    if (isNaN(maxRange) || maxRange === "")
    { 
      var errorMax = document.querySelector('.error-max');
      errorMax.classList.remove('hide-error');
    }
    
  }
  else if (isNaN(maxRange) || maxRange === "")
  { 
    var errorMax = document.querySelector('.error-max');
    errorMax.classList.remove('hide-error');
  }
  else if (minRange > maxRange)
  {
    outputMessage.innerHTML = "Your minimum number is greater than your maximum number!";
  }
  else 
  { 
    outputMessage.innerHTML = "UNEXPECTED ERROR";
  }
}

//update ranges
var updateButton = document.querySelector('.update-button');
updateButton.addEventListener('click', function() {
  checkRangeNumbers();
  generateRandomNumber();
  document.querySelector('.current-min-range').innerHTML = `${minRange}`;
  document.querySelector('.current-max-range').innerHTML = `${maxRange}`;
});

// the guess button
var guessButton = document.querySelector('.guess-button');
guessButton.addEventListener('click', gameLoop);

function generateRandomNumber() 
{
  minRange = document.querySelector('.min-range').value;
  maxRange = document.querySelector('.max-range').value;
  var minN =parseInt(minRange);
  var maxN =parseInt(maxRange);
  randomNumber = Math.floor(Math.random() * (maxN - minN+1)) + minN;
}

function gameStartBtnState() 
{
  document.querySelector('.min-range').disabled = true;
  document.querySelector('.max-range').disabled = true;
  document.querySelector('.clear-button').disabled = false;
  clearButton.classList.remove('hide');
  document.querySelector('.reset-button').disabled = false;
  resetButton.classList.remove('hide');
  document.querySelector('.update-button').disabled = true;
  updateButton.classList.add('hide');
}

function gameLoop() 
{
  var playersGuess = parseInt(userGuess.value);
  gameStartBtnState();
  if (userGuess.value.length === 0) 
  {
    document.querySelector(".guess-number").innerHTML = '';
    outputMessage.innerHTML = "Please enter a guess!";
  }
  else if (isNaN(playersGuess)) 
  {
    document.querySelector(".guess-number").innerHTML = '';
    outputMessage.innerHTML = "That is not a number!";
  }
  else if (playersGuess > parseInt(maxRange))  
  {
    document.querySelector(".guess-number").innerHTML = '';
    outputMessage.innerHTML = "That is outside the maximum range!";
  }
  else if (playersGuess < parseInt(minRange))
  {
    document.querySelector(".guess-number").innerHTML = '';
    outputMessage.innerHTML = "That is outside the minimum range!";
  }
  else if (playersGuess > randomNumber) 
  {
    document.querySelector(".guess-number").innerHTML = `${playersGuess}`;
    outputMessage.innerHTML = "Sorry, that is too high";
  }
  else if (playersGuess < randomNumber) 
  {
    document.querySelector(".guess-number").innerHTML = `${playersGuess}`;
    outputMessage.innerHTML = "Sorry, that is too low";
  }
  else if (playersGuess === randomNumber) 
  {
    document.querySelector(".guess-number").innerHTML = `${playersGuess}`;
    outputMessage.innerHTML = "BOOM!";
    gameWinBtnState()
  }
  else 
  { 
    outputMessage.innerHTML = "UNEXPECTED ERROR";
  }
}

function gameWinBtnState() 
{
  document.querySelector('.update-button').disabled = false;
  updateButton.classList.remove('hide');
  document.querySelector('.min-range').disabled = false;
  document.querySelector('.max-range').disabled = false;
}

function gameResetBtnState() {
  document.querySelector('.reset-button').disabled = true;
  resetButton.classList.add('hide');
  document.querySelector('.update-button').disabled = false;
  updateButton.classList.remove('hide');
  document.querySelector('.clear-button').disabled = true;
  clearButton.classList.add('hide');
  document.querySelector('.min-range').disabled = false;
  document.querySelector('.max-range').disabled = false;
}

// clear
var clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', function() {
  document.querySelector('.user-guess').value = "";
  document.querySelector('.clear-button').disabled = true;
  clearButton.classList.add('hide');
});


// function to reset the game
var resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', function() {
  initializeGame();
  gameResetBtnState();
  generateRandomNumber();
});