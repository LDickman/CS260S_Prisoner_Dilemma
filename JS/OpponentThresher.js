import {currentRound} from "./consoleGame.js";
import { rounds } from "./consoleGame.js";

export class OpponentThresher {
    name="Thresher"
    desc=""

    makeChoice() {
        if (rounds - currentRound <= 4) {
            return "Steal";
        } else {
            return "Split";
        }
    }
}