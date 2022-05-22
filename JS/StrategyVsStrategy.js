/* Opponent Strategy Imports */
import {OpponentAlwaysSplit} from "./Player_vs_Strategy_Opponents/OpponentAlwaysSplits.js";
import {OpponentAlwaysSteal} from "./Player_vs_Strategy_Opponents/OpponentAlwaysSteals.js";
import {StrategyGrim} from "./Strategy_vs_Strategy_Opponents/StrategyGrim.js";
import {OpponentRandom} from "./Player_vs_Strategy_Opponents/OpponentRandom.js";
import {StrategyTitForTatCoopFirst} from "./Strategy_vs_Strategy_Opponents/StrategyTitForTatCoopFirst.js";
import {StrategyTitForTatDefectFirst} from "./Strategy_vs_Strategy_Opponents/StrategyTitForTatDefectFirst.js";
import {StrategyPavlov} from "./Strategy_vs_Strategy_Opponents/StrategyPavlov.js";
import {StrategyTitForTwoTats} from "./Strategy_vs_Strategy_Opponents/StrategyTitForTwoTats.js";
import {StrategyThresher} from "./Strategy_vs_Strategy_Opponents/StrategyThresher.js";
import {StrategyImperfectTitForTat} from "./Strategy_vs_Strategy_Opponents/StrategyImperfectTitForTat.js";
/* Opponent Strategy Imports */

let alwaysSplit = new OpponentAlwaysSplit();
let alwaysSteal = new OpponentAlwaysSteal();
let randomChoice = new OpponentRandom();
let titForTatCoop = new StrategyTitForTatCoopFirst();
let titForTatDefect = new StrategyTitForTatDefectFirst();
let grim = new StrategyGrim();
let pavlov = new StrategyPavlov();
let titForTwoTats = new StrategyTitForTwoTats();
let thresher = new StrategyThresher();
let impTitForTat = new StrategyImperfectTitForTat();
let possibleStrategies = [alwaysSplit, alwaysSteal, randomChoice, grim, titForTatCoop, titForTatDefect,
                          pavlov, titForTwoTats, thresher, impTitForTat];

document.getElementById("helpButton").addEventListener("click", displayGuide);
function displayGuide() {
    let popup = window.open('guide.html', 'popup', 'width=500,height=500,scrollbars=yes,resizeable=yes');
    popup.window.onload = function() {
        popup.document.getElementById("fromGuideToMenu").style.display='none'
    }
}

export let strategy1 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
export let strategy1Choices = []
let strategy1Points = 0;
export let strategy2 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
export let strategy2Choices = []
let strategy2Points = 0;

console.log('Strat 1 (unchosen): ' + strategy1.name);
console.log('Strat 2 (unchosen): ' + strategy2.name);

export let currentRound = 1;
export let rounds = 10;

let dropdown1 = document.getElementById("selectStrat1");
dropdown1.addEventListener('change', setStrategy1);
function setStrategy1() {
    console.clear();
    console.log("Function 1 triggered");
    let selection = dropdown1.options[dropdown1.selectedIndex].value
    if (selection === 'notChosen') {
        strategy1 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
    }
    else if (selection === 'alwaysSplit') { strategy1 = alwaysSplit; }
    else if (selection === 'alwaysSteal') { strategy1 = alwaysSteal; }
    else if (selection === 'random') { strategy1 = randomChoice; }
    else if (selection === 'coopTitForTat') { strategy1 = titForTatCoop; }
    else if (selection === 'defectTitForTat') { strategy1 = titForTatDefect; }
    else if (selection === 'grim') { strategy1 = grim; }
    else if (selection === 'pavlov') { strategy1 = pavlov; }
    else if (selection === 'titForTwoTats') { strategy1 = titForTwoTats; }
    else if (selection === 'thresher') { strategy1 = thresher; }
    else if (selection === 'impTitForTat') { strategy1 = impTitForTat; }
    setStrat1Desc(selection);
    console.log("Strat 1: " + strategy1.name)
    console.log("Selection: " + selection)
}

function setStrat1Desc(selection) {
    if (selection === 'notChosen') {
        document.getElementById("strat1Desc").textContent = "Strategy 1 will be chosen randomly."
    } else {
        document.getElementById("strat1Desc").textContent = strategy1.desc;
    }
}

let dropdown2 = document.getElementById("selectStrat2");
dropdown2.addEventListener('change', setStrategy2);
function setStrategy2() {
    console.clear();
    console.log("Function 2 triggered");
    let selection = dropdown2.options[dropdown2.selectedIndex].value
    if (selection === 'notChosen') { 
        strategy2 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
        document.getElementById("strat1ChoiceName").textContent = strategy2.name;
        document.getElementById("opponent1Strategy").textContent = strategy2.name;
    }
    else if (selection === 'alwaysSplit') { strategy2 = alwaysSplit; }
    else if (selection === 'alwaysSteal') { strategy2 = alwaysSteal; }
    else if (selection === 'random') { strategy2 = randomChoice; }
    else if (selection === 'coopTitForTat') { strategy2 = titForTatCoop; }
    else if (selection === 'defectTitForTat') { strategy2 = titForTatDefect; }
    else if (selection === 'grim') { strategy2 = grim; }
    else if (selection === 'pavlov') { strategy2 = pavlov; }
    else if (selection === 'titForTwoTats') { strategy2 = titForTwoTats; }
    else if (selection === 'thresher') { strategy2 = thresher; }
    else if (selection === 'impTitForTat') { strategy2 = impTitForTat; }
    setStrat2Desc(selection);
    console.log("Strat 2: " + strategy2.name)
    console.log("Selection: " + selection)
}

