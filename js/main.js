(function(){


// create a variable to hold the random word chosed from common-words

var correctGuesses = 0;

var gameWord;
var guessedWord = [];
var gameWordArray;
//var guessedWordArray;
var gameInd;
var guess;
var gameSpaces = '';
var winOrLoseDisplay = document.getElementById('win-or-lose');
var gamesWon = document.getElementById('wins');
var gameWon = 0;
var gameLost = 0;
var gamesLost = document.getElementById('losses');
var gameWordDiv = document.getElementById('game-word');
var turnsLeft = 8;
var turnsRemain = document.getElementById('num-left');
turnsRemain.innerHTML = turnsLeft;
var dispLet = document.getElementById('letters-played');
// create a new array to hold words with length of 3 or over
var gameWordList = commonWords.filter(function(word){
  if (word.length >= 3) {
    return word;
  }
});
// console.log(gameWordList); tested array

//userGuess element hooked to text input box
var userGuess = document.getElementById('textinput');
//user submit button hooked up to uSB var
var userSubmitButton = document.getElementById('sub-button');
var playAgainButton = document.getElementById('play-again');

// creates random index to pull from array
function gameWordIndex() {
  //math floor to set to integer and math random to pull it randomly
  //length of array +1 gives full length of array;
    gameInd = Math.floor(Math.random()*gameWordList.length + 1);
    //return index to pull word from array of words
  return gameInd;
};
//run function

//the actual word = word pulled from array at random index
function createGameWord() {
gameWord = gameWordList[gameInd];
gameWordArray = gameWord.split('');
console.log(gameWordArray);
console.log(gameWord);
} //tested word


// create a div span with unique id and  with blank space
//for game word length
 //automatically run game spaces when page loads.

function runGame(){
  gameWordIndex();
  createGameWord();
  for (var i = 0; i < gameWord.length; i++) {
      //set index to increment so it can be actionable later
    gameSpaces =  gameSpaces + '<span id="s'+i+'">'+'_'+"</span>" ;
    console.log('rungame',gameWord);
  }
    //change innerHTML to the newly created html from for loop;
    gameWordDiv.innerHTML = gameSpaces;
    return gameSpaces;
}
runGame();

//create function to limit turns and end game
function turnLimiter() {
  turnsLeft = turnsLeft-1;
  if (!turnsLeft) {
    turnsRemain.textContent = 8;
    winOrLoseDisplay.textContent = "You lost, he's been HUNG!";
    $('#myModal').modal('show');
    gameLost += 1;
    gamesLost.innerHTML = gameLost;

    clearGame();

  } else {
    turnsRemain.innerHTML = turnsLeft;
  }
}


function clearGame() {
  gameSpaces = "";
  guessedWord = "";
  dispLet.innerHTML = "";
  guess="";
  turnsLeft=8;
}
//function to check if input is valid
function guessValid() {

  guessCC = guess.charCodeAt(0);
  if (guessCC>64 && guessCC<91 || guessCC>96 && guessCC<123) {
    displayGuess();
  } else {
    $('#number-modal').modal('show');
    turnsLeft += 1;
  }
}

function guessCheck() {

  gameWordArray.forEach(function(letter, index)  {

    //if (guessedWord.includes(letter)) {
    //  alert("already tried that one");
    //}
    if (letter == guess) {
      if (dispLet.innerHTML.includes(guess)) {
        alert("You've already guessed that one!");
      }
      guessedWord += letter;
      turnsLeft += 1;
      console.log('letter',letter);
      console.log('guessedWord', guessedWord);
      //console.log('s'+index);
    var spanSelect = document.getElementById('s'+index);
      //console.log(spanSelect);
      spanSelect.innerHTML = letter;

      // if(gameWord.indexOf(guessedWord) != -1){
      //   correctGuesses += 1;
      //
      //       }
      if (guessedWord.length == gameWord.length) {
        $('#myModal').modal('show');
        gameWon += 1;
        gamesWon.innerHTML = gameWon;
      }
    //  if (correctGuesses == gameWord.length) {
    //    $('#myModal').modal('show');
    //  }
    }

  });

}


function displayGuess() {
  dispLet.textContent +=  guess;
  //console.log(dispLet.value);
}

playAgainButton.addEventListener('click', function(){
  clearGame();
  runGame();
  $('#myModal').modal('hide');

})
// userSubmitButton.addEventListener('keyup', function(event){
//   var key = event.keyCode;
//   console.log(key);
//   if (key === 13 ) {
//   guess = userGuess.value;
//   userGuess.value = '';
//   guessCheck();
//   guessValid();
//   turnLimiter();
// }
// })

userSubmitButton.addEventListener('click', function(){
  guess = userGuess.value;
  userGuess.value = '';
  guessCheck();
  guessValid();
  turnLimiter();
  //if (guess.length < 1) {
  //  alert("Not a valid guess, homie!");
//} else {
  // console.log("clicked", userGuess);
  // var

//}

})






}()); //end of immediately invoked function expression for entire page;
