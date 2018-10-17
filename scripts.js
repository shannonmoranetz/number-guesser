var clearButton = document.querySelector('.clear-button');
var guessButton = document.querySelector('.guess-button');
var maxRange = document.querySelector('.max-range').value;
var minRange = document.querySelector('.min-range').value;
var currentMaxRange = document.querySelector('.current-max-range');
var currentMinRange = document.querySelector('.current-min-range');
var errorMaxRange = document.querySelector('.error-max-range');
var errorMinRange = document.querySelector('.error-min-range');
// var outputMessage = document.querySelector('.output-message');//1 and 2
var outputMessagePlayerOne = document.querySelector('.output-message-player-one');
var outputMessagePlayerTwo = document.querySelector('.output-message-player-two');
var playerOneName = document.querySelector('.player-one-name');
var playerTwoName = document.querySelector('.player-two-name');
var resetButton = document.querySelector('.reset-button');
var updateButton = document.querySelector('.update-button');
// var userGuess = document.querySelector('.user-guess'); //1+2
var errorNameOne = document.querySelector('.error-name-one');
var errorNameTwo = document.querySelector('.error-name-two');
var playerOneGuess = document.querySelector('.player-one-guess');
var playerTwoGuess = document.querySelector('.player-two-guess');
var guessPlayerOne = document.querySelector('.guess-player-one');//latest score
var guessPlayerTwo = document.querySelector('.guess-player-two');
var challengerOneName = document.querySelector('.challenger-one-name');//latest score
var challengerTwoName = document.querySelector('.challenger-two-name');

initializeGame();
generateRandomNumber();

clearButton.addEventListener('click', function() {
  document.querySelector('.player-one-guess').value = '';
  document.querySelector('.player-two-guess').value = '';
  document.querySelector('.clear-button').disabled = true;
  clearButton.classList.add('hide');
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
  initializeGame();
  gameResetBtnState();
  generateRandomNumber();
});

updateButton.addEventListener('click', function() {
  checkRangeNumbers();
  if (checkRangeNumbers() === true) {
    generateRandomNumber();
    document.querySelector('.current-min-range').innerHTML = `${minRange}`;
    document.querySelector('.current-max-range').innerHTML = `${maxRange}`;
  }
});

function checkRangeNumbers() 
{
  var errorMin = document.querySelector('.error-min');
  var errorMax = document.querySelector('.error-max');
  errorMin.classList.add('hide-error');
  errorMax.classList.add('hide-error');
  var minRange = document.querySelector('.min-range').value;
  var maxRange = document.querySelector('.max-range').value;
  var minRangeInt = parseInt(minRange);
  var maxRangeInt = parseInt(maxRange);


  if ((isNaN(minRange) || minRange === "") && (isNaN(maxRange) || maxRange === ""))
  {
    errorMin.classList.remove('hide-error');
    errorMax.classList.remove('hide-error');
  }
  else if (isNaN(maxRange) || maxRange === "")
  { 
    errorMax.classList.remove('hide-error');
  } 
  else if (isNaN(minRange) || minRange === "")
  { 
    errorMin.classList.remove('hide-error');
  } 
  else if (minRangeInt >= maxRangeInt)
  {
    outputMessagePlayerOne.innerHTML = "Your minimum number is greater than or equal to than your maximum number!";
    outputMessagePlayerTwo.innerHTML = "Your minimum number is greater than or equal to than your maximum number!";
  }
  else if (minRangeInt < maxRangeInt) 
  {
    outputMessagePlayerOne.innerHTML = "";
    outputMessagePlayerTwo.innerHTML = "";
    return true;
  }
  else 
  { 
    outputMessagePlayerOne.innerHTML = "UNEXPECTED ERROR";
    outputMessagePlayerTwo.innerHTML = "UNEXPECTED ERROR";
  }
};


var playerOneGuesses = [1];
var playerTwoGuesses = [1];




