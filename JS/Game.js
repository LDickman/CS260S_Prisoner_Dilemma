/* Game.js
* Game.js manages and game logic and visuals, and is used by
* chooseStrategy.html and game.html.
*/

/* Opponent Strategy Imports */
import { OpponentTitForTatDefectFirst } from './Player_vs_Strategy_Opponents/OpponentTitForTatDefectFirst.js'
import { OpponentAlwaysSplit } from "./Player_vs_Strategy_Opponents/OpponentAlwaysSplits.js"
import { OpponentAlwaysSteal } from "./Player_vs_Strategy_Opponents/OpponentAlwaysSteals.js"
import { OpponentRandom } from "./Player_vs_Strategy_Opponents/OpponentRandom.js"
import { OpponentTitForTatCoopFirst } from "./Player_vs_Strategy_Opponents/OpponentTitForTatCoopFirst.js"
import { OpponentGrim } from "./Player_vs_Strategy_Opponents/OpponentGrim.js"
import { OpponentPavlov } from "./Player_vs_Strategy_Opponents/OpponentPavlov.js"
import { OpponentTitForTwoTats} from "./Player_vs_Strategy_Opponents/OpponentTitForTwoTats.js"
import {OpponentThresher} from "./Player_vs_Strategy_Opponents/OpponentThresher.js"
import { OpponentImperfectTitForTat} from "./Player_vs_Strategy_Opponents/OpponentImperfectTitForTat.js"
/* Opponent Strategy Imports */

/* Field Declarations and Initializations*/
export let rounds = Math.floor(Math.random() * (20 - 10 + 1) + 10)
console.log("Rounds: " + rounds)
export let currentRound = 1
export let playerChoices = []
let strategyName = document.getElementById("strategyName")
let strategyDes = document.getElementById("strategyDesc")
let strategyDetails = document.getElementById("strategyInfo")
let playerPoints = 0

let alwaysSplit = new OpponentAlwaysSplit()
let alwaysSteal = new OpponentAlwaysSteal()
let randomChoice = new OpponentRandom()
let titForTatCoop = new OpponentTitForTatCoopFirst()
let titForTatDefect = new OpponentTitForTatDefectFirst()
let grim = new OpponentGrim()
let pavlov = new OpponentPavlov()
let titForTwoTats = new OpponentTitForTwoTats()
let thresher = new OpponentThresher()
let impTitForTat = new OpponentImperfectTitForTat()
export let possibleOpponents = [alwaysSplit, alwaysSteal, randomChoice, titForTatCoop, titForTatDefect,
                                grim, pavlov, titForTwoTats, thresher, impTitForTat]
let opponent
let opponentType = ""
export let opponentChoices = []
let opponentPoints = 0
/* Field Declarations and Initializations */

/* In-Game Guide/How-to-Play Management */
document.getElementById("helpButton").addEventListener("click", displayGuide)
function displayGuide() {
    let popup = window.open('guide.html', 'popup', 'width=500,height=500,scrollbars=yes,resizeable=yes')
    popup.window.onload = function() {
        popup.document.getElementById("fromGuideToMenu").style.display='none'
    }
}
/* In-Game Guide/How-to-Play Management */

/* Button Management */
const conSplitButton = document.getElementById("splitButton")
conSplitButton.addEventListener("click", playerChoiceSplit)

const conStealButton = document.getElementById("stealButton")
conStealButton.addEventListener("click", playerChoiceSteal)

const replayButton = document.getElementById("playAgainButton")

const toGameScreenBody = document.getElementById("gameScreen")
const toChooseGameScreen = document.getElementById("chooseGameScreen")

replayButton.addEventListener("click", function() {
    replayButton.style.display = 'none'
    resetGame()
    console.clear()
    if (toChooseGameScreen != null) {
        document.getElementById("playerChoiceHistoryTable").style.display = 'none'
        document.getElementById("scoreTable").style.display = 'none'
        document.getElementById("pointTable").style.display = 'none'
        deactivatePlayerChoiceButtons()
        activatePlayerSelectionButtons()
    } else {
        createGame()
    }
});
/* Button Management */

