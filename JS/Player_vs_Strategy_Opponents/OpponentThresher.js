import {currentRound} from "../Game.js"
import { rounds } from "../Game.js"

export class OpponentThresher {
    name="Thresher"
    desc="This opponent strategy, which is the work of Dr. Jared Bates, will cooperate with you until the last few rounds of the game."
    random = Math.floor(Math.random() * (6 - 3 + 1) + 3)

    makeChoice() {
        if (rounds - currentRound <= this.random) {
            return "Steal"
        } else {
            return "Split"
        }
    }
}