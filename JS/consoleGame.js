import { OpponentTitForTatDefectFirst } from './OpponentTitForTatDefectFirst.js';
import { OpponentAlwaysSplit } from "./OpponentAlwaysSplits.js"
import { OpponentAlwaysSteal } from "./OpponentAlwaysSteals.js"
import { OpponentRandom } from "./OpponentRandom.js"
import { OpponentTitForTatCoopFirst } from "./OpponentTitForTatCoopFirst.js"
import { OpponentGrim } from "./OpponentGrim.js";
import { OpponentPavlov } from "./OpponentPavlov.js"
import { OpponentTitForTwoTats} from "./OpponentTitForTwoTats.js";

let rounds;
export let currentRound = 1;
export let playerChoices = [];
let playerPoints = 0;
let possibleOpponents = [];
let opponent;
let opponentType = "";
export let opponentChoices = [];
let opponentPoints = 0;
populatePossibleOpponents();

document.getElementById("helpButton").addEventListener("click", openGuide);

function openGuide() {
    let popup = window.open('guide.html', 'popup', 'width=500,height=500,scrollbars=yes');
    popup.window.onload = function() {
        popup.document.getElementById("fromGuideToMenu").style.display='none'
    }
}

const conSplitButton = document.getElementById("consoleSplit");
conSplitButton.addEventListener("click", submitSplitActive);

const conStealButton = document.getElementById("consoleSteal");
conStealButton.addEventListener("click", submitStealActive);

const submitSplitButton = document.getElementById("consoleSubmitSplit");
submitSplitButton.addEventListener("click", playerChoiceSplit);

const submitStealButton = document.getElementById("consoleSubmitSteal");
submitStealButton.addEventListener("click", playerChoiceSteal);

const replayButton = document.getElementById("consolePlayAgain");
replayButton.addEventListener("click", playAgain);

const toGameScreenBody = document.getElementById("consoleGameScreen");

if (toGameScreenBody == null) {
    const startButton = document.getElementById("createConsoleGame");
    startButton.addEventListener("click", createGame);

    const AIButton = document.getElementById("AISelect");
    let ulList = document.getElementById("strategyList");
    AIButton.addEventListener("click", selectionButton);

    window.onclick = function (event) {
        if (!event.target.matches('.dropButton')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
        clickOnDropDownMenu(ulList, AIButton);
    }

    function clickOnDropDownMenu(ul, button) {
        let items = ul.getElementsByTagName('li');
        ul.addEventListener("click", function (e) {
            for (let i = 0; i < items.length; i++) {
                if (e.target === items[i]) {
                    console.log(items[i].textContent);
                    opponentType = items[i].textContent;
                    console.log("opponentType: " + opponentType);
                    button.textContent = items[i].textContent;
                }
            }
        });
    }
} else {
    window.addEventListener("load", createGame);
}

function selectionButton() {
    document.getElementById('strategyDropdown').classList.toggle("show");
    console.log("click");
}

function createGame() {
    // v Deactivates create game button
    if (document.getElementById("AISelect") == null) {
        setGameRounds();
        pickOpponentRandomly();
        playGame();
    } else {
        document.getElementById("createConsoleGame").style.display = 'none';
        document.getElementById("AISelect").style.display = 'none';
        document.getElementById("AIinfo").style.display = 'none';
        document.getElementById("buttonInfo").style.display = 'none';
        setGameRounds();
        setOpponent();
        playGame();
    }
}

function setGameRounds() {
    rounds = Math.floor(Math.random() * (15 - 10 + 1) + 10);
}

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
        case "Tit for Tat Coop.":
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
        case "No Preference":
            pickOpponentRandomly();
            break;
        case "":
            pickOpponentRandomly();
            break;
    }
}

function populatePossibleOpponents() {
    let alwaysSplit = new OpponentAlwaysSplit();
    let alwaysSteal = new OpponentAlwaysSteal();
    let randomChoice = new OpponentRandom();
    let titForTatCoop = new OpponentTitForTatCoopFirst();
    let titForTatDefect = new OpponentTitForTatDefectFirst();
    let grim = new OpponentGrim();
    let pavlov = new OpponentPavlov();
    let titForTwoTats = new OpponentTitForTwoTats();
    possibleOpponents.push(alwaysSplit);
    possibleOpponents.push(alwaysSteal);
    possibleOpponents.push(randomChoice);
    possibleOpponents.push(titForTatCoop);
    possibleOpponents.push(titForTatDefect);
    possibleOpponents.push(grim);
    possibleOpponents.push(pavlov);
    possibleOpponents.push(titForTwoTats);
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
        document.getElementById("consolePlayAgain").style.display = 'inline';
        deactivatePlayerChoiceButtons()
    }
}

function deactivatePlayerChoiceButtons() {
    document.getElementById("consoleSplit").style.display = 'none';
    document.getElementById("consoleSteal").style.display = 'none';
    document.getElementById("dummySubmit").style.display = 'none';
}

function activatePlayerChoiceButtons() {
    document.getElementById("consoleSplit").style.display = 'inline-block';
    document.getElementById("consoleSteal").style.display = 'inline-block';
    document.getElementById("dummySubmit").style.display = 'inline';
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
    document.getElementById("roundNumDiv").style.display = 'inline-block';
    updatePlayerPoints();
    if (currentRound === rounds) {
        console.log("==== Last Round ====");
        document.getElementById("finalRound").style.display = 'inline-block';
        document.getElementById("roundNum").innerHTML = currentRound;
    } else {
        console.log("===== Round " + currentRound + " =====");
        document.getElementById("roundNumDisplay").style.display = 'inline-block';
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
    opponentType = "";
}

function submitSplitActive() {
    document.getElementById("consoleSplit").style.color = 'gray';
    document.getElementById("consoleSteal").style.color = 'black';
    document.getElementById("consoleSubmitSplit").style.display = 'inline';
    document.getElementById("consoleSubmitSteal").style.display = 'none';
}

function submitStealActive() {
    document.getElementById("consoleSteal").style.color = 'gray';
    document.getElementById("consoleSplit").style.color = 'black';
    document.getElementById("consoleSubmitSteal").style.display = 'inline';
    document.getElementById("consoleSubmitSplit").style.display = 'none';
}

function playerChoiceSplit() {
    opponentTurn();
    playerChoices.push("Split");
    console.clear();
    document.getElementById("consoleSubmitSplit").style.display = 'none';
    document.getElementById("consoleSplit").style.color = 'black';
    document.getElementById("consoleSteal").style.color = 'black';
    currentRound += 1;
    playGame()
}

function playerChoiceSteal() {
    opponentTurn();
    playerChoices.push("Steal");
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
