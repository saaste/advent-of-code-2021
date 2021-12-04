import fs from 'fs';
import { isFunctionLike } from 'typescript';

export const readInput = (inputFile: string): string[] => {
    const file = fs.readFileSync(inputFile, 'utf8');
    return file.replace(/(\r\n|\n|\r)/gm, '\n').split('\n');
};

export const readInputAsNumbers = (inputFile: string): number[] => {
    return readInput(inputFile).map(v => parseInt(v, 10))
}

export const readInputAsString = (inputFile: string): string => {
    return fs.readFileSync(inputFile, 'utf8');
}
