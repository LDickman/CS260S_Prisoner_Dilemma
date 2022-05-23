import { currentRound, playerChoices } from '../Game.js';
export class OpponentTitForTatDefectFirst {
    name = "Tit for Tat Defect";
    desc = "This opponent strategy defects on the first round and imitates your previous move thereafter.";

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