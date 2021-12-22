export enum MirrorDirection {
    Horizontally = 1,
    Vertically = 2
}
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

    move(velocity: Point2D) {
        this.x += velocity.x;
        this.y += velocity.y;
    }

    mirror(direction: MirrorDirection) {
        if (direction === MirrorDirection.Horizontally) {
            this.x = this.x > 0 ? -Math.abs(this.x) : Math.abs(this.x)
        } else {
            this.y = this.y > 0 ? -Math.abs(this.y) : Math.abs(this.y);
        }
    }

    toString(): string {
        return `${this.x},${this.y}`;
    }
}
