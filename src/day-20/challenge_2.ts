import { readInput } from "../helpers/input";
import { ImageEnhancer } from "./ImageEnhancer";

const inputFile = `${__dirname}/../../inputs/day-20.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const algorithm = input[0];
    let inputImage = input.splice(2, input.length);
    let litPixelCount = 0;

    for (let i = 0; i < 50; i++) {
        const enhancer = new ImageEnhancer(algorithm, inputImage);
        inputImage = enhancer.enhance();
        litPixelCount = enhancer.getLitPixelCount();
    }

    return litPixelCount;
}

export default solve;
