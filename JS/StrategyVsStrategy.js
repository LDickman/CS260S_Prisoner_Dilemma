/* Strategy Imports */
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
/* END Strategy Imports */

/* Strategy Initializations */
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
/* END Strategy Initializations */

/* Field Declarations/Initializations */
export let strategy1 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
export let strategy1Choices = []
let strategy1Points = 0;
export let strategy2 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
export let strategy2Choices = []
let strategy2Points = 0;
export let currentRound = 1;
export let rounds = Math.floor(Math.random() * (20 - 10 + 1) + 10);
/* END Field Declarations/Initializations */

/* In-Game Guide/How-to-Play Management */
document.getElementById("helpButton").addEventListener("click", displayGuide);
function displayGuide() {
    let popup = window.open('guide.html', 'popup', 'width=500,height=500,scrollbars=yes,resizeable=yes');
    popup.window.onload = function() {
        popup.document.getElementById("fromGuideToMenu").style.display='none'
    }
}
/* END In-Game Guide/How-to-Play Management */

/* Strategy 1 Dropdown Management */
/* setStrategy1():
* Set strategy 1 to user selection or random
*/
let strategy1Dropdown = document.getElementById("selectStrat1");
strategy1Dropdown.addEventListener('change', setStrategy1);
function setStrategy1() {
    let selection = strategy1Dropdown.options[strategy1Dropdown.selectedIndex].value
    if (selection === 'notChosen') { strategy1 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)]; }
    else if (selection === 'alwaysSplit') { strategy1 = alwaysSplit; }
    else if (selection === 'alwaysSteal') { strategy1 = alwaysSteal; }
    else if (selection === 'random') { strategy1 = randomChoice; }
    else if (selection === 'coopTitForTat') { strategy1 = titForTatCoop; }
    else if (selection === 'defectTitForTat') { strategy1 = titForTatDefect; }
    else if (selection === 'grim') { strategy1 = grim; }
    else if (selection === 'pavlov') { strategy1 = pavlov; }
    else if (selection === 'titForTwoTats') { strategy1 = titForTwoTats; }
    else if (selection === 'thresher') { strategy1 = new StrategyThresher(); }
    else if (selection === 'impTitForTat') { strategy1 = impTitForTat; }
    setStrat1Desc(selection);
}

/* setStrategy1Desc():
* Interacts with the strategy 1 dropdown to provide a description based on
* user selection
*/
function setStrat1Desc(selection) {
    document.getElementById("strat1ChoiceName").textContent = strategy1.name;
    document.getElementById("opponent1Strategy").textContent = strategy1.name;
    if (selection === 'notChosen') {
        document.getElementById("strat1Desc").textContent = "Strategy 1 will be chosen randomly."
    } else {
        document.getElementById("strat1Desc").textContent = strategy1.desc;
    }
}
/* END Strategy 1 Dropdown Management */

/* Strategy 2 Dropdown Management */
/* setStrategy2():
* Set strategy 2 to user selection or random
*/
let strategy2Dropdown = document.getElementById("selectStrat2");
strategy2Dropdown.addEventListener('change', setStrategy2);
function setStrategy2() {
    let selection = strategy2Dropdown.options[strategy2Dropdown.selectedIndex].value
    if (selection === 'notChosen') { strategy2 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)]; }
    else if (selection === 'alwaysSplit') { strategy2 = alwaysSplit; }
    else if (selection === 'alwaysSteal') { strategy2 = alwaysSteal; }
    else if (selection === 'random') { strategy2 = randomChoice; }
    else if (selection === 'coopTitForTat') { strategy2 = titForTatCoop; }
    else if (selection === 'defectTitForTat') { strategy2 = titForTatDefect; }
    else if (selection === 'grim') { strategy2 = grim; }
    else if (selection === 'pavlov') { strategy2 = pavlov; }
    else if (selection === 'titForTwoTats') { strategy2 = titForTwoTats; }
    else if (selection === 'thresher') { strategy2 = new StrategyThresher(); }
    else if (selection === 'impTitForTat') { strategy2 = impTitForTat; }
    setStrat2Desc(selection);
}

/* setStrategy2Desc():
* Interacts with the strategy 2 dropdown to provide a description based on
* user selection
*/
function setStrat2Desc(selection) {
    document.getElementById("strat2ChoiceName").textContent = strategy2.name;
    document.getElementById("opponent2Strategy").textContent = strategy2.name;
    if (selection === 'notChosen') {
        document.getElementById("strat2Desc").textContent = "Strategy 2 will be chosen randomly."
    } else {
        document.getElementById("strat2Desc").textContent = strategy2.desc
    }
}
/* END Strategy 2 Dropdown Management */

