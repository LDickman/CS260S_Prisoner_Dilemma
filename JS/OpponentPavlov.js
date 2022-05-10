import {currentRound, playerChoices, opponentChoices} from "./consoleGame.js";

export class OpponentPavlov {
    name = "Pavlov (Win-Stay, Lose-Shift)"

    makeChoice() {
        if (currentRound === 1) {
            return "Split";
        } else if (playerChoices[currentRound - 2] === opponentChoices[currentRound - 2]) {
            return "Split";
        } else {
            return "Steal";
        }
    }
}