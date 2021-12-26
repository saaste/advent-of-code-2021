import { Cube } from "./Cube";

export class CubeWithHoles {
    base: Cube;
    isLit: boolean;
    holes: CubeWithHoles[];

    constructor(base: Cube, isLit: boolean, holes: CubeWithHoles[] = []) {
        this.base = base;
        this.isLit = isLit;
        this.holes = holes;
    }

    intersect(b: Cube): CubeWithHoles | null {
        const base = this.base.intersect(b);

        if (!base)
            return null;

        const holes = this.holes.map((hole) => hole.intersect(b) as CubeWithHoles).filter(x => x);
        return new CubeWithHoles(base, this.isLit, holes);
    }

    volume(): number {
        let result = this.base.volume;
        for (const hole of this.holes) {
            result -= hole.volume();
        }
        return result;
    }
}
