(function(){

// create a variable to hold the random word chosed from common-words

var gameWord;
var gameInd;

// creates random index to pull from array
function gameWordIndex() {

gameInd = Math.floor(Math.random()*commonWords.length + 1);


  return gameInd;
};



gameWordIndex();

gameWord = commonWords[gameInd];

console.log(gameWord);


var gameSpaces = '';

var gameWordDiv = document.getElementById('game-word');

(function(){

  for (var i = 0; i < gameWord.length; i++) {

    gameSpaces =  gameSpaces + '_ ' ;

  }

    gameWordDiv.innerHTML = gameSpaces;

    return gameSpaces;


}())







}());