/* HTML If-Statement
* This if-statement is used to check which html file (either Game or chooseStrategy)
* is accessing the javascript, so as to display the appropriate elements.
*/
let createGameButton
let selectStrategyButton

if (toChooseGameScreen != null) {
    createGameButton = document.getElementById("createGameButton")
    createGameButton.addEventListener("click", createGame)

    selectStrategyButton = document.getElementById("strategySelect")
    let ulList = document.getElementById("strategyList")
    selectStrategyButton.addEventListener("click", selectionButton)

    window.onclick = function (event) {
        if (!event.target.matches('.dropButton')) {
            let dropdowns = document.getElementsByClassName("dropdown-content")
            for (let i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i]
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show')
                }
            }
        }
        clickOnDropDownMenu(ulList, selectStrategyButton)
    }

} 
if (toGameScreenBody != null) {
    window.addEventListener("load", createGame)
}
/* HTML If-Statement*/

/* selectionButton():
* manages what the dropdown menu displays when an option is selected
*/
function selectionButton() {
    document.getElementById('strategyDropdown').classList.toggle("show")
}

/* clickOnDropDownMenu():
* displays opponent information for selected option
*/
function clickOnDropDownMenu(ul, button) {
    let items = ul.getElementsByTagName('li')
    ul.addEventListener("click", function (e) {
        for (let i = 0; i < items.length; i++) {
            if (e.target === items[i]) {
                opponentType = items[i].textContent
                console.log("opponentType: " + opponentType)
                button.textContent = items[i].textContent + " ▼"
            }
        }
    })
    displayOpponentInfo()
}

/* setOpponent():
* sets the games opponent using the chooseStrategy.html dropdown menu
*/
function setOpponent() {
    switch (opponentType) {
        case "Always Split":
            opponent = possibleOpponents[0]
            break;
        case "Always Steal":
            opponent = possibleOpponents[1]
            break;
        case "Random":
            opponent = possibleOpponents[2]
            break;
        case "Tit for Tat Defect":
            opponent = possibleOpponents[4]
            break;
        case "Tit for Tat Coop":
            opponent = possibleOpponents[3]
            break;
        case "Grim":
            opponent = possibleOpponents[5]
            break;
        case "Pavlov":
            opponent = possibleOpponents[6]
            break;
        case "Tit For Two Tats":
            opponent = possibleOpponents[7]
            break;
        case "Threshold":
            opponent = possibleOpponents[8]
            break;
        case "Imperfect Tit for Tat":
            opponent = possibleOpponents[9]
            break;
        case "No Preference":
            pickOpponentRandomly()
            break;
        case "":
            pickOpponentRandomly()
            break;
    }
}

/* createGame():
* sets up game opponent strategy using the random or choose methods and
* begins the game loop by calling playGame()
*/
function createGame() {
    if (selectStrategyButton == null) {
        pickOpponentRandomly()
        playGame()
    } else {
        deactivatePlayerSelectionButtons()
        setOpponent()
        playGame()
    }
}

/* deactivatePlayerSelectionButtons():
* disables display for chooseStrategy.html elements for choosing an opponent
*/
function deactivatePlayerSelectionButtons(){
    document.getElementById("createGameButton").style.display = 'none'
    document.getElementById("chooseStrategy").style.display = 'none'
    document.getElementById("strategySelect").style.display = 'none'
    document.getElementById("buttonInfo").style.display = 'none'
    document.getElementById("opponentStrategyInfo").style.display = 'none'
    strategyDetails.style.display = 'none'
    strategyName.style.display = 'none'
    strategyDes.style.display = 'none'
}

