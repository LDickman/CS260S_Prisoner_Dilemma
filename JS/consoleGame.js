import { OpponentTitForTatDefectFirst } from './OpponentTitForTatDefectFirst.js';
import { OpponentAlwaysSplit } from "./OpponentAlwaysSplits.js"
import { OpponentAlwaysSteal } from "./OpponentAlwaysSteals.js"
import { OpponentRandom } from "./OpponentRandom.js"
import { OpponentTitForTatCoopFirst } from "./OpponentTitForTatCoopFirst.js"
import { OpponentGrim } from "./OpponentGrim.js";
import { OpponentPavlov } from "./OpponentPavlov.js"
import { OpponentTitForTwoTats} from "./OpponentTitForTwoTats.js";

let rounds = Math.floor(Math.random() * (15 - 10 + 1) + 10);
export let currentRound = 1;
export let playerChoices = [];
let strategyName = document.getElementById("AIName");
let strategyDes = document.getElementById("AIDes");
let playerPoints = 0;
let possibleOpponents = [];
let opponent;
let opponentType = "";
export let opponentChoices = [];
let opponentPoints = 0;


populatePossibleOpponents();

document.getElementById("helpButton").addEventListener("click", function() {
    let popup = window.open('guide.html', 'popup', 'width=500,height=500,scrollbars=yes');
    popup.window.onload = function() {
        popup.document.getElementById("fromGuideToMenu").style.display='none'
    }
});
const conSplitButton = document.getElementById("consoleSplit");
conSplitButton.addEventListener("click", submitSplitActive);

const conStealButton = document.getElementById("consoleSteal");
conStealButton.addEventListener("click", submitStealActive);

const submitSplitButton = document.getElementById("consoleSubmitSplit");
submitSplitButton.addEventListener("click", playerChoiceSplit);

const submitStealButton = document.getElementById("consoleSubmitSteal");
submitStealButton.addEventListener("click", playerChoiceSteal);

const dummySubmitButton = document.getElementById("dummySubmit");

const replayButton = document.getElementById("consolePlayAgain");

const toGameScreenBody = document.getElementById("consoleGameScreen");

let createGameButton;
let selectStrategyButton;

replayButton.addEventListener("click", function() {
    replayButton.style.display = 'none';
    resetGame();
    console.clear();
    createGame();
});

// long if-statement
if (toGameScreenBody == null) {
    createGameButton = document.getElementById("createConsoleGame");
    createGameButton.addEventListener("click", createGame);

    selectStrategyButton = document.getElementById("AISelect");
    let ulList = document.getElementById("strategyList");
    selectStrategyButton.addEventListener("click", selectionButton);

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
        clickOnDropDownMenu(ulList, selectStrategyButton);
    }

} else {
    window.addEventListener("load", createGame);
}
function selectionButton() {
    document.getElementById('strategyDropdown').classList.toggle("show");
}

