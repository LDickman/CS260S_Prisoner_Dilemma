import { currentRound, playerChoices } from './consoleGame.js';
export class OpponentTitForTatDefectFirst {
    name = "Tit for Tat - Defect First";

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
}