/* activatePlayerSelectionButtons():
* enables display for chooseStrategy.html elements for choosing and opponent
*/
function activatePlayerSelectionButtons(){
    document.getElementById("createGameButton").style.display = 'block';
    document.getElementById("chooseStrategy").style.display = 'block';
    document.getElementById("strategySelect").style.display = 'block';
    document.getElementById("strategySelect").textContent = "Choose Strategy ▼";
    opponentType = "";
    document.getElementById("opponentStrategyInfo").style.display = 'block';
    document.getElementById("buttonInfo").style.display = 'block';
    strategyDetails.style.display = 'block';
    strategyName.style.display = 'block';
    strategyDes.style.display = 'block';
}

/* pickOpponentRandomly():
* picks opponent strategy for non-created games and created games with no selection
*/
function pickOpponentRandomly() {
    let random = Math.floor(Math.random() * possibleOpponents.length);
    opponent = possibleOpponents[random];
}

/* playGame():
* this method contains the entire gameplay loop of updating backend game variables
* and HTML elements
*/
function playGame() {
    updatePointTable();
    activatePlayerChoiceButtons();
    populateChoiceHistoryTable();
    givePoints();
    if (currentRound <= rounds) {
        printRound();
        console.log("Opponent Points: " + opponentPoints);
    } else {
        printSummary();
        replayButton.style.display = 'inline';
        deactivatePlayerChoiceButtons()
    }
}

/* activePlayerChoiceButtons():
* enables player controls for split/steal
*/
function activatePlayerChoiceButtons() {
    document.getElementById("playerQuestion").style.display = 'block';
    conSplitButton.style.display = 'inline-block';
    conStealButton.style.display = 'inline-block';
}

/* populateChoiceHistoryTable():
* updates the html table to display choices as player & opponent
* move through game rounds
*/
function populateChoiceHistoryTable() {
    document.getElementById("playerChoiceHistoryTable").style.display = 'block';
    document.getElementById("scoreTable").style.display = 'block';
    if (currentRound !== 1) {
        for (let i = 0; i < playerChoices.length; i++) {
            if (i === playerChoices.length - 1) {
                let playerRow = document.getElementById("playerChoicesRow");
                let opponentRow = document.getElementById("OpponentChoicesRow");
                let roundsRow = document.getElementById("roundRow");
                roundsRow.insertCell(-1).innerHTML = String(currentRound - 1);
                playerRow.insertCell(-1).innerHTML = playerChoices[i];
                opponentRow.insertCell(-1).innerHTML = opponentChoices[i];
                updateChangeColorOfCell("playerChoicesRow",i);
                updateChangeColorOfCell("OpponentChoicesRow", i);
            }
        }
    }
}

/* updateChangeColorOfCell():
* updates the background color of cells in the choice history table
* depending on text content
*/
function updateChangeColorOfCell(name, index) {
    let tableCell = document.getElementById(name).getElementsByTagName("td");
    console.log(name +" " + tableCell[index]);
    if (tableCell[index].textContent === "Steal") {
        tableCell[index].style.backgroundColor = "red";
    }
    if (tableCell[index].textContent === "Split") {
        tableCell[index].style.backgroundColor = "green";
    }
}

/* givePoints():
* distributes points to player an opponent as they move through
* the game rounds
*/
function givePoints() {
    let pChoice = playerChoices[playerChoices.length - 1];
    let oChoice = opponentChoices[opponentChoices.length - 1];
    if (currentRound > 1) {
        if (pChoice === "Split" && oChoice === "Split") {
            playerPoints += 250;
            opponentPoints += 250;
        } else if (pChoice === "Steal" && oChoice === "Split") {
            playerPoints += 500;
            opponentPoints -= 50;
        } else if (pChoice === "Split" && oChoice === "Steal") {
            playerPoints -= 50;
            opponentPoints += 500;
        }
    }
}

