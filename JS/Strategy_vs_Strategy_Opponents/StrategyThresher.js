import {currentRound, rounds} from "../StrategyVsStrategy.js";

export class StrategyThresher {
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