/* Round Dropdown Management */
/* setRoundNum():
* Set rounds to user selection or random
*/
let roundDropdown = document.getElementById("selectRounds");
roundDropdown.addEventListener('change', setRoundNum);
function setRoundNum() {
    let roundNum = roundDropdown.options[roundDropdown.selectedIndex].value
    if (roundNum === 'randomRounds') { rounds = rounds = Math.floor(Math.random() * (20 - 10 + 1) + 10); }
    else if (roundNum === '10') { rounds = 10; }
    else if (roundNum === '11') { rounds = 11; }
    else if (roundNum === '12') { rounds = 12; }
    else if (roundNum === '13') { rounds = 13; }
    else if (roundNum === '14') { rounds = 14; }
    else if (roundNum === '15') { rounds = 15; }
    else if (roundNum === '16') { rounds = 16; }
    else if (roundNum === '17') { rounds = 17; }
    else if (roundNum === '18') { rounds = 18; }
    else if (roundNum === '19') { rounds = 19; }
    else if (roundNum === '20') { rounds = 20; }
    setRoundDesc(roundNum);
}

/* setRoundDesc():
* Interacts with round dropdown to show selected round number
*/
function setRoundDesc(roundNum) {
    if (roundNum === 'randomRounds') {
        document.getElementById("roundDesc").innerHTML = "Random"
    } else {
        document.getElementById("roundDesc").innerHTML = rounds;
    }
}
/* END Round Dropdown Management */

/* Start Game Management */
/* startGame():
* Starts strategy vs. strategy game, largely UI handling
*/
document.getElementById("startGame").addEventListener("click", startGame)
function startGame() {
    deactivateDropdowns();
    activateGameElements();
    updateStrategyInfo();
    nextRound();
}

/* deactivateDropdowns():
* Disables dropdowns for strategies and rounds
*/
function deactivateDropdowns() {
    document.getElementById("strategyVsStrategy").style.display = 'none';
    document.getElementById("chooseStrat1").style.display = 'none';
    document.getElementById("chooseStrat2").style.display = 'none';
    document.getElementById("chooseRounds").style.display = 'none';
    document.getElementById("startGame").style.display = 'none';
}

/* activateGameElements():
* Enables gameplay controls and visuals
*/
function activateGameElements() {
    document.getElementById("nextRound").style.display = 'block';
    document.getElementById("stratChoiceHistoryTable").style.display = 'block';
    document.getElementById("scoreTable").style.display = 'block';
}

/* updateStrategyInfo():
* Updates displayed info for strategies
*/
function updateStrategyInfo() {
    document.getElementById("strat1ChoiceName").textContent = strategy1.name;
    document.getElementById("opponent1Strategy").textContent = strategy1.name;
    document.getElementById("strat2ChoiceName").textContent = strategy2.name;
    document.getElementById("opponent2Strategy").textContent = strategy2.name;
    document.getElementById("strat1Desc").textContent = strategy1.desc;
    document.getElementById("strat2Desc").textContent = strategy2.desc;
}
/* Start Game Management */

/* In-Game Management */
/* nextRound():
* Handles UI and logic for moving between rounds
*/
document.getElementById("nextRound").addEventListener("click", nextRound)
document.addEventListener("keydown", function (e) {
    if (document.getElementById("nextRound").style.display === 'block') {
        if (e.code === "Enter") {
            nextRound();
        }
    }
});
function nextRound() {
    if (currentRound <= rounds) {
        strategy1Choices.push(strategy1.makeChoice());
        strategy2Choices.push(strategy2.makeChoice());
        givePoints();
        printRound();
        currentRound += 1;
    } else {
        activateEndOfGameSummary();
        showResultOfStrategy();
    }
}

/* givePoints():
* Distributes points to strategies based on previous round choices
*/
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

/* updatePointDisplay():
* Updates display for distributed points
*/
function updatePointDisplay() {
    document.getElementById("Strat1ScoreUpdate").textContent = strategy1Points;
    document.getElementById("Strat2ScoreUpdate").textContent = strategy2Points;
}

/* printRound():
* Updates UI to reflect current and previous rounds
*/
function printRound() {
    populateChoiceHistoryTable();
    document.getElementById("roundNumDiv").style.display = 'block';
    document.getElementById("roundNumDisplay").style.display = 'inline-block';
    document.getElementById("roundNum").innerHTML = currentRound;
}

