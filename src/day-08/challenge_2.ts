import { readInput } from "../helpers/input";
import { Display } from "./Display";

const inputFile = `${__dirname}/../../inputs/day-08.txt`;

const solve = () => {
    const inputRows = readInput(inputFile);
    let sum = 0;
    for (const inputRow of inputRows) {
        const [ rowPattern, rowOutput ] = inputRow.split(' | ');
        const patterns = rowPattern.split(' ');
        const outputDigits = rowOutput.split(' ').map((output) => output.split("").sort());
        
        const display = new Display(patterns.map((pattern) => pattern.split("")));
        sum += display.getOutputNumber(outputDigits);
    }
    return sum;
}

export default solve;
