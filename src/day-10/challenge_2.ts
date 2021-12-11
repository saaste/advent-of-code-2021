import { readInput } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-10.txt`;

const solve = () => {
    const input = readInput(inputFile);

    const openChars = ["(", "[", "{", "<"];
    const closedChars = [")", "]", "}", ">"];

    let completionScores: number[] = [];
    for (const line of input) {
        const stack: string[] = [];
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
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) {
            let filler = "";
            
            let fillerPoints = new Map([
                [")", 1],
                ["]", 2],
                ["}", 3],
                [">", 4]
            ])
            let fillerScore = 0;

            while (stack.length > 0) {
                const lastChar = stack.pop() || "";
                const lastCharIndex = openChars.indexOf(lastChar);
                const opposite = closedChars[lastCharIndex];
                filler += opposite;
                fillerScore = fillerScore * 5 + (fillerPoints.get(opposite) || 0)
            }
            completionScores.push(fillerScore)
        }
    }

    completionScores.sort((a, b) => b - a)
    const midIndex = completionScores.length - 1 >>> 1;
    return completionScores[midIndex];
}

export default solve;
