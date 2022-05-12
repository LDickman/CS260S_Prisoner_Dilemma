import {currentRound, playerChoices} from "./consoleGame.js";

export class OpponentGrim {
    name = "Grim";
    desc = "Your opponent will first cooperate with you, but as soon as you defect, your opponent will defect for the remainder of the iterated game"

    makeChoice() {
        if (currentRound === 1) {
            return "Split";
        } else if (playerChoices.includes("Steal")) {
            return "Steal";
        } else {
            return "Split";
        }
    }
}
