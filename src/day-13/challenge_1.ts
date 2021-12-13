import { getDiffieHellman } from "crypto";
import { convertCompilerOptionsFromJson } from "typescript";
import { readInput } from "../helpers/input";
import { Point2D } from "../helpers/Point2D";
import { Grid } from "./Grid";

const inputFile = `${__dirname}/../../inputs/day-13.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const grid = new Grid(input);

    let foldInstructions: [string, number][] = input.map((row) => {
        if (row.startsWith("fold along")) {
            row = row.replace("fold along ", "");
            const [direction, point] = row.split("=");
            return [direction, parseInt(point, 10)]
        } else {
            return ["", 0]
        }
    });
    foldInstructions = foldInstructions.filter((value) => value[0] !== "")
    
    const [direction, point] = foldInstructions[0];
    if (direction === "y") {
        grid.foldUpFrom(point);
    } else {
        grid.foldLeftFrom(point);
    }

    return grid.dotsVisible(); // 664 is correct
}

export default solve;
