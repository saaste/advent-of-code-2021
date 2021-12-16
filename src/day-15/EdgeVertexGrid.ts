import { EdgeVertex } from "./Graph";

export class EdgeVertexGrid {
    private grid: EdgeVertex[][] = [];
    private size: number;

    constructor(input: string[]) {
        for (let y = 0; y < input.length; y++) {
            this.grid[y] = [];
            for (let x = 0; x < input[y].length; x++) {
                this.grid[y][x] = new EdgeVertex(x, y, parseInt(input[y][x], 10));
            }
        }
        this.size = input.length;
    }

    getSize(): number {
        return this.size;
    }

    getVertex(x: number, y: number): EdgeVertex {
        return this.grid[y][x];
    }

    findChildren(x: number, y: number): EdgeVertex[] {
        const neighbors: EdgeVertex[] = [];
        
        // Left
        if (x > 0) {
            const childNode = this.grid[y][x-1];
            // if (!usedNodes.has(childNode.name))
                neighbors.push();
        }

        // Top
        if (y > 0) {
            const childNode = this.grid[y - 1][x];
            // if (!usedNodes.has(childNode.name))
                neighbors.push(childNode);
        }

        // Right
        if (x < this.grid[0].length - 1) {
            const childNode = this.grid[y][x + 1];
            // if (!usedNodes.has(childNode.name))
                neighbors.push(childNode);
        }

        // Bottom
        if (y < this.grid.length - 1) {
            const childNode = this.grid[y + 1][x];
            // if (!usedNodes.has(childNode.name))
                neighbors.push(childNode);
        }

        return neighbors;
    }


}