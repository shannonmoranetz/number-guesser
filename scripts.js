// input & output
var userGuess = document.querySelector('.user-guess');
var outputMessage = document.querySelector('.output-message');

// Initial random Number
var randomNumber = Math.floor(Math.random() * 100) + 1;

//set initial ranges on load 1 - 100
var minRange = document.querySelector('#min-range').value;
var maxRange = document.querySelector('#max-range').value;

//update ranges
var updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', function() {
  minRange = document.querySelector('#min-range').value;
  maxRange = document.querySelector('#max-range').value;
  var minN =parseInt(minRange);
  var maxN =parseInt(maxRange);
  randomNumber = Math.floor(Math.random() * (maxN - minN+1)) + minN;
   document.querySelector('.current-min-range').innerHTML = `${minRange}`;
  document.querySelector('.current-max-range').innerHTML = `${maxRange}`;
});

// the guess button
var guessButton = document.getElementById('guess-button');
guessButton.addEventListener('click', checkInput);

function checkInput() {
  document.getElementById('clear-button').disabled = false;
  document.getElementById('reset-button').disabled = false;
  var playersGuess = parseInt(userGuess.value);
  if (userGuess.value.length === 0) {
    outputMessage.innerHTML = "Please enter a guess!"
  }
  else if(isNaN(playersGuess)) {
    outputMessage.innerHTML = "That is not a number!"
  }
  else if (playersGuess > parseInt(maxRange) || playersGuess < parseInt(minRange)) {
    outputMessage.innerHTML = "That is outside the min/max range!"
  }
  else if (playersGuess > randomNumber) {
    document.querySelector(".guess-number").innerHTML = `${playersGuess}`;
    outputMessage.innerHTML = "Sorry, that is too high"
  }
  else if (playersGuess < randomNumber) {
    document.querySelector(".guess-number").innerHTML = `${playersGuess}`;
    outputMessage.innerHTML = "Sorry, that is too low"
  }
  else if (playersGuess = randomNumber) {
    document.querySelector(".guess-number").innerHTML = `${playersGuess}`;
    outputMessage.innerHTML = "BOOM!"
  }
  else { 
    outputMessage.innerHTML = "UNEXPECTED ERROR"
  }
}

// clear
var clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function() {
  document.querySelector('.user-guess').value = "";
  document.getElementById('clear-button').disabled = true;
  clearButton.classList.add('hide');

});


// function to reset the game
var resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function() {
  document.querySelector('.user-guess').value = "";
  document.querySelector('#min-range').value = 1;
  document.querySelector('#max-range').value = 100;
  randomNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById('reset-button').disabled = true;
});