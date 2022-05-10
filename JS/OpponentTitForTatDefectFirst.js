import { currentRound, playerChoices } from './consoleGame.js';
export class OpponentTitForTatDefectFirst {
    name

    makeChoice() {
        if (currentRound === 1) {
            return "Steal";
        } else {
            let pChoice = playerChoices[currentRound - 2];
            if (pChoice === "Split") {
                return "Split"
            } else {
                return "Steal"
            }
        }
    }

    constructor(name) {
        this.name = name;
    }
}