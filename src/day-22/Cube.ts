export class Cube {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
    volume: number;

    constructor(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number) {
        this.minX = minX;
        this.maxX = maxX
        this.minY = minY;
        this.maxY = maxY;
        this.minZ = minZ;
        this.maxZ = maxZ;

        this.volume = (maxX - minX + 1) * (maxY - minY + 1) * (maxZ - minZ + 1);
    }

    intersect(b: Cube): Cube | null {
        const minX = Math.max(this.minX, b.minX);
        const maxX = Math.min(this.maxX, b.maxX);
        const minY = Math.max(this.minY, b.minY);
        const maxY = Math.min(this.maxY, b.maxY);
        const minZ = Math.max(this.minZ, b.minZ);
        const maxZ = Math.min(this.maxZ, b.maxZ);

        if (minX > maxX || minY > maxY || minZ > maxZ)
            return null;

        return new Cube(minX, maxX, minY, maxY, minZ, maxZ);
    }
}
