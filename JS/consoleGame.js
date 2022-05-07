let rounds;
let currentRound = 1;
let playerChoices = [];
let playerPoints = 0;
let possibleOpponents = [];
let opponent;
let opponentChoices = [];
let opponentPoints = 0;

function createGame() {
    populatePossibleOpponents();
    pickOpponentRandomly();
    console.log("Let's Play!");
    rounds = Math.floor(Math.random() * (15 - 10 + 1) + 10);
    document.getElementById("createConsoleGame").style.display = 'none';
    document.getElementById("consoleSplit").style.display = 'block';
    document.getElementById("consoleSteal").style.display = 'block';
    playGame();
}

function playAgain() {
    console.clear();
    createGame();
    document.getElementById("consolePlayAgain").style.display = "none";
}

function populatePossibleOpponents() {
    let alwaysSplit = new OpponentAlwaysSplit("Unconditional Cooperate (Always Split)");
    let alwaysSteal = new OpponentAlwaysSteal("Unconditional Defect (Always Steal)");
    let randomChoice = new OpponentRandom("Random Choice");
    let titForTatCoop = new OpponentTitForTatCoopFirst("Tit for Tat - Cooperate First");
    let titForTatDefect = new OpponentTitForTatDefectFirst("Tit for Tat - Defect First");
    possibleOpponents.push(alwaysSplit);
    possibleOpponents.push(alwaysSteal);
    possibleOpponents.push(randomChoice);
    possibleOpponents.push(titForTatCoop);
    possibleOpponents.push(titForTatDefect);
}

function pickOpponentRandomly() {
    let random = Math.floor(Math.random() * possibleOpponents.length);
    opponent = possibleOpponents[random];
}

function playGame() {
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
        resetGame();
    }
}

function resetGame() {
    currentRound = 1;
    playerChoices = [];
    playerPoints = 0;
    opponentChoices = [];
    opponentPoints = 0;
    document.getElementById("consolePlayAgain").style.display = 'block';
    document.getElementById("consoleSplit").style.display = 'none';
    document.getElementById("consoleSteal").style.display = 'none';
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

function printRound() {
    if (currentRound === rounds) {
        console.log ("==== Last Round ====");
    } else if (currentRound < 10) {
        console.log("===== Round 0" + currentRound + " =====");
    } else {
        console.log("===== Round " + currentRound + " =====");
    }
    console.log("Click Split or Steal!");
    console.log("Opponent AI: " + opponent.name);
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

function printSummary() {
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

class OpponentAlwaysSplit {
    name

    makeChoice() {
        return "Split";
    }

    constructor(name) {
        this.name = name;
    }
}

class OpponentAlwaysSteal {
    name

    makeChoice() {
        return "Steal";
    }

    constructor(name) {
        this.name = name;
    }
}

class OpponentRandom {
    name

    makeChoice() {
        let actions = ["Split", "Steal"];
        let random = Math.floor(Math.random() * actions.length);
        return actions[random];
    }

    constructor(name) {
        this.name = name;
    }
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

class OpponentTitForTatDefectFirst {
    name

    makeChoice() {
        if (currentRound === 1) {
            return "Steal";
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