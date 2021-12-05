import { readInput } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-02.txt`;

export const solve = () => {
    const instructions = readInput(inputFile);
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (const instruction of instructions) {
        const [direction, rawSteps] = instruction.split(" ");
        const steps = parseInt(rawSteps);
        switch (direction) {
            case "forward":
                horizontal += steps;
                depth += aim * steps;
                break;
            case "down":
                aim += steps;
                break;
            case "up":
                aim -= steps;
                break;
        }
    }
    return horizontal * depth;
}

export default solve;
