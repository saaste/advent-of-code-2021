import { Node } from "./Node";

export class Grid {
    private grid: Node[][];
    private flashes: number;

    constructor(input: string[]) {
        this.grid = [];
        this.flashes = 0;
        for (let y = 0; y < input.length - 1; y++) {
            this.grid[y] = [];
            for (let x = 0; x < input[y].length; x++) {
                this.grid[y][x] = new Node(parseInt(input[y][x], 10))
            }
        }
    }

    increaseAll(): void {
        for (const row of this.grid) {
            for (const node of row) {
                node.increaseEnergy();
            }
        }
    }

    flash(): void {
        while (this.hasFlashableNodes()) {
            for (let y = 0; y < this.grid.length; y++) {
                for (let x = 0; x < this.grid[y].length; x++) {
                    const node = this.grid[y][x];
                    if (node.getEnergy() > 9 && !node.getFlashed()) {
                        node.flash();
                        this.findTopLeft(y, x)?.increaseEnergy();
                        this.findTop(y, x)?.increaseEnergy();
                        this.findTopRight(y, x)?.increaseEnergy();
                        this.findLeft(y, x)?.increaseEnergy();
                        this.findRight(y, x)?.increaseEnergy();
                        this.findBottomLeft(y, x)?.increaseEnergy();
                        this.findBottom(y, x)?.increaseEnergy();
                        this.findBottomRight(y, x)?.increaseEnergy();
                        this.flashes++;
                    }
                }
            }
        }
    }

    resetNodes(): void {
        for (const row of this.grid) {
            for (const node of row) {
                node.resetNode();
            }
        }
    }

    getFlashes(): number {
        return this.flashes;
    }

    isFullOfZeroes(): boolean {
        for (const row of this.grid) {
            for (const node of row) {
                if (node.getEnergy() > 0) return false;
            }
        }
        return true;
    }

    print(): void {
        for (const row of this.grid) {
            const rowEnergies = row.map((node) => node.getEnergy().toString()).join("");
            console.log(rowEnergies);
        }
    }

    private hasFlashableNodes(): boolean {
        for (const row of this.grid) {
            for (const node of row) {
                if (!node.getFlashed() && node.getEnergy() > 9) {
                    return true;
                }
            }
        }
        return false;
    }

    private findTopLeft(y: number, x: number): Node | undefined {
        try {
            return this.grid[y - 1][x - 1];
        } catch {
            return undefined;
        }
    }

    private findTop(y: number, x: number): Node | undefined {
        try {
            return this.grid[y - 1][x];
        } catch {
            return undefined;
        }
    }

    private findTopRight(y: number, x: number): Node | undefined {
        try {
            return this.grid[y - 1][x + 1];
        } catch {
            return undefined;
        }
    }

    private findLeft(y: number, x: number): Node | undefined {
        try {
            return this.grid[y][x - 1];
        } catch {
            return undefined;
        }
    }

    private findRight(y: number, x: number): Node | undefined {
        try {
            return this.grid[y][x + 1];
        } catch {
            return undefined;
        }
    }

    private findBottomLeft(y: number, x: number): Node | undefined {
        try {
            return this.grid[y + 1][x - 1];
        } catch {
            return undefined;
        }
    }

    private findBottom(y: number, x: number): Node | undefined {
        try {
            return this.grid[y + 1][x];
        } catch {
            return undefined;
        }
    }

    private findBottomRight(y: number, x: number): Node | undefined {
        try {
            return this.grid[y + 1][x + 1];
        } catch {
            return undefined;
        }
    }
}
