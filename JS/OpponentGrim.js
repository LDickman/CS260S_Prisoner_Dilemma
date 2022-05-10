import {currentRound, playerChoices} from "./consoleGame.js";

export class OpponentGrim {
    name

    constructor(name) {
        this.name = name;
    }

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