/* updatePointTable():
* updates the point breakdown chart in the game screen to
* correspond to previous round choices
*/
function updatePointTable() {
    let bothSplit = document.getElementById("bothSplitCell");
    bothSplit.style.background = "none"
    let bothSteal = document.getElementById("bothStealCell");
    bothSteal.style.background = "none"
    let pSplitOppSteal = document.getElementById("pSplit-oppStealCell");
    pSplitOppSteal.style.background = "none"
    let pStealOppSplit = document.getElementById("pSteal-oppSplitCell");
    pStealOppSplit.style.background = "none"
    if (currentRound > 1) {
        let pChoice = playerChoices[currentRound - 2]
        let oChoice = opponentChoices[currentRound - 2]
        if (pChoice === "Split" && oChoice === "Split") {
            bothSplit.style.background = "yellow"
            bothSteal.style.background = "none"
            pSplitOppSteal.style.background = "none"
            pStealOppSplit.style.background = "none"
        } else if (pChoice === "Split" && oChoice ==="Steal") {
            bothSplit.style.background = "none"
            bothSteal.style.background = "none"
            pSplitOppSteal.style.background = "yellow"
            pStealOppSplit.style.background = "none"
        } else if (pChoice === "Steal" && oChoice === "Split") {
            bothSplit.style.background = "none"
            bothSteal.style.background = "none"
            pSplitOppSteal.style.background = "none"
            pStealOppSplit.style.background = "yellow"
        } else if (pChoice === "Steal" && oChoice === "Steal") {
            bothSplit.style.background = "none"
            bothSteal.style.background = "yellow"
            pSplitOppSteal.style.background = "none"
            pStealOppSplit.style.background = "none"
        }
    }
}

/* displayOpponentInfo():
* provides information for strategy chosen from the selection
* dropdown menu
*/
function displayOpponentInfo() {
    switch (opponentType) {
        case "Always Split":
            strategyName.textContent = possibleOpponents[0].name;
            strategyDes.textContent = possibleOpponents[0].desc; 
            break;
        case "Always Steal":
            strategyName.textContent = possibleOpponents[1].name;
            strategyDes.textContent = possibleOpponents[1].desc; 
            break;
        case "Random":
            strategyName.textContent = possibleOpponents[2].name;
            strategyDes.textContent = possibleOpponents[2].desc; 
            break;
        case "Tit for Tat Defect":
            strategyName.textContent = possibleOpponents[4].name;
            strategyDes.textContent = possibleOpponents[4].desc; 
            break;
        case "Tit for Tat Coop":
            strategyName.textContent = possibleOpponents[3].name;
            strategyDes.textContent = possibleOpponents[3].desc; 
            break;
        case "Grim":
            strategyName.textContent = possibleOpponents[5].name;
            strategyDes.textContent = possibleOpponents[5].desc; 
            break;
        case "Pavlov":
            strategyName.textContent = possibleOpponents[6].name;
            strategyDes.textContent = possibleOpponents[6].desc; 
            break;
        case "Tit For Two Tats":
            strategyName.textContent = possibleOpponents[7].name;
            strategyDes.textContent = possibleOpponents[7].desc; 
            break;
        case "Threshold":
            strategyName.textContent = possibleOpponents[8].name;
            strategyDes.textContent = possibleOpponents[8].desc;
            break;
        case "Imperfect Tit for Tat":
            strategyName.textContent = possibleOpponents[9].name;
            strategyDes.textContent = possibleOpponents[9].desc;
            break;
        case "No Preference":
            strategyName.textContent = "No Preference";
            strategyDes.textContent = "The opponent will be randomly selected for you";
            break;
        case "":
            strategyName.textContent = "No Preference";
            strategyDes.textContent = "The opponent will be randomly selected for you";
            break;
    }
}

/* printRound():
* updates HTML visuals to correspond to the current round
* calls helper methods to update necessary elements, such as updatePlayerPoints()
*/
function printRound() {
    document.getElementById("pointTable").style.display = 'block';
    document.getElementById("roundNumDiv").style.display = 'block';
    updatePlayerPoints();
    document.getElementById("roundNumDisplay").style.display = 'inline-block';
    document.getElementById("roundNum").innerHTML = currentRound;
    console.log("Opponent AI: " + opponent.name);
}

