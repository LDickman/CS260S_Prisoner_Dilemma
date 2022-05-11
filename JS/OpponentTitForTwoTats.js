import {currentRound, playerChoices} from "./consoleGame.js";

export class OpponentTitForTwoTats {
    name = "Tit for Two Tats"

    makeChoice() {
        if (playerChoices[currentRound - 2] === "Steal" && playerChoices[currentRound - 3] === "Steal") {
            return "Steal"
        } else {
            return "Split"
        }
    }
}