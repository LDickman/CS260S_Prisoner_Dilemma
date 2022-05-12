import { currentRound, playerChoices } from './consoleGame.js';
export class OpponentTitForTatDefectFirst {
    name = "Tit for Tat - Defect First";
    desc = "Your opponent will first betray you, but depending on if you betray them then they will betray you. If you cooperate thn your opponent will cooperate with you";

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