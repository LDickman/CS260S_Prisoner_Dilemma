/* Opponent Strategy Imports */
import { OpponentAlwaysSplit } from "./OpponentAlwaysSplits.js"
import { OpponentAlwaysSteal } from "./OpponentAlwaysSteals.js"
/* Opponent Strategy Imports */

let alwaysSplit = new OpponentAlwaysSplit();
let alwaysSteal = new OpponentAlwaysSteal();

let possibleStrategies = [alwaysSplit, alwaysSteal];

let strategy1 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
let strategy1Choices = []
let strategy1Points = 0;
let strategy2 = possibleStrategies[Math.floor(Math.random() * possibleStrategies.length)];
let strategy2Choices = []
let strategy2Points = 0;

let currentRound = 1;
let rounds = 10;

document.getElementById("nextRound").addEventListener("click", nextRound)

function nextRound() {
    console.clear();
    givePoints();
    console.log("Strat 1: " + strategy1.name + " Points: " + strategy1Points);
    console.log("Strat 2: " + strategy2.name + " Points: " + strategy2Points);
    if (currentRound <= rounds) {
        strategy1Choices.push(strategy1.makeChoice());
        strategy2Choices.push(strategy2.makeChoice());
        printRound();
        currentRound += 1;
    } else {
        console.log("Game Over");
        document.getElementById("nextRound").style.display='none';
    }
}

function printRound() {
    console.log("Round " + currentRound);
    console.log("Strategy 1 did: " + strategy1Choices[currentRound - 1]);
    console.log("Strategy 2 did: " + strategy2Choices[currentRound - 1]);
}

function givePoints() {
    if (currentRound > 1) {
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
    }
}