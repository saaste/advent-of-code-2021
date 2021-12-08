import { Digit } from "./Digit";

export class Display {
    zeroNew: Digit;
    oneNew: Digit;
    twoNew: Digit;
    threeNew: Digit;
    fourNew: Digit;
    fiveNew: Digit;
    sixNew: Digit;
    sevenNew: Digit;
    eightNew: Digit;
    nineNew: Digit;

    constructor(patterns: string[][]) {
        let patternsLeft = patterns;
        
        this.oneNew = new Digit(patterns.filter((pattern) => pattern.length === 2)[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.oneNew.getPattern());

        this.fourNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 4)[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.fourNew.getPattern());

        this.sevenNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 3)[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.sevenNew.getPattern());

        this.eightNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 7)[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.eightNew.getPattern());

        this.nineNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 6 && this.containsNFrom(this.fourNew.getPattern(), pattern, 4))[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.nineNew.getPattern());

        this.zeroNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 6 && this.containsNFrom(this.sevenNew.getPattern(), pattern, 3))[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.zeroNew.getPattern());

        this.sixNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 6)[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.sixNew.getPattern());

        this.threeNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 5 && this.containsNFrom(this.oneNew.getPattern(), pattern))[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.threeNew.getPattern());

        this.fiveNew = new Digit(patternsLeft.filter((pattern) => pattern.length === 5 && this.containsNFrom(this.fourNew.getPattern(), pattern, 3))[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.fiveNew.getPattern());

        this.twoNew = new Digit(patternsLeft[0]);
        patternsLeft = patternsLeft.filter((pattern) => pattern !== this.twoNew.getPattern());
    }

    getOutputNumber(outputDigits: string[][]): number {
        let number: string = "";
        for (const digit of outputDigits) {
            if (this.oneNew.matches(digit)) {
                number += "1"
            } else if (this.twoNew.matches(digit)) {
                number += "2"
            } else if (this.threeNew.matches(digit)) {
                number += "3"
            } else if (this.fourNew.matches(digit)) {
                number += "4"
            } else if (this.fiveNew.matches(digit)) {
                number += "5"
            } else if (this.sixNew.matches(digit)) {
                number += "6"
            } else if (this.sevenNew.matches(digit)) {
                number += "7"
            } else if (this.eightNew.matches(digit)) {
                number += "8"
            } else if (this.nineNew.matches(digit)) {
                number += "9"
            } else if (this.zeroNew.matches(digit)) {
                number += "0"
            }
        }
        return parseInt(number, 10);;
    }

    private containsNFrom(source: string[], target: string[], n: number = source.length): boolean {
        let matches = 0;
        for (const char of source) {
            if (target.includes(char)) {
                matches++;
            }
        }
        return matches === n;
    }
}