function gameLoop() {

 gameStartBtnState();
 // console.log('p1t', playerOneTurn);
 // console.log('p2t', playerTwoTurn);


var playerOneGuessInt = parseInt(playerOneGuess.value);
var playerTwoGuessInt = parseInt(playerTwoGuess.value);




 if (playerOneGuessInt === '') 
 {
  outputMessagePlayerOne.innerHTML = "Please enter a guess!";
}
else if (isNaN(playerOneGuessInt)) 
{
  outputMessagePlayerOne.innerHTML = "That is not a number!";  
}
else if (parseInt(playerOneGuessInt) > parseInt(maxRange))  
{ 
  outputMessagePlayerOne.innerHTML = "That is outside the maximum range!";
}
else if (parseInt(playerOneGuessInt) < parseInt(minRange))
{ 
  outputMessagePlayerOne.innerHTML = "That is outside the minimum range!";  
}
else if (parseInt(playerOneGuessInt) > randomNumber) 
{ 
  outputMessagePlayerOne.innerHTML = "That's too high";
  playerOneGuesses.push(playerOneGuessInt);
  document.querySelector('.guess-player-one').innerHTML = `${playerOneGuessInt}`;
 
}
else if (parseInt(playerOneGuessInt) < randomNumber) 
{  
  outputMessagePlayerOne.innerHTML = "That's too low";
  playerOneGuesses.push(playerOneGuessInt);
  document.querySelector('.guess-player-one').innerHTML = `${playerOneGuessInt}`;
 
}
else if (parseInt(playerOneGuessInt) === randomNumber) 
{
  outputMessagePlayerOne.innerHTML = "BOOM!";
  document.querySelector('.guess-player-one').innerHTML = `${playerOneGuessInt}`;
  var winner = playerOneName;
    console.log(playerOneGuesses);
  console.log(playerOneGuesses.length);
  var totalGuesses = playerOneGuesses.length;
  console.log(totalGuesses);
  gameWon(winner, totalGuesses);
    // winDifficultyIncrease();
    // gameWinBtnState()
  }
  else 
  { 
    outputMessagePlayerTwo.innerHTML = "UNEXPECTED ERROR";
  }

 if (playerTwoGuessInt === '') 
{
  outputMessagePlayerTwo.innerHTML = "Please enter a guess!";
}
else if (isNaN(playerTwoGuessInt)) 
{
  outputMessagePlayerTwo.innerHTML = "That is not a number!";  
}
else if (parseInt(playerTwoGuessInt) > parseInt(maxRange))  
{ 
  outputMessagePlayerTwo.innerHTML = "That is outside the maximum range!";
}
else if (parseInt(playerTwoGuessInt) < parseInt(minRange))
{ 
  outputMessagePlayerTwo.innerHTML = "That is outside the minimum range!";  
}
else if (parseInt(playerTwoGuessInt) > randomNumber) 
{ 
  outputMessagePlayerTwo.innerHTML = "That's too high";
  playerTwoGuesses.push(playerTwoGuessInt);
  document.querySelector('.guess-player-two').innerHTML = `${playerTwoGuessInt}`;
}
else if (parseInt(playerTwoGuessInt) < randomNumber) 
{  
  outputMessagePlayerTwo.innerHTML = "That's too low";
  playerTwoGuesses.push(playerTwoGuessInt);
  document.querySelector('.guess-player-two').innerHTML = `${playerTwoGuessInt}`;
}
else if (parseInt(playerTwoGuessInt) === randomNumber) 
{
  outputMessagePlayerTwo.innerHTML = "BOOM!";
  document.querySelector('.guess-player-two').innerHTML = `${playerTwoGuessInt}`;
  var winner = playerTwoName;
  console.log(playerTwoGuesses);
  console.log(playerTwoGuesses.length);
  var totalGuesses = playerTwoGuesses.length;
   console.log(totalGuesses);
  gameWon(winner, totalGuesses);
    // winDifficultyIncrease();
    // gameWinBtnState()
  }
  else 
  { 
    outputMessagePlayerTwo.innerHTML = "UNEXPECTED ERROR";
  } 
};


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

function gameWinBtnState() 
{
  document.querySelector('.update-button').disabled = false;
  updateButton.classList.remove('hide');
  document.querySelector('.min-range').disabled = false;
  document.querySelector('.max-range').disabled = false;
}

function generateRandomNumber() 
{
  minRange = document.querySelector('.min-range').value;
  maxRange = document.querySelector('.max-range').value;
  var minRangeInt =parseInt(minRange);
  var maxRangeInt =parseInt(maxRange);
  randomNumber = Math.floor(Math.random() * (maxRangeInt - minRangeInt+1)) + minRangeInt;
}

function initializeGame() 
{
  document.querySelector('.player-one-guess').value = '';
  document.querySelector('.player-two-guess').value = '';
  document.querySelector('.player-one-name').value = '';
  document.querySelector('.player-two-name').value = '';
  document.querySelector('.min-range').value = 1;
  document.querySelector('.max-range').value = 100;
  document.querySelector('.current-min-range').innerHTML = '1';
  document.querySelector('.current-max-range').innerHTML = '100';
}

function updateNames() 
{
  playerOneName = document.querySelector('.player-one-name').value;
  playerTwoName = document.querySelector('.player-two-name').value;
  if (playerOneName === '') {
    var errorNameOne = document.querySelector('.error-name-one');
    errorNameOne.classList.remove('hide-error');
  } else {
   document.querySelector('.challenger-one-name').innerHTML = playerOneName;
 }
 if (playerTwoName === '') {
  var errorNameTwo = document.querySelector('.error-name-two');
  errorNameTwo.classList.remove('hide-error');
} else {
 document.querySelector('.challenger-two-name').innerHTML = playerTwoName;
}
if ((playerOneName === '') || (playerTwoName === '')) {
  return false;
}

}
var scoreCardContainerDiv = document.querySelector('.score-card-container');

