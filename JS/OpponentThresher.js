import {currentRound} from "./consoleGame.js";
import { rounds } from "./consoleGame.js";

export class OpponentThresher {
    name="Thresher"
    desc="This opponent strategy, which is the work of Dr. Jared Bates, will cooperate with you until the last few rounds of the game."

    makeChoice() {
        if (rounds - currentRound <= 4) {
            return "Steal";
        } else {
            return "Split";
        }
    }
}