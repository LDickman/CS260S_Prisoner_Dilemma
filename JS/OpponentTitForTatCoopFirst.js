import { currentRound, playerChoices } from './consoleGame.js';
export class OpponentTitForTatCoopFirst {
    name = "Tit for Tat - Cooperate First";
    desc = "Your opponent will first cooperate you, but depending on if you betray them then they will betray you. If you cooperate thn your opponent will cooperate with you";

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