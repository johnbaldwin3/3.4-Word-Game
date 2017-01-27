(function(){


// create a variable to hold the random word chosed from common-words

var correctGuesses = 0;

var gameWord;
var guessedWord = [];
var gameWordArray;
var gameInd;
var guess;
var gameSpaces = '';
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


// creates random index to pull from array
function gameWordIndex() {
  //math floor to set to integer and math random to pull it randomly
  //length of array +1 gives full length of array;
    gameInd = Math.floor(Math.random()*gameWordList.length + 1);
    //return index to pull word from array of words
  return gameInd;
};
//run function
gameWordIndex();
//the actual word = word pulled from array at random index
function createGameWord() {
gameWord = gameWordList[gameInd];
gameWordArray = gameWord.split('');
console.log(gameWordArray);
console.log(gameWord);
} //tested word

createGameWord();
// create a div span with unique id and  with blank space
//for game word length
(function(){

  for (var i = 0; i < gameWord.length; i++) {
      //set index to increment so it can be actionable later
    gameSpaces =  gameSpaces + '<span id="s'+i+'">'+'_'+"</span>" ;
  }
    //change innerHTML to the newly created html from for loop;
    gameWordDiv.innerHTML = gameSpaces;
    return gameSpaces;
}()); //automatically run game spaces when page loads.


//create function to limit turns
function turnLimiter() {
  turnsLeft = turnsLeft-1;
  if (!turnsLeft) {
    turnsRemain.textContent = "Game Over!!";
  } else {
    turnsRemain.innerHTML = turnsLeft;
  }
}

//function to check if input is valid
function guessValid() {
  guessCC = guess.charCodeAt(0);
  if (guessCC>64 && guessCC<91 || guessCC>96 && guessCC<123) {
    displayGuess();
  } else {
    alert("That's not a letter fool!");
    turnsLeft += 1;
  }
}

function guessCheck() {

  gameWordArray.forEach(function(letter, index)  {
    if (letter == guess) {
      guessedWord += letter;
      turnsLeft += 1;
      console.log('guessedWord', guessedWord);
      //console.log('s'+index);
      var spanSelect = document.getElementById('s'+index);
      //console.log(spanSelect);
      spanSelect.innerHTML = letter;

      if(gameWord.indexOf(guessedWord) != -1){
        correctGuesses += 1;

      }
      if (correctGuesses == gameWord.length) {
        $('#myModal').modal('show');  
      }
    }

  });

}


function displayGuess() {
  dispLet.textContent +=  guess;
  //console.log(dispLet.value);
}

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
