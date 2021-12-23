import { Axis } from "./Point2D";

export class Point3D {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    equals(point: Point3D): boolean {
        return this.x === point.x && this.y === point.y && this.z === point.z;
    }

    move(velocity: Point3D) {
        this.x += velocity.x;
        this.y += velocity.y;
        this.z += velocity.z;
    }

    rotateAroundZ() {
        const radians = Math.PI / 2;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const oldX = this.x;
        const oldY = this.y;
        
        this.x = Math.round(oldX * cos - oldY * sin);
        this.y = Math.round(oldY * cos + oldX * sin);
    }

    rotateAroundX() {
        const radians = Math.PI / 2;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const oldY = this.y;
        const oldZ = this.z;
        
        this.y = Math.round(oldY * cos - oldZ * sin);
        this.z = Math.round(oldZ * cos + oldY * sin);
    }

    rotateAroundY() {
        const radians = Math.PI / 2;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const oldX = this.x;
        const oldZ = this.z;

        this.x = Math.round(oldX * cos + oldZ * sin);
        this.z = Math.round(oldZ * cos - oldX * sin);
    }

    mirror(axis: Axis) {
        if (axis === Axis.X) {
            this.x = this.x > 0 ? -Math.abs(this.x) : Math.abs(this.x)
        } else if (axis === Axis.Y) {
            this.y = this.y > 0 ? -Math.abs(this.y) : Math.abs(this.y);
        } else {
            this.z = this.z > 0 ? -Math.abs(this.z) : Math.abs(this.z);
        }
    }

    toString(): string {
        return `${this.x},${this.y},${this.z}`;
    }
}
