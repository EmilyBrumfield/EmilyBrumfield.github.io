/*SHADOWRUN ANARCHY DICE ROLLER
Progressiva web app that rolls Shadowrun Anarchy dice without hassle or unnecessary clicks.

Shadowrun Anarchy is a rules-light tabletop role-playing game. It often involves rolling large handfuls of dice and
tallying results, so I made this little app to speed things up when gaming at the computer.

When a user clicks a button, the app rolls the specified number of dice and tallies the results for each die side.
Every die that landed on 5 or 6 is a success.
Every die that landed on 4 is also a success if the player is spending Edge (a resource in the game.)

The glitch die doesn't contribute to successes; it's a six-sided die that causes a Glitch result on a 1, and an Exploit on 5-6.
It isn't used for all rolls, but I found it was much more user-friendly to just have it always roll with any new set than have a
separate setting for whether or not the player wants to roll it with any given roll.
*/

var diceTally = 0; //will eventually use closures for this

function handleRollClick(numDice) {
    diceTally = rollDice(numDice);
    outputReplace("success", "Successes: " + diceTally[7]);
    outputReplace("successEdge", "Successes with Edge: " + diceTally[8]);
    outputReplace("glitch", "Glitch Die Result: " + diceTally[9]);
}

    function rollDice(numDice) {

        var currentRoll = 0;
        var glitchRoll = 0;
        var tempResultsStorage = [0, 0, 0, 0, 0, 0, 0, 0, 0, ""]; //stores results for 1, 2, 3, 4, 5, and 6, respectively, ignoring index 0
        //index 7 stores successes and index 8 stores successes with edge expended before the roll
        //index 9 stores the results of the glitch die

        if (numDice < 1 || numDice > 50) {
          numDice = 1;
        } //prevents bad inputs; number of dice must be between 1 and 50, otherwise becomes 1

        glitchRoll = Math.floor(Math.random() * 6) + 1;
        switch (glitchRoll){
          case 1:
            tempResultsStorage[9] = glitchRoll.toString() + " (Glitch)";
            break;

          case 5:
          case 6:
          tempResultsStorage[9] = glitchRoll.toString() + " (Exploit)";
            break;

          default:
            tempResultsStorage[9] = glitchRoll.toString() + " (---)";
        }
    
    
        for (var i = 1; i <= numDice; i++){
            //roll dice here, tally results, do some other stuff
            currentRoll = Math.floor(Math.random() * 6) + 1;
            tempResultsStorage[currentRoll] += 1;
          }

        tempResultsStorage[7] = tempResultsStorage[5] + tempResultsStorage[6];
        tempResultsStorage[8] = tempResultsStorage[4] + tempResultsStorage[5] + tempResultsStorage[6];

        return tempResultsStorage;     
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