/* populateChoiceHistoryTable():
* Updates table to reflect the strategies' choices in previous rounds
*/
function populateChoiceHistoryTable() {
    document.getElementById("roundRow").insertCell(-1).innerHTML = String(currentRound);
    document.getElementById("strat2ChoicesRow").insertCell(-1).innerHTML = strategy2Choices[currentRound - 1];
    changeCellColor("strat2ChoicesRow", currentRound - 1, strategy2Choices[currentRound - 1]);
    document.getElementById("strat1ChoicesRow").insertCell(-1).innerHTML = strategy1Choices[currentRound - 1];
    changeCellColor("strat1ChoicesRow", currentRound - 1, strategy1Choices[currentRound - 1]);
}

/* changeCellColor():
* Updates table cell colors to reflect split/steal actions respectively
*/
function changeCellColor(name, number, index) {
    let tableCell = document.getElementById(name).getElementsByTagName("td");
    console.log(name +" " + tableCell[number]);
    if (index === "Steal") {
        tableCell[number].style.backgroundColor = "red";
    }
    if (index === "Split") {
        tableCell[number].style.backgroundColor = "green";
    }
}

/* activateEndOfGameSummary():
* Enables UI elements for reaching the end of game
*/
function activateEndOfGameSummary() {
    document.getElementById("endOfGame").style.display = 'block';
    document.getElementById("strategyDetails").style.display = 'block';
    document.getElementById("playAgain").style.display = 'block';
    document.getElementById("nextRound").style.display = 'none';
}

/* showResultOfStrategy():
* Displays result of game (win, lose, tie)
*/
function showResultOfStrategy(){
    document.getElementById("startResult").style.display = "block";
    document.getElementById("roundNumDiv").style.display = 'none';
    if (strategy1Points > strategy2Points) {
        document.getElementById("startResult").innerHTML = strategy1.name + " is the Winner!" + "<br/>" + strategy2.name + " is the Loser!";
    } else if (strategy1Points < strategy2Points ){
        document.getElementById("startResult").innerHTML = strategy2.name + " is the Winner!" + "<br/>" + strategy1.name + " is the Loser!";
    } else {
        document.getElementById("startResult").innerHTML = "Both strategies Tie!";
    }
}
/* END In-Game Management */

/* Play Again/Reset Management */
/* resetGame():
* Resets UI and fields
*/
document.getElementById("playAgain").addEventListener("click", resetGame)
function resetGame() {
    console.clear()
    resetFields();
    clearChoiceHistoryTable();
    resetDropdowns();
    deactivateRoundDisplay();
    resetStrategyInfo();
}

/* resetFields():
* Resets fields to original initializations
*/
function resetFields() {
    strategy1 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
    strategy1Choices = [];
    strategy1Points = 0;
    strategy2 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
    strategy2Choices = [];
    strategy2Points = 0;
    currentRound = 1;
    rounds = Math.floor(Math.random() * (20 - 10 + 1) + 10);
}

/* clearChoiceHistoryTable():
* Clears UI table of choices from previous game
*/
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

/* resetDropdowns():
* Resets dropdown menus to default state
*/
function resetDropdowns() {
    document.getElementById("strategyVsStrategy").style.display = 'block';
    document.getElementById("chooseStrat1").style.display = 'block';
    strategy1Dropdown.selectedIndex = 0;
    document.getElementById("chooseStrat2").style.display = 'block';
    strategy2Dropdown.selectedIndex = 0;
    document.getElementById("chooseRounds").style.display = 'block';
    roundDropdown.selectedIndex = 0;
}

/* deactivateRoundDisplay():
* Disables UI elements for in-game rounds
*/
function deactivateRoundDisplay() {
    document.getElementById("endOfGame").style.display = 'none';
    document.getElementById("nextRound").style.display = 'none';
    document.getElementById("playAgain").style.display = 'none';
    document.getElementById("startResult").style.display = "none";
    document.getElementById("stratChoiceHistoryTable").style.display = 'none';
    document.getElementById("roundNumDiv").style.display = 'none';
    document.getElementById("scoreTable").style.display = 'none';
}

/* resetStrategyInfo():
* Resets UI strategy descriptions to default random states
*/
function resetStrategyInfo() {
    document.getElementById("startGame").style.display = 'inline-block';
    document.getElementById("strat1Desc").textContent = "Strategy 1 will be chosen randomly."
    document.getElementById("opponent1Strategy").textContent = "";
    document.getElementById("strat2Desc").textContent = "Strategy 2 will be chosen randomly."
    document.getElementById("opponent2Strategy").textContent = "";
    document.getElementById("roundDesc").innerHTML = "Random";
}
/* END Play Again/Reset Management */