import { readInput } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-10.txt`;

const solve = () => {
    const input = readInput(inputFile);

    const openChars = ["(", "[", "{", "<"];
    const closedChars = [")", "]", "}", ">"];
    const scores = new Map([
        [")", 3],
        ["]", 57],
        ["}", 1197],
        [">", 25137]
    ])
    const stack: string[] = [];

    let errorScore = 0;
    for (const line of input) {
        let isValid = true;
        for (const char of line) {
            if (openChars.includes(char)) {
                stack.push(char)
            } else {
                const charIndex = closedChars.indexOf(char);
                const opposite = openChars[charIndex];
                if (stack[stack.length -1] === opposite) {
                    stack.pop();
                } else {
                    errorScore += scores.get(char) || 0;
                    isValid = false;
                    break;
                }
            }
        }
    }

    return errorScore;
}

export default solve;