function clickOnDropDownMenu(ul, button) {
    let items = ul.getElementsByTagName('li');
    ul.addEventListener("click", function (e) {
        for (let i = 0; i < items.length; i++) {
            if (e.target === items[i]) {
                opponentType = items[i].textContent;
                console.log("opponentType: " + opponentType);
                button.textContent = items[i].textContent;
            }
        }
    });
    displayOpponentInfo();
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
// END long if-statement

// Create Game
function createGame() {
    if (selectStrategyButton == null) {
        pickOpponentRandomly();
        playGame();
    } else {
        createGameButton.style.display = 'none';
        selectStrategyButton.style.display = 'none';
        document.getElementById("opponentStrategyInfo").style.display = 'none';
        document.getElementById("buttonInfo").style.display = 'none';
        strategyName.style.display = 'none';
        strategyDes.style.display = 'none';
        setOpponent();
        playGame();
    }
}

function pickOpponentRandomly() {
    let random = Math.floor(Math.random() * possibleOpponents.length);
    opponent = possibleOpponents[random];
}
// END Create Game

// Play Game
function playGame() {
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

function activatePlayerChoiceButtons() {
    conSplitButton.style.display = 'inline-block';
    conStealButton.style.display = 'inline-block';
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

function displayOpponentInfo() {
    switch (opponentType) {
        case "Always Split":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "Your opponent will always choose to cooperate with you";
            break;
        case "Always Steal":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "Your opponent will always choose to defect with you";
            break;
        case "Random":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "Your opponent will randomly be supporting or be against you";
            break;
        case "Tit for Tat Defect":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "Your opponent will first betray you, but depending on if you betray them then they will betray you. If you cooperate thn your opponent will cooperate with you";
            break;
        case "Tit for Tat Coop.":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "Your opponent will first cooperate you, but depending on if you betray them then they will betray you. If you cooperate thn your opponent will cooperate with you";
            break;
        case "Grim":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "something";
            break;
        case "Pavlov":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "something";
            break;
        case "Tit For Two Tats":
            strategyName.textContent = opponentType;
            strategyDes.textContent = "something";
            break;
        case "No Preference":
            strategyName.textContent = " ";
            strategyDes.textContent = " ";
            break;
        case "":
            strategyName.textContent = " ";
            strategyDes.textContent = " ";
            break;
    }
}

function printRound() {
    document.getElementById("consolePlayerPointsPara").style.display = 'block';
    document.getElementById("roundNumDiv").style.display = 'inline-block';
    updatePlayerPoints();
    if (currentRound === rounds) {
        document.getElementById("finalRound").style.display = 'inline-block';
        document.getElementById("roundNum").innerHTML = currentRound;
    } else {
        document.getElementById("roundNumDisplay").style.display = 'inline-block';
        document.getElementById("roundNum").innerHTML = currentRound;
    }
    console.log("Opponent AI: " + opponent.name);
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
    console.log("Opponent Points: " + opponentPoints);
    console.log("Opponent AI: " + opponent.name);
}
function deactivatePlayerChoiceButtons() {
    conSplitButton.style.display = 'none';
    conStealButton.style.display = 'none';
    document.getElementById("dummySubmit").style.display = 'none';
}

// END Play Game

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
    return possibleOpponents;
}

// Reset Game
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
function clearChoiceHistoryTable() {
    for (let i = 0; i < playerChoices.length; i++) {
        let playerRow = document.getElementById("playerChoicesRow");
        let opponentRow = document.getElementById("OpponentChoicesRow");
        playerRow.deleteCell(-1);
        opponentRow.deleteCell(-1);
    }
}

// END Reset Game

function submitSplitActive() {
    dummySubmitButton.style.display = 'none';
    conSplitButton.style.color = 'gray';
    conStealButton.style.color = 'black';
    submitSplitButton.style.display = 'inline';
    submitStealButton.style.display = 'none';
}

function submitStealActive() {
    dummySubmitButton.style.display = 'none';
    conStealButton.style.color = 'gray';
    conSplitButton.style.color = 'black';
    submitStealButton.style.display = 'inline';
    submitSplitButton.style.display = 'none';
}

function playerChoiceSplit() {
    opponentTurn();
    playerChoices.push("Split");
    console.clear();
    submitSplitButton.style.display = 'none';
    conSplitButton.style.color = 'black';
    conStealButton.style.color = 'black';
    currentRound += 1;
    playGame()
}

function playerChoiceSteal() {
    opponentTurn();
    playerChoices.push("Steal");
    console.clear();
    submitStealButton.style.display = 'none';
    conSplitButton.style.color = 'black';
    conStealButton.style.color = 'black';
    currentRound += 1;
    playGame()
}

function opponentTurn() {
    let opponentChoice = opponent.makeChoice();
    opponentChoices.push(opponentChoice);
}

function updatePlayerPoints() {
    document.getElementById("consolePlayerPoints").innerHTML = playerPoints;
}