import { Point2D } from "../helpers/Point2D";

export class Pipe {
    start: Point2D;
    end: Point2D;

    constructor(start: Point2D, end: Point2D) {
        this.start = start;
        this.end = end;
    }

    isHorizontal(): boolean {
        return this.start.x === this.end.x;
    }

    isVertical(): boolean {
        return this.start.y === this.end.y;
    }

    slope(): number {
        return (this.end.y - this.start.y) / (this.end.x - this.start.x);
    }

    getAllPoints(): Point2D[] {
        const points: Point2D[] = [];
        if (this.isHorizontal()) {
            const startY = Math.min(this.start.y, this.end.y);
            const endY = Math.max(this.start.y, this.end.y);
            for (let y = startY; y <= endY; y++) {
                points.push(new Point2D(this.start.x, y));
            }
        } else if (this.isVertical()) {
            const startX = Math.min(this.start.x, this.end.x);
            const endX = Math.max(this.start.x, this.end.x);
            for (let x = startX; x <= endX; x++) {
                points.push(new Point2D(x, this.start.y));
            }
        } else {
            const slope = this.slope();
            const startX = Math.min(this.start.x, this.end.x);
            const endX = Math.max(this.start.x, this.end.x);
            let startY: number;
            let endY: number;

            if (slope === 1) {
                startY = Math.min(this.start.y, this.end.y);
                endY = Math.max(this.start.y, this.end.y);
            } else {
                startY = Math.max(this.start.y, this.end.y)
                endY = Math.min(this.start.y, this.end.y)
            }
            const length = endX - startX;
            for (let i = 0; i <= length; i++) {
                if (slope === 1) {
                    points.push(new Point2D(startX + i, startY + i))
                } else {
                    points.push(new Point2D(startX + i, startY - i))
                }
            }
        }
        return points;
    }
}