function setStrat2Desc(selection) {
    if (selection === 'notChosen') {
        document.getElementById("strat2Desc").textContent = "Strategy 2 will be chosen randomly."
    } else {
        document.getElementById("strat2Desc").textContent = strategy2.desc
    }
}

document.getElementById("nextRound").addEventListener("click", nextRound)

document.getElementById("startGame").addEventListener("click", startGame)
function startGame() {
    console.clear();
    console.log("Strat 1: " + strategy1.name + " Points: " + strategy1Points);
    console.log("Strat 2: " + strategy2.name + " Points: " + strategy2Points);
    document.getElementById("chooseStrat1").style.display ='none';
    document.getElementById("chooseStrat2").style.display ='none';
    document.getElementById("startGame").style.display='none';
    document.getElementById("nextRound").style.display='block';
    document.getElementById("strat1ChoiceName").textContent = strategy1.name;
    document.getElementById("opponent1Strategy").textContent = strategy1.name;
    document.getElementById("strat2ChoiceName").textContent = strategy2.name;
    document.getElementById("opponent2Strategy").textContent = strategy2.name;
    document.getElementById("strat1Desc").textContent = strategy1.desc;
    document.getElementById("strat2Desc").textContent = strategy2.desc;
    nextRound();
    document.getElementById("stratChoiceHistoryTable").style.display = 'block';
    document.getElementById("scoreTable").style.display = 'block';
}

function nextRound() {
    console.clear();
    console.log("Current Round: " + currentRound)
    console.log("Strat 1: " + strategy1.name + " Points: " + strategy1Points);
    console.log("Strat 2: " + strategy2.name + " Points: " + strategy2Points);
    if (currentRound <= rounds) {
        strategy1Choices.push(strategy1.makeChoice());
        strategy2Choices.push(strategy2.makeChoice());
        givePoints();
        printRound();
        currentRound += 1;
    } else {
        console.log("Game Over");
        document.getElementById("endOfGame").style.display = 'block';
        document.getElementById("strategyDetails").style.display = 'block';
        document.getElementById("nextRound").style.display='none';
        document.getElementById("playAgain").style.display='block';
    }
}

function printRound() {
    let strat1Row = document.getElementById("strat1ChoicesRow");
    let strat2Row = document.getElementById("strat2ChoicesRow");
    console.log("Round " + currentRound);
    let roundsRow = document.getElementById("roundRow");
    roundsRow.insertCell(-1).innerHTML = String(currentRound);
    console.log("Strategy 1 did: " + strategy1Choices[currentRound - 1]);
    console.log("Strategy 2 did: " + strategy2Choices[currentRound - 1]);
    strat2Row.insertCell(-1).innerHTML = strategy2Choices[currentRound - 1];
    updateChangeColorOfCell("strat2ChoicesRow", currentRound - 1, strategy2Choices[currentRound - 1]);
    strat1Row.insertCell(-1).innerHTML = strategy1Choices[currentRound - 1];
    updateChangeColorOfCell("strat1ChoicesRow", currentRound - 1, strategy1Choices[currentRound - 1]);
}

function givePoints() {
    let strat1Choice = strategy1Choices[strategy1Choices.length - 1];
    let strat2Choice = strategy2Choices[strategy2Choices.length - 1];
    if (strat1Choice === "Split" && strat2Choice === "Split") {
        strategy1Points += 250;
        strategy2Points += 250;
    } else if (strat1Choice === "Steal" && strat2Choice === "Split") {
        strategy1Points += 500;
        strategy2Points -= 50;
    } else if (strat1Choice === "Split" && strat2Choice === "Steal") {
        strategy1Points -= 50;
        strategy2Points += 500;
    }
    updatePointDisplay()
}

function updatePointDisplay() {
    document.getElementById("Strat1ScoreUpdate").textContent = strategy1Points;
    document.getElementById("Strat2ScoreUpdate").textContent = strategy2Points;
}


document.getElementById("playAgain").addEventListener("click", resetGame)
function resetGame() {
    console.clear()
    clearChoiceHistoryTable();
    currentRound = 1;
    strategy1Points = 0;
    strategy1Choices = [];
    strategy2Points = 0;
    strategy2Choices = [];
    document.getElementById("chooseStrat1").style.display ='block';
    document.getElementById("chooseStrat2").style.display ='block';
    document.getElementById("startGame").style.display='block';
    document.getElementById("endOfGame").style.display = 'none';
    document.getElementById("nextRound").style.display='none';
    document.getElementById("playAgain").style.display='none';
    document.getElementById("stratChoiceHistoryTable").style.display = 'none';
    document.getElementById("scoreTable").style.display = 'none';
}

function clearChoiceHistoryTable() {
    for (let i = 0; i < strategy1Choices.length; i++) {
        let strat1Row = document.getElementById("strat1ChoicesRow");
        let strat2Row = document.getElementById("strat2ChoicesRow");
        let roundsRow = document.getElementById("roundRow");
        strat1Row.deleteCell(-1);
        strat2Row.deleteCell(-1);
        roundsRow.deleteCell(-1);
    }
}

function updateChangeColorOfCell(name, number, idex) {
    let tableCell = document.getElementById(name).getElementsByTagName("td");
    console.log(name +" " + tableCell[number]);
    if (idex === "Steal") {
        tableCell[number].style.backgroundColor = "red";
    }
    if (idex === "Split") {
        tableCell[number].style.backgroundColor = "green";
    }
}