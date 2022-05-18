import {currentRound, playerChoices} from "./Game.js";

export class OpponentGrim {
    name = "Grim";
    desc = "This opponent strategy cooperates with you until you have defected once, and will then defect for the rest of the game."

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
