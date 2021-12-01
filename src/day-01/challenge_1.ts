import { readInputAsNumbers } from "../helpers/input";

const inputFile = `${__dirname}/input.txt`;

const solve = () => {
    const input = readInputAsNumbers(inputFile);
    let increases = 0;
    input.map((value, index) => {
        if (index > 0 && value > input[index-1]) increases++;
    });
    return increases;
}

export default solve;