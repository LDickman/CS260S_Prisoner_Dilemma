import {currentRound, playerChoices, opponentChoices} from "./consoleGame.js";

export class OpponentPavlov {
    name

    constructor(name) {
        this.name = name;
    }

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