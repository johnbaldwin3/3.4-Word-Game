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
var numOrRepeat = document.getElementById('num-or-repeat');
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
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "rgba(255, 255, 255, .7)";
ctx.fillRect(0, 0, myCanvas.height, myCanvas.width);
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
  drawGallows();
  ropeBeforeHanging();
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
    numOrRepeat.textContent = "That's a number fool!";
    $('#number-modal').modal('show');
    turnsLeft += 1;
  }
}

function guessDuplicated() {
  if ( guessedWord.includes(guess) && dispLet.innerHTML.includes(guess) && guess != Number) {
    turnsLeft++;
    numOrRepeat.textContent = "You already tried that one!";
    $('#number-modal').modal('show');
  }

}

function guessCheck() {
  guessValid();

  gameWordArray.forEach(function(letter, index)  {

    //if (guessedWord.includes(letter)) {
    //  alert("already tried that one");
    //}
    if (letter == guess) {
      guessedWord += letter;
      turnsLeft += 1;
      console.log('guess', guess);
      console.log('ltr4',letter);
      console.log('guessedWord', guessedWord);
      //console.log('s'+index);
    var spanSelect = document.getElementById('s'+index);
      //console.log(spanSelect);
      spanSelect.innerHTML = letter;
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
  turnLimiter();
  drawDude();
  //if (guess.length < 1) {
  //  alert("Not a valid guess, homie!");
//} else {
  // console.log("clicked", userGuess);
  // var

//}

})


function drawDude() {
  ///hangman dude....

  if (turnsLeft == '7') {
    drawHead();
  } else if (turnsLeft == '6') {
    drawBody();
  } else if (turnsLeft == '5') {
    drawRight();
  } else if (turnsLeft == '4') {
    drawLeft();
  } else if (turnsLeft == '3') {
    drawRightArm();
  } else if (turnsLeft == '2') {
    drawLeftArm();
  } else if (turnsLeft == '1'){
    drawHeadGameOver();
  }


}



function drawGallows(){


  //left side of gallows
  ctx.beginPath();
  ctx.moveTo(250, 300);
  ctx.lineTo(250, 30);
  ctx.stroke();

  //right side of gallows
  ctx.beginPath();
  ctx.moveTo(270, 300);
  ctx.lineTo(270, 15);
  ctx.stroke();

  //bottom of gallow pole
  ctx.beginPath();
  ctx.moveTo(250, 30);
  ctx.lineTo(100, 30);
  ctx.stroke();

  //top of gallow pole
  ctx.beginPath();
  ctx.moveTo(270, 15);
  ctx.lineTo(100, 15);
  ctx.stroke();

  //close of gallow
  ctx.beginPath();
  ctx.moveTo(100, 15);
  ctx.lineTo(100, 30);
  ctx.stroke();

  //rope loop
  ctx.beginPath();
  ctx.arc(150, 123, 18, 0, Math.PI * 2, true);
  ctx.stroke();



}

function ropeBeforeHanging() {

  //rope prior to hanging
  ctx.beginPath();
  ctx.moveTo(150,30);
  ctx.lineTo(150,107);
  ctx.stroke();
}

function drawHead() {

  //header of dude

  ctx.beginPath();
  ctx.arc(150, 76, 25, 0, Math.PI * 2, true);
  ctx.stroke();

  //straight face
  ctx.beginPath();
  ctx.moveTo(140, 90);
  ctx.lineTo(160, 90);
  ctx.stroke();

  //right eye
  ctx.beginPath();
  ctx.moveTo(140, 70);
  ctx.lineTo(147, 70);
  ctx.stroke();

  //left eye
  ctx.beginPath();
  ctx.moveTo(160, 70);
  ctx.lineTo(153, 70);
  ctx.stroke();



  //rope after hanging
  ctx.beginPath();
  ctx.moveTo(150,30);
  ctx.lineTo(150,50);
  ctx.stroke();


}

function drawBody() {
//body
  ctx.beginPath();
  ctx.moveTo(150,100);
  ctx.lineTo(150, 200);
  ctx.stroke();

}

function drawHeadGameOver() {

  //header of dude
  ctx.fillStyle = "#00F2F2";
  ctx.beginPath();
  ctx.arc(150, 76, 25, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();

  //straight face
  ctx.beginPath();
  ctx.moveTo(140, 90);
  ctx.lineTo(160, 90);
  ctx.stroke();

  //right eye
  ctx.beginPath();
  ctx.moveTo(140, 70);
  ctx.lineTo(147, 70);
  ctx.stroke();

  //left eye
  ctx.beginPath();
  ctx.moveTo(160, 70);
  ctx.lineTo(153, 70);
  ctx.stroke();



  //rope after hanging
  ctx.beginPath();
  ctx.moveTo(150,30);
  ctx.lineTo(150,50);
  ctx.stroke();


}

function drawBody() {
//body
  ctx.beginPath();
  ctx.moveTo(150,100);
  ctx.lineTo(150, 200);
  ctx.stroke();

}

function drawRight() {

  //right leg facing viewer
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.lineTo(125, 275);
  ctx.stroke();

}

function drawLeft() {

  //left leg facing viewer
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.lineTo(175, 275);
  ctx.stroke();

}

function drawLeftArm() {
  //left arm facing viewer
  ctx.beginPath();
  ctx.moveTo(150, 125);
  ctx.lineTo(175, 175);
  ctx.stroke();
}

function drawRightArm() {
  //right arm facing viewer
  ctx.beginPath();
  ctx.moveTo(150, 125);
  ctx.lineTo(125, 175);
  ctx.stroke();

}



}()); //end of immediately invoked function expression for entire page;
