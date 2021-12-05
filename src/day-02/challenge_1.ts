import { readInput } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-02.txt`;

const solve = () => {
    const instructions = readInput(inputFile);
    let horizontal = 0;
    let depth = 0;
    for (const instruction of instructions) {
        const [direction, steps] = instruction.split(" ");
        switch (direction) {
            case "forward":
                horizontal += parseInt(steps);
                break;
            case "down":
                depth += parseInt(steps);
                break;
            case "up":
                depth -= parseInt(steps);
                break;
        }
    }
    return horizontal * depth;
}

export default solve;
