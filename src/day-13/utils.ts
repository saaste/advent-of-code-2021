export interface Instruction {
    direction: string,
    point: number;
}
export const parseInstruction = (input: string[]): Instruction[] => {
    return input.map((row) => {
        if (row.startsWith("fold along")) {
            row = row.replace("fold along ", "");
            const [direction, point] = row.split("=");
            
            return {
                direction: direction === "y" ? "U" : "L",
                point: parseInt(point, 10)
            }
        } else {
            return {
                direction: "",
                point: -1
            }
        }
    }).filter((instruction) => instruction.point !== -1);
}