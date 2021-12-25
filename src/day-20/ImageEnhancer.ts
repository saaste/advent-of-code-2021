export class ImageEnhancer {
    private algorithm: string;
    private inputImage: string[];
    private output: string[];

    constructor(algorithm: string, inputImage: string[]) {
        this.algorithm = algorithm;
        this.inputImage = [];
        this.output = [];

        const extraBorderWidth = 5;
        const filler = inputImage[0][0];
        inputImage = inputImage.filter((s) => s.length > 0);

        for (let i = 0; i < extraBorderWidth; i++) {
            this.inputImage.push(filler.repeat(inputImage[0].length + extraBorderWidth * 2));
        }

        for (const row of inputImage) {
            this.inputImage.push(`${filler.repeat(extraBorderWidth)}${row}${filler.repeat(extraBorderWidth)}`);
        }

        for (let i = 0; i < extraBorderWidth; i++) {
            this.inputImage.push(filler.repeat(inputImage[0].length + extraBorderWidth * 2));
        }
    }

    enhance(): string[] {
        this.output = [];
        for (let y = 1; y < this.inputImage.length - 1; y++) {
            let row = "";
            for (let x = 1; x < this.inputImage[y].length - 1; x++) {
                let topRow = this.inputImage[y - 1].slice(x - 1, x + 2);
                let middleRow = this.inputImage[y].slice(x - 1, x + 2);
                let bottomRow = this.inputImage[y + 1].slice(x - 1, x + 2);

                const binaryValue = [...topRow, ...middleRow, ...bottomRow]
                    .join("")
                    .replace(/#/g, "1")
                    .replace(/\./g, "0");
                const decimalValue = parseInt(binaryValue, 2);
                row += this.getOutputPixel(decimalValue);
            }
            this.output.push(row);
        }
        return this.output;
    }

    private getOutputPixel(decimalValue: number): string {
        return this.algorithm[decimalValue];
    }

    getLitPixelCount(): number {
        let count = 0;
        for (const row of this.output) {
            const newRow = row.replace(/\./g, "");
            count += newRow.length;
        }
        return count;
    }
}
