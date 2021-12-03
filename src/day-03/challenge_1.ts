import { readInput } from "../helpers/input";
import { Bit, countBits } from "./utils";

const inputFile = `${__dirname}/input.txt`;



const solve = () => {
    const report = readInput(inputFile);
    const bits: Bit[] = countBits(report);

    const gammaRate = parseInt(bits.map((bit) => bit.ones > bit.zeros ? "1" : "0").join(""), 2);
    const epsilonRate = parseInt(bits.map((bit) => bit.ones < bit.zeros ? "1" : "0").join(""), 2);
    return gammaRate * epsilonRate;
}

export default solve;