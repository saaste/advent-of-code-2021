export interface Instruction {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
    isOn: boolean;
}

export class Grid3D {
    private grid: Map<string, boolean>;

    constructor() {
        this.grid = new Map();
    }

    execute(instruction: Instruction): void {
        for (let x = instruction.minX; x <= instruction.maxX; x++) {
            for (let y = instruction.minY; y <= instruction.maxY; y++) {
                for (let z = instruction.minZ; z <= instruction.maxZ; z++) {
                    const key = `${x},${y},${z}`;
                    const isAlreadyOn = this.grid.get(key) || false;

                    if (isAlreadyOn && !instruction.isOn) {
                        this.grid.delete(key);
                    }

                    if (instruction.isOn) {
                        this.grid.set(key, instruction.isOn);
                    }


                }
            }
        }
    }

    cubesOn(): number {
        return this.grid.size;
    }
}
