import {currentRound, playerChoices} from "./consoleGame.js";

export class OpponentTitForTwoTats {
    name = "Tit for Two Tats"
    desc = "Your opponent is very forgiving that will only defects only when the you have defected twice in a row."
    makeChoice() {
        if (playerChoices[currentRound - 2] === "Steal" && playerChoices[currentRound - 3] === "Steal") {
            return "Steal"
        } else {
            return "Split"
        }
    }
}