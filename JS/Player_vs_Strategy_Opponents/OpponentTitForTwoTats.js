import {currentRound, playerChoices} from "../Game.js"

export class OpponentTitForTwoTats {
    name = "Tit for Two Tats"
    desc = "This opponent strategy cooperates with you unless defected against twice in a row."

    makeChoice() {
        if (playerChoices[currentRound - 2] === "Steal" && playerChoices[currentRound - 3] === "Steal") {
            return "Steal"
        } else {
            return "Split"
        }
    }
}