function gameWon(winner, totalGuesses)
{
  createDiv(winner, totalGuesses);

  // createVsDiv();
  // createChOneVsDiv();
  // createVsSeparatorDiv();
  // createChTwoVsDiv();


  // createWinnerDiv();
  // createWinnerNameDiv();
  // createStaticWinnerDiv();

  // createStatsDiv();
}
// MAIN

function createDiv(winner, totalGuesses) {
    var newDiv = document.createElement('div');
    


    newDiv.className = 'score-card';
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
      <div class="score-card-timer">MINUTES</div>
      <button class="delete-card">Delete</button>
    </div>
    `
    // var deleteBtn = document.querySelector('delete-card');
    scoreCardContainerDiv.appendChild(newDiv);
    // var deleteButton = document.querySelector('.delete-card');
  }

document.querySelector('.score-card-container').addEventListener('click', function(event) {
    var del = document.querySelector('.score-card');
    if (event.target.tagName.toLowerCase() === 'button') {
        del.remove();
    }
});



 // console.log(event.target);
  // console.log(this);
    //   var scoreCard = document.querySelector('.score-card-stats');
    // var deleteButton = document.querySelector('.delete-card');
    // deleteButton.scoreCard.removeChild(deleteButton);






// deleteButton.addEventListener('click', function() {
  // deleteButton();
// });

// function deleteButton() {
//     var scoreCard = document.querySelector('.score-card');
//     var deleteButton = document.querySelector('.delete-card');
//     deleteButton.scoreCard.removeChild(scoreCard);
//     };

// gameWon();








// 1. create a unique identifier (date method), and store in var 
// 2. create event listener
// 3. function to get id from target (button)


// REAL INSTRUCTIONS
// 1. event listener --> check if event target has delete-card
// 2. if yes: delete grandparent 








// TOP
// var nextCard =1;
// function createVsDiv() {
//   nextCard = nextCard +1;;
//     var scoreCardDiv = document.querySelector('.score-card');
//     var newDiv = document.createElement('div');
//     // newDiv.innerHTML = ``
//     newDiv.className = `score-card-vs score-card-vs${nextCard}`;
    
//     scoreCardDiv.appendChild(newDiv);
//     }

// function createChOneVsDiv() {
//     var scoreCardChOneDiv = document.querySelector('.score-card-vs');
//     var newDiv = document.createElement('div');
//     newDiv.className = 'score-card-challenger';
//     newDiv.textContent = "Challenger 1";
//     scoreCardChOneDiv.appendChild(newDiv);
//     }

// function createVsSeparatorDiv() {
//     var scoreCardVsSeparatorDiv = document.querySelector('.score-card-vs');
//     var newDiv = document.createElement('div');
//     newDiv.className = 'score-card-static-vs';
//     newDiv.textContent = "vs";
//     scoreCardVsSeparatorDiv.appendChild(newDiv);
//     }

//     function createChTwoVsDiv() {
//     var scoreCardChTwoDiv = document.querySelector('.score-card-vs');
//     var newDiv = document.createElement('div');
//     newDiv.className = 'score-card-challenger';
//     newDiv.textContent = "Challenger 2";
//     scoreCardChTwoDiv.appendChild(newDiv);
//     }

// // MIDDLE

// function createWinnerDiv() {
//   var scoreCardDiv = document.querySelector('.score-card');
//     var newDiv = document.createElement('div');
//     newDiv.className = 'score-card-winner';
    
//     scoreCardDiv.appendChild(newDiv);
//     }

// function createWinnerNameDiv() {
//     var scoreCardWinnerDiv = document.querySelector('.score-card-winner');
//     var newDiv = document.createElement('div');
//     newDiv.className = 'score-card-winner-name';
//     newDiv.textContent = "Challenger 1 Name";
//     scoreCardWinnerDiv.appendChild(newDiv);
//     }

//     function createStaticWinnerDiv() {
//     var scoreCardWinnerDiv = document.querySelector('.score-card-winner');
//     var newDiv = document.createElement('div');
//     newDiv.className = 'score-card-static-winner';
//     newDiv.textContent = "WINNER";
//     scoreCardWinnerDiv.appendChild(newDiv);
//     }
// // BOTTOM
//     function createStatsDiv() {
//       var scoreCardDiv = document.querySelector('.score-card');
//     var newDiv = document.createElement('div');
//     newDiv.className = 'score-card-stats';
    
//     scoreCardDiv.appendChild(newDiv);
//     }


// function winDifficultyIncrease() 
// {
//   minRange = document.querySelector('.min-range').value;
//   maxRange = document.querySelector('.max-range').value;
//   var newMinRange = minRange - 10; 
//   var newMaxRange = parseInt(maxRange) + 10; 
//   document.querySelector('.current-min-range').innerHTML = newMinRange;
//   document.querySelector('.current-max-range').innerHTML = newMaxRange;
//   document.querySelector('.min-range').value = newMinRange;
//   document.querySelector('.max-range').value = newMaxRange;
// }
