import {currentRound, playerChoices, opponentChoices} from "../Game.js"

export class OpponentPavlov {
    name = "Pavlov"
    desc = "This opponent strategy cooperates if it and yourself moved alike in the previous round and defects if you moved differently."

    makeChoice() {
        if (currentRound === 1) {
            return "Split"
        } else if (playerChoices[currentRound - 2] === opponentChoices[currentRound - 2]) {
            return "Split"
        } else {
            return "Steal"
        }
    }
}