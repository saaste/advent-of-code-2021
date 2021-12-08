export class Digit {
    pattern: string[];
    sorted: string[];
    string: string;

    constructor(pattern: string[]) {
        this.pattern = pattern;
        this.sorted = pattern;
        
        this.sorted.sort();
        this.string = this.sorted.join("");
    }

    matches(digits: string[]): boolean {
        const sortedDigits = [...digits];
        sortedDigits.sort();
        return sortedDigits.join("") === this.string;
    }

    getPattern(): string[] {
        return this.pattern;
    }
}