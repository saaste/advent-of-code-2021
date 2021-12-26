import { readInput } from "../helpers/input";
import { Grid3D, Instruction } from "./Grid3D";

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
    }).filter((ins) => ins.minX >= -50 && ins.maxX <= 50 && ins.minY >= -50 && ins.maxY <= 50 && ins.minZ >= -50 && ins.maxZ <= 50);

    const grid = new Grid3D();

    for (const instruction of instructions) {
        grid.execute(instruction);
    }

    return grid.cubesOn();
}

export default solve;
