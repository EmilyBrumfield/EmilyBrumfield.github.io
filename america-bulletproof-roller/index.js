// ServiceWorker is a progressive technology. Ignore unsupported browsers
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register('service-worker.js').then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}

var FULL_INSTRUCTIONS = "Dice roller for Rose Bailey's <i>America the Bulletproof</i>.<br /><b>Instructions:</b> TBD."

/*Variables that store the number of dice for each pool. Changed when the user clicks one of the dice in a pool.*/
var absurdDicePool = 0;
var grittyDicePool = 0;
var advantageDicePool = 0;
var dangerDicePool = 0;


/*AMERICA THE BULLETPROOF DICE ROLLER
Dice roller for America the Bulletproof, by Rose Bailey.
*/

function handleInstructionClick() {  //toggles instructions
  
  if (document.getElementById("instructions").innerHTML == "") {
    outputReplace("instructions", FULL_INSTRUCTIONS);
  }
  else {
    outputReplace("instructions", "");
  }  
}

function handleDiceClick(numDice, dieType) {
  var currentDie = ""; //specifies which die button to change
  var diceStyle = "DiceRoller__button--" + dieType + "--active";
  var currentPool = 0; //used to test whether the user is trying to clear the dice with the alternate method of clicking the first die when active

  if(numDice === 1){
    switch(dieType) {
      case "absurd":
        currentPool = absurdDicePool;
        break;
      case "gritty":
        currentPool = grittyDicePool;
        break;
      case "advantage":
        currentPool = advantageDicePool;
        break;
      case "danger":
        currentPool = dangerDicePool;
        break;
      default:
        alert("Error: Invalid die type.")
    }
    if(currentPool === 1){
      numDice = 0;
    }
  }

  //Changes which dice are highlighted as being part of the pool
  for(var i = 1; i <= numDice; i++) {
    currentDie = dieType + i;
    document.getElementById(currentDie).classList.add(diceStyle)
  }

    //Takes the rest of the dice out of the pool
  for(var i = numDice +1; i <= 5; i++) {
    currentDie = dieType + i;
    document.getElementById(currentDie).classList.remove(diceStyle)
  }

    //Updates the variable

  switch(dieType) {
    case "absurd":
      absurdDicePool = numDice;
      break;
    case "gritty":
      grittyDicePool = numDice;
      break;
    case "advantage":
      advantageDicePool = numDice;
      break;
    case "danger":
      dangerDicePool = numDice;
      break;
    default:
      alert("Error: Invalid die type.")
  }

};

//OUTPUT FUNCTIONS
//Outputs data stored in "content" to HTML element with id matching "target."

function outputReplace (target, content) {  //Replaces existing target content with new content
  document.getElementById(target).innerHTML = content;
}

function outputAdd (target, content) {  //Adds new content to existing target content
  document.getElementById(target).innerHTML += content;
}

function outputAddLine (target, content) {  //Adds new content to existing target content, in a new line
  document.getElementById(target).innerHTML += "<br \>" + content;
}

/*CUSTOM DICE
Each die type is an array of six faces.
Each face is an object with five qualities: Gritty, Absurd, Progress, Help, Condition
Each quality is rated according to the number of instances of the quality on the die face.
*/

