import {currentRound, playerChoices} from "./Game.js";

export class OpponentImperfectTitForTat {
    name = "Imperfect Tit for Tat"
    desc = "Imitates opponent's last move with high (but less than one) probability."

    makeChoice() {
        let p = Math.floor((Math.random() * (4 - 1 + 1) + 1));
        let pChoice = playerChoices[currentRound - 2];
        if (currentRound === 1) {
            return "Split";
        }
        else if (p === 1 || p === 2 || p === 3) {
            if (pChoice === "Split") {
                return "Split"
            } else {
                return "Steal"
            }
        } else {
            if (pChoice === "Split") {
                return "Steal"
            } else {
                return "Split"
            }
        }
    }
}