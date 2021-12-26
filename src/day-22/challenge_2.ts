import { readInput } from "../helpers/input";
import { Cube } from "./Cube";
import { CubeWithHoles } from "./CubeWithHoles";
import { Instruction } from "./Grid3D";

const inputFile = `${__dirname}/../../inputs/day-22.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const instructionRegExp = /^(\w{2,3}) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)$/g
    const instructions: Instruction[] = input.filter((s) => s.length > 0).map((str) => {
        const result = str.matchAll(instructionRegExp).next();
        const isOn = result.value[1] === 'on';
        const minX = parseInt(result.value[2], 10);
        const maxX = parseInt(result.value[3], 10);
        const minY = parseInt(result.value[4], 10);
        const maxY = parseInt(result.value[5], 10);
        const minZ = parseInt(result.value[6], 10);
        const maxZ = parseInt(result.value[7], 10);
        return { minX, maxX, minY, maxY, minZ, maxZ, isOn }
    });

    const cubesWithHoles: CubeWithHoles[] = [];
    instructions.forEach((instruction) => {
        const cube = new Cube(instruction.minX, instruction.maxX, instruction.minY, instruction.maxY, instruction.minZ, instruction.maxZ);
        const intersections = cubesWithHoles.map((cubeWithHole) => ({ cubeWithHole, hole: cubeWithHole.intersect(cube) as CubeWithHoles })).filter(x => x.hole)

        for (const { cubeWithHole, hole } of intersections) {
            hole.isLit = false;
            cubeWithHole.holes.push(hole);
        }

        if (instruction.isOn) {
            cubesWithHoles.push(new CubeWithHoles(cube, true));
        }
    });

    return cubesWithHoles.reduce((a, x) => a + x.volume(), 0);
}

export default solve;
