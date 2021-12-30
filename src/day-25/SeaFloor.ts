export class SeaFloor {
    floor: string[][]; // state of all position
    eastFacing: Set<string>; // xy coordinates for east-facing
    southFacing: Set<string> // xy coordinates for south-facing

    constructor(input: string[]) {
        this.floor = [];
        this.eastFacing = new Set();
        this.southFacing = new Set();

        for (let y = 0; y < input.length; y++) {
            this.floor[y] = [];
            for (let x = 0; x < input[y].length; x++) {
                const char = input[y][x];
                if (char === ".") {
                    this.floor[y][x] = ".";
                } else if (char === ">") {
                    this.floor[y][x] = ">";
                    this.eastFacing.add(this.getKey(x, y))
                } else {
                    this.floor[y][x] = "v";
                    this.southFacing.add(this.getKey(x, y))
                }
            }
        }
    }

    move(): number {
        // Move east
        const eastMoving = this.findCucumbersAllowedToMove(true);
        for (const key of eastMoving) {
            this.moveCucumber(key, true);
        }

        // Move south
        const southMoving = this.findCucumbersAllowedToMove(false);
        for (const key of southMoving) {
            this.moveCucumber(key, false);
        }

        return eastMoving.length + southMoving.length;
    }

    findCucumbersAllowedToMove(useEast: boolean): string[] {
        const allowedToMove: string[] = [];
        if (useEast) {
            for (const key of this.eastFacing.values()) {
                const [x, y] = this.getCoords(key);
                if (this.isEmpty(this.getNextX(x), y)) {
                    allowedToMove.push(key);
                }
            }
        } else {
            for (const key of this.southFacing.values()) {
                const [x, y] = this.getCoords(key);
                if (this.isEmpty(x, this.getNextY(y))) {
                    allowedToMove.push(key);
                }
            }
        }
        return allowedToMove;
    }

    moveCucumber(key: string, moveToEast: boolean): void {
        const [x, y] = this.getCoords(key);

        // Move on floor map
        this.floor[y][x] = ".";
        if (moveToEast) {
            const newX = this.getNextX(x);
            this.floor[y][newX] = ">"
            this.eastFacing.delete(key);
            this.eastFacing.add(this.getKey(newX, y))
        } else {
            const newY = this.getNextY(y);
            this.floor[newY][x] = "v"
            this.southFacing.delete(key);
            this.southFacing.add(this.getKey(x, newY))
        }

    }

    printFloor(): void {
        for (const row of this.floor) {
            console.log(row.join(""));
        }
        console.log();
    }

    private getKey(x: number, y: number): string {
        return `${x},${y}`;
    }

    private getCoords(key: string): [number, number] {
        const [x, y] = key.split(",").map((s) => parseInt(s, 10));
        return [x, y];
    }

    private isEmpty(x: number, y: number): boolean {
        return this.floor[y][x] === "."
    }

    private getNextX(x: number): number {
        if (x + 1 === this.floor[0].length)
            return 0;
        return x + 1;
    }

    private getNextY(y: number): number {
        if (y + 1 === this.floor.length)
            return 0;
        return y + 1;
    }
}
