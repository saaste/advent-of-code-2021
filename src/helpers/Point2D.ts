export enum MirrorDirection {
    Horizontally = 1,
    Vertically = 2
}

export enum Axis {
    X = 1,
    Y = 2,
    Z = 3
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

    rotateCW() {
        const radians = Math.PI / 2;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const oldX = this.x;
        const oldY = this.y;
            
        this.x = Math.round(cos * oldX + sin * oldY)
        this.y = Math.round(cos * oldY - sin * oldX);
    }
    
    toString(): string {
        return `${this.x},${this.y}`;
    }
}
