import { EdgeNode, EdgeVertex } from "./Graph";

export class VertexGrid {
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

    findChildrenNodes(x: number, y: number): EdgeNode[] {
        const neighbors: EdgeNode[] = [];
        
        // Left
        if (x > 0) {
            neighbors.push(new EdgeNode(x - 1, y, this.grid[y][x - 1].weight));
        }

        // Top
        if (y > 0) {
            neighbors.push(new EdgeNode(x, y - 1, this.grid[y - 1][x].weight));
        }

        // Right
        if (x < this.grid[0].length - 1) {
            neighbors.push(new EdgeNode(x + 1, y, this.grid[y][x + 1].weight));
        }

        // Bottom
        if (y < this.grid.length - 1) {
            neighbors.push(new EdgeNode(x, y + 1, this.grid[y + 1][x].weight));
        }

        return neighbors;
    }


}