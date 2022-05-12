import {currentRound, playerChoices, opponentChoices} from "./consoleGame.js";

export class OpponentPavlov {
    name = "Pavlov (Win-Stay, Lose-Shift)"
    desc = "Your opponent will start off cooperating.  If the you both cooperates, then your opponent will keeps doing whatever it is doing. If the you defect, then your opponent will switches its behavior."
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