/*rollDicePool: Rolls all the dice the user has selected, returns the total results.*/
function rollDicePool() {
  var finalResults = {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 0};
  var currentDie = {};

  if(grittyDicePool > 0 ){
    for (var i = 1; i <= grittyDicePool; i++){
      currentDie = rollDie(GrittyDie);
      finalResults.gritty += currentDie.gritty;
      finalResults.absurd += currentDie.absurd;
      finalResults.progress += currentDie.progress;
      finalResults.help += currentDie.help;
      finalResults.condition += currentDie.condition;
      //output die graphic for the roll result
    }
  }

  if(absurdDicePool > 0 ){
    for (var i = 1; i <= absurdDicePool; i++){
      currentDie = rollDie(AbsurdDie);
      finalResults.gritty += currentDie.gritty;
      finalResults.absurd += currentDie.absurd;
      finalResults.progress += currentDie.progress;
      finalResults.help += currentDie.help;
      finalResults.condition += currentDie.condition;
      //output die graphic for the roll result
    }
  }

  if(advantageDicePool > 0 ){
    for (var i = 1; i <= advantageDicePool; i++){
      currentDie = rollDie(AdvantageDie);
      finalResults.gritty += currentDie.gritty;
      finalResults.absurd += currentDie.absurd;
      finalResults.progress += currentDie.progress;
      finalResults.help += currentDie.help;
      finalResults.condition += currentDie.condition;
      //output die graphic for the roll result
    }
  }

  if(dangerDicePool > 0 ){
    for (var i = 1; i <= dangerDicePool; i++){
      currentDie = rollDie(DangerDie);
      finalResults.gritty += currentDie.gritty;
      finalResults.absurd += currentDie.absurd;
      finalResults.progress += currentDie.progress;
      finalResults.help += currentDie.help;
      finalResults.condition += currentDie.condition;
      //output die graphic for the roll result
    }
  }

  var textOutput = ("gritty " + finalResults.gritty + "; absurd " + finalResults.absurd + "; progress " + finalResults.progress + "; help " + finalResults.help + "; condition " + finalResults.condition);
  outputReplace("Results", textOutput)


}

/*rollDie: Takes an array as an argument, rolls a die, returns the results as an object. Use the custom dice variables as arguments.*/
function rollDie(dieVariable) {
  var dieRoll = Math.floor(Math.random() * 6); //roll 1d6
  var dieResults = dieVariable[dieRoll];
  return dieResults;
};

var AbsurdDie = [
  {gritty: 0, absurd: 1, progress: 1, help: 0, condition: 0}, //roll 1, index 0
  {gritty: 0, absurd: 1, progress: 1, help: 0, condition: 0}, //roll 2, index 1
  {gritty: 0, absurd: 1, progress: 1, help: 0, condition: 0}, //roll 3, index 2
  {gritty: 2, absurd: 0, progress: 0, help: 0, condition: 0}, //roll 4, index 3
  {gritty: 0, absurd: 0, progress: 1, help: 1, condition: 0}, //roll 5, index 4
  {gritty: 0, absurd: 0, progress: 0, help: 2, condition: 0}, //roll 6, index 5
];

var GrittyDie = [
  {gritty: 1, absurd: 0, progress: 1, help: 0, condition: 0}, //roll 1, index 0
  {gritty: 1, absurd: 0, progress: 1, help: 0, condition: 0}, //roll 2, index 1
  {gritty: 1, absurd: 0, progress: 1, help: 0, condition: 0}, //roll 3, index 2
  {gritty: 0, absurd: 2, progress: 0, help: 0, condition: 0}, //roll 4, index 3
  {gritty: 0, absurd: 0, progress: 1, help: 1, condition: 0}, //roll 5, index 4
  {gritty: 0, absurd: 0, progress: 0, help: 1, condition: 0}, //roll 6, index 5
];

var AdvantageDie = [
  {gritty: 0, absurd: 0, progress: 1, help: 0, condition: 0}, //roll 1, index 0
  {gritty: 0, absurd: 0, progress: 1, help: 0, condition: 0}, //roll 2, index 1
  {gritty: 0, absurd: 0, progress: 2, help: 0, condition: 0}, //roll 3, index 2
  {gritty: 0, absurd: 0, progress: 0, help: 1, condition: 0}, //roll 4, index 3
  {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 0}, //roll 5, index 4
  {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 0}, //roll 6, index 5
];

var DangerDie = [
  {gritty: 0, absurd: 0, progress: 1, help: 0, condition: 0}, //roll 1, index 0
  {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 1}, //roll 2, index 1
  {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 1}, //roll 3, index 2
  {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 1}, //roll 4, index 3
  {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 0}, //roll 5, index 4
  {gritty: 0, absurd: 0, progress: 0, help: 0, condition: 0}, //roll 6, index 5
]