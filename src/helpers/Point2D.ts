export class Point2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(point: Point2D): boolean {
        return this.x === point.x && this.y === point.y;
    }

    toString(): string {
        return `${this.x},${this.y}`;
    }
}