/* printSummary():
* Provides and shows details for end-of-game, such as opponent details
* that were hidden from the player
* also hides elements of the game meant for playing
*/
function printSummary() {
    // show end of game header
    document.getElementById("endOfGame").style.display = 'block';
    if (playerPoints > opponentPoints) {
        document.getElementById("playerWin").style.display = 'block';
        document.getElementById("playerLose").style.display = 'none';
        document.getElementById("playerTie").style.display = 'none';
    } else if (playerPoints < opponentPoints) {
        document.getElementById("playerWin").style.display = 'none';
        document.getElementById("playerLose").style.display = 'block';
        document.getElementById("playerTie").style.display = 'none';
    } else {
        document.getElementById("playerWin").style.display = 'none';
        document.getElementById("playerLose").style.display = 'none';
        document.getElementById("playerTie").style.display = 'block';
    }
    // show & update opponent details
    document.getElementById("playerPointsPara").style.display = 'block';
    document.getElementById("opponentDetails").style.display = 'block';
    document.getElementById("playerPoints").innerHTML = playerPoints;
    document.getElementById("opponentPoints").innerHTML = opponentPoints;
    document.getElementById("opponentStrategy").innerHTML = opponent.name + "<br/>" + opponent.desc;
    // show & update player points
    updatePlayerPoints();
    // hide round num info
    document.getElementById("roundNumDiv").style.display = 'none';
    console.log("Opponent Points: " + opponentPoints);
    console.log("Opponent Strategy: " + opponent.name);
}
function deactivatePlayerChoiceButtons() {
    document.getElementById("playerQuestion").style.display = 'none';
    conSplitButton.style.display = 'none';
    conStealButton.style.display = 'none';
}

/* resetGame():
* resets variables that are important to the gameplay loop,
* as well as visual elements
*/
function resetGame() {
    rounds = Math.floor(Math.random() * (20 - 11 + 1) + 11);
    document.getElementById("playerWin").style.display = 'none';
    document.getElementById("playerLose").style.display = 'none';
    // Hide opponent details
    document.getElementById("opponentDetails").style.display = 'none';
    document.getElementById("playerPointsPara").style.display = 'none';
    // Hide Game Over and final round headers
    document.getElementById("endOfGame").style.display = 'none';
    clearChoiceHistoryTable();
    currentRound = 1;
    playerChoices = [];
    playerPoints = 0;
    opponentChoices = [];
    opponentPoints = 0;
}

/* clearChoiceHistoryTable():
* resets HTML table containing player and opponent choices for a game
*/
function clearChoiceHistoryTable() {
    for (let i = 0; i < playerChoices.length; i++) {
        let playerRow = document.getElementById("playerChoicesRow");
        let opponentRow = document.getElementById("OpponentChoicesRow");
        let roundRow = document.getElementById("roundRow");
        playerRow.deleteCell(-1);
        opponentRow.deleteCell(-1);
        roundRow.deleteCell(-1);
    }
}

/* playerChoiceSplit():
* this is the function executed when the 'Split' button is pushed
* during the gameplay loop. Logs the choice for the round, and iterates round
*/
function playerChoiceSplit() {
    opponentTurn();
    playerChoices.push("Split");
    console.clear();
    currentRound += 1;
    playGame()
}

/* playerChoiceSteal():
* this is the function executed when the 'Steal' button is pushed
* during the gameplay loop. Logs the choice for the round, and iterates round
*/
function playerChoiceSteal() {
    opponentTurn();
    playerChoices.push("Steal");
    console.clear();
    currentRound += 1;
    playGame()
}

/* opponentTurn():
* gets opponent choice (Split/Steal) from the 'opponent' object after
* the player has made their selection
*/
function opponentTurn() {
    let opponentChoice = opponent.makeChoice();
    opponentChoices.push(opponentChoice);
}

/* updatePlayerPoints():
* updates the HTML elements for player and opponent points
*/
function updatePlayerPoints() {
    //// The score table is updated 
    document.getElementById("playerScoreUpdate").textContent = playerPoints;
    document.getElementById("opponentScoreUpdate").textContent = opponentPoints;
}