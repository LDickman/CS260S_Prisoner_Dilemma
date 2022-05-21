import { currentRound, playerChoices } from '../Game.js';
export class OpponentTitForTatCoopFirst {
    name = "Tit for Tat - Cooperate First";
    desc = "This opponent strategy cooperates on the first round and imitates your previous move thereafter.";

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