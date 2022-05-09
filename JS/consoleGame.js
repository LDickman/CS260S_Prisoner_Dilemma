import { OpponentTitForTatDefectFirst } from './OpponentTitForTatDefectFirst.js';
import { OpponentAlwaysSplit } from "./OpponentAlwaysSplits.js"
import { OpponentAlwaysSteal } from "./OpponentAlwaysSteals.js"
import { OpponentRandom } from "./OpponentRandom.js"
let rounds;
export let currentRound = 1;
export let playerChoices = [];
let playerPoints = 0;
let possibleOpponents = [];
let opponent;
let opponentChoices = [];
let opponentPoints = 0;

const startButton = document.getElementById("createConsoleGame");
startButton.addEventListener("click", createGame);

const conSlpitButton = document.getElementById("consoleSplit");
conSlpitButton.addEventListener("click", submitSplitActive);

const conStealButton = document.getElementById("consoleSteal");
conStealButton.addEventListener("click", submitStealActive);

const submitSplitButton = document.getElementById("consoleSubmitSplit");
submitSplitButton.addEventListener("click", playerChoiceSplit);

const submitStealButton = document.getElementById("consoleSubmitSteal");
submitStealButton.addEventListener("click", playerChoiceSteal);

const replayButton = document.getElementById("consolePlayAgain");
replayButton.addEventListener("click", playAgain);

function createGame() {
    // v Deactivates create game button
    document.getElementById("createConsoleGame").style.display = 'none';
    setGameRounds();
    setOpponent();
    playGame();
}

function setGameRounds() {
    rounds = Math.floor(Math.random() * (15 - 10 + 1) + 10);
}

function setOpponent() {
    populatePossibleOpponents();
    pickOpponentRandomly();
}

function populatePossibleOpponents() {
    // let alwaysSplit = new OpponentAlwaysSplit("Unconditional Cooperate (Always Split)");
    // let alwaysSteal = new OpponentAlwaysSteal("Unconditional Defect (Always Steal)");
    let randomChoice = new OpponentRandom("Random Choice");
    // let titForTatCoop = new OpponentTitForTatCoopFirst("Tit for Tat - Cooperate First");
   // let titForTatDefect = new OpponentTitForTatDefectFirst("Tit for Tat - Defect First");
    // possibleOpponents.push(alwaysSplit);
    // possibleOpponents.push(alwaysSteal);
    possibleOpponents.push(randomChoice);
    // possibleOpponents.push(titForTatCoop);
   // possibleOpponents.push(titForTatDefect);
}

function pickOpponentRandomly() {
    let random = Math.floor(Math.random() * possibleOpponents.length);
    opponent = possibleOpponents[random];
}

function playGame() {
    activatePlayerChoiceButtons();
    populateChoiceHistoryTable();
    givePoints();
    if (currentRound <= rounds) {
        printRound();
        console.log("Player Points: " + playerPoints);
        console.log("Opponent Points: " + opponentPoints);
        printPlayerChoices();
        printOpponentChoices();
        console.log("====================");
    } else {
        printSummary();
        // v activates play again button
        document.getElementById("consolePlayAgain").style.display = 'block';
        deactivatePlayerChoiceButtons()
    }
}

function deactivatePlayerChoiceButtons() {
    document.getElementById("consoleSplit").style.display = 'none';
    document.getElementById("consoleSteal").style.display = 'none';
}

function activatePlayerChoiceButtons() {
    document.getElementById("consoleSplit").style.display = 'block';
    document.getElementById("consoleSteal").style.display = 'block';
}

function populateChoiceHistoryTable() {
    document.getElementById("playerChoiceHistoryTable").style.display = 'block';
    if (currentRound !== 1) {
        for (let i = 0; i < playerChoices.length; i++) {
            if (i === playerChoices.length - 1) {
                let playerRow = document.getElementById("playerChoicesRow");
                let opponentRow = document.getElementById("OpponentChoicesRow");
                playerRow.insertCell(-1).innerHTML = (currentRound - 1) + ". " + playerChoices[i];
                opponentRow.insertCell(-1).innerHTML = (currentRound - 1) + ". " + opponentChoices[i];
            }
        }
    }
}

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

function printRound() {
    document.getElementById("consolePlayerPointsPara").style.display = 'block';
    document.getElementById("roundNumDiv").style.display = 'block';
    updatePlayerPoints();
    if (currentRound === rounds) {
        console.log ("==== Last Round ====");
        document.getElementById("finalRound").style.display = 'block';
        document.getElementById("roundNum").innerHTML = currentRound;
    } else {
        console.log("===== Round " + currentRound + " =====");
        document.getElementById("roundNumDisplay").style.display = 'block';
        document.getElementById("roundNum").innerHTML = currentRound;
    }
    console.log("Click Split or Steal!");
    console.log("Opponent AI: " + opponent.name);
}

function clearChoiceHistoryTable() {
    for (let i = 0; i < playerChoices.length; i++) {
        let playerRow = document.getElementById("playerChoicesRow");
        let opponentRow = document.getElementById("OpponentChoicesRow");
        playerRow.deleteCell(-1);
        opponentRow.deleteCell(-1);
    }
}

function playAgain() {
    // v Deactivates play again button
    document.getElementById("consolePlayAgain").style.display = 'none';
    resetGame();
    console.clear();
    createGame();
}

function resetGame() {
    // Hide opponent details
    document.getElementById("opponentDetails").style.display = 'none';
    // Hide Game Over and final round headers
    document.getElementById("endOfGame").style.display = 'none';
    document.getElementById("finalRound").style.display = 'none';
    clearChoiceHistoryTable();
    currentRound = 1;
    playerChoices = [];
    playerPoints = 0;
    opponentChoices = [];
    opponentPoints = 0;
}

function submitSplitActive() {
    document.getElementById("consoleSplit").style.color = 'gray';
    document.getElementById("consoleSteal").style.color = 'black';
    document.getElementById("consoleSubmitSplit").style.display = 'block';
    document.getElementById("consoleSubmitSteal").style.display = 'none';
}

function submitStealActive() {
    document.getElementById("consoleSteal").style.color = 'gray';
    document.getElementById("consoleSplit").style.color = 'black';
    document.getElementById("consoleSubmitSteal").style.display = 'block';
    document.getElementById("consoleSubmitSplit").style.display = 'none';
}

function playerChoiceSplit() {
    playerChoices.push("Split");
    opponentTurn();
    console.clear();
    document.getElementById("consoleSubmitSplit").style.display = 'none';
    document.getElementById("consoleSplit").style.color = 'black';
    document.getElementById("consoleSteal").style.color = 'black';
    currentRound += 1;
    playGame()
}

function playerChoiceSteal() {
    playerChoices.push("Steal");
    opponentTurn();
    console.clear();
    document.getElementById("consoleSubmitSteal").style.display = 'none';
    document.getElementById("consoleSplit").style.color = 'black';
    document.getElementById("consoleSteal").style.color = 'black';
    currentRound += 1;
    playGame()
}

function printPlayerChoices() {
    if (currentRound === 1) {
        console.log("You have made no choices yet!");
    } else {
        console.log("Your previous choices:");
        for (let i = 0; i < playerChoices.length; i++) {
            console.log((i + 1) + ". " + playerChoices[i]);
        }
    }
}

function opponentTurn() {
    let opponentChoice = opponent.makeChoice();
    opponentChoices.push(opponentChoice);
}

function printOpponentChoices() {
    if (currentRound === 1) {
        console.log("Opponent has made no choices yet!");
    } else {
        console.log("Opponent's previous choices:");
        for (let i = 0; i < opponentChoices.length; i++) {
            console.log((i + 1) + ". " + opponentChoices[i]);
        }
    }
}

function updatePlayerPoints() {
    document.getElementById("consolePlayerPoints").innerHTML = playerPoints;
}

function printSummary() {
    // show end of game header
    document.getElementById("endOfGame").style.display = 'block';
    // show & update opponent details
    document.getElementById("opponentDetails").style.display = 'block';
    document.getElementById("opponentPoints").innerHTML = opponentPoints;
    document.getElementById("opponentAI").innerHTML = opponent.name;
    // show updated player score
    updatePlayerPoints();
    // hide round num info
    document.getElementById("roundNumDiv").style.display = 'none';
    console.log("=== Game Results ===");
    if (playerPoints > opponentPoints) {
        console.log("You win! Congrats!");
    } else if (playerPoints === opponentPoints) {
        console.log("It's a draw!");
    } else {
        console.log("You lose! Try again!")
    }
    console.log("Player Points: " + playerPoints);
    console.log("Opponent Points: " + opponentPoints);
    console.log("Opponent AI: " + opponent.name);
    printPlayerChoices();
    printOpponentChoices();
    console.log("====================");
}

class OpponentTitForTatCoopFirst {
    name

    makeChoice() {
        if (currentRound === 1) {
            return "Split";
        } else {
            let pChoice = playerChoices[currentRound - 2];
            if (pChoice === "Split") {
                return "Split"
            } else {
                return "Steal"
            }
        }
    }

    constructor(name) {
        this.name = name;
    }
}