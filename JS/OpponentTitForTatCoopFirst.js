import { currentRound, playerChoices } from './consoleGame.js';
export class OpponentTitForTatCoopFirst {
    name = "Tit for Tat - Cooperate First";

    makeChoice() {
        if (currentRound === 1) {
            return "Split";
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