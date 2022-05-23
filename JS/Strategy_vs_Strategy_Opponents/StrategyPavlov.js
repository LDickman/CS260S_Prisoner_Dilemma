import {currentRound, strategy1Choices, strategy2Choices} from "../StrategyVsStrategy.js";

export class StrategyPavlov {
    name = "Pavlov (Win-Stay, Lose-Shift)"
    desc = "This opponent strategy cooperates if it and yourself moved alike in the previous round and defects if you moved differently."

    makeChoice() {
        if (currentRound === 1) {
            return "Split";
        } else if (strategy1Choices[currentRound - 2] === strategy2Choices[currentRound - 2]) {
            return "Split";
        } else {
            return "Steal";
        }
    }
}