import {currentRound, rounds} from "../StrategyVsStrategy.js"

export class StrategyThresher {
    name="Thresher"
    desc="This opponent strategy, which is the work of Dr. Jared Bates, will cooperate until the last few rounds of the game."
    random = Math.floor(Math.random() * (6 - 3 + 1) + 3)

    makeChoice() {
        if (rounds - currentRound <= this.random) {
            return "Steal"
        } else {
            return "Split"
        }
    }
}