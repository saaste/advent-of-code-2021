export class Grid {
    private points: number[][];

    constructor(input: string[]) {
        const points: number[][] = [];
        for (const coordinate of input) {
            if (coordinate.length === 0) break;
            const [x, y] = coordinate.split(',').map((value) => parseInt(value, 10));
            
            if (points[y] === undefined) points[y] = [];
            if (points[y][x] === undefined) points[y][x] = 0;

            points[y][x]++;
        }
        this.points = points;

        const height = this.points.length;
        const width = Math.max(...this.points.map((row) => row.length).filter((number) => !isNaN(number)));
       
        // Fill with zeroes
        for (let y = 0; y < height; y++) {
            if (this.points[y] === undefined) points[y] = [];
            for (let x = 0; x < width; x++) {
                if (!this.getPointValue(x, y)) {
                    this.points[y][x] = 0;
                }
            }
        }
    }

    foldUpFrom(row: number) {
        const bottomPart = this.points.splice(row + 1);
        this.points.pop();
        bottomPart.reverse();

        const points: number[][] = [];
        for (let y = 0; y < bottomPart.length; y++) {
            points[y] = [];
            for (let x = 0; x < bottomPart[y].length; x++) {
                const bottomValue = this.getPointValue(x, y, bottomPart);
                const existingValue = this.getPointValue(x, y);
                points[y][x] = bottomValue + existingValue;
            }
        }
        this.points = points;
    }

    foldLeftFrom(col: number) {
        const leftPart = []
        const rightPart = [];
        for (let i = 0; i < this.points.length; i++) {
            const leftSide = this.points[i];
            const rightSide = leftSide.splice(col + 1);
            leftSide.pop();
            rightSide.reverse();

            leftPart[i] = leftSide;
            rightPart[i] = rightSide;
        }

        const points: number[][] = [];
        for (let y = 0; y < rightPart.length; y++) {
            points[y] = [];
            for (let x = 0; x < rightPart[y].length; x++) {
                const rightValue = this.getPointValue(x, y, rightPart);
                const existingValue = this.getPointValue(x, y, leftPart);
                
                points[y][x] = rightValue + existingValue;
            }
        }
        this.points = points;
    }

    dotsVisible(): number {
        let visible = 0;
        for (const row of this.points) {
            for (const value of row) {
                if (value > 0) visible++;
            }
        }
        return visible;
    }

    toString(): string {
        let output = "";
        for (const row of this.points) {
            let rowString = "";
            for (const value of row) {
                if (value === 0) {
                    rowString += ".";
                } else {
                    rowString += "#"
                }
            }
            output += `${rowString}\n`;
        }

        return output;
    }

    private getPointValue(x:number, y:number, grid: number[][] = this.points): number {
        try {
            return grid[y][x] || 0;
        } catch {
            return 0;
        }
    }
}