import { Point2D } from "../helpers/Point2D";
import { Pipe } from "./Pipe";

export const parsePipes = (input: string[]): Pipe[] => {
    return input.map((str) => {
        const [startStr, endStr] = str.split(' -> ');
        const [startX, startY] = startStr.split(',').map((s) => parseInt(s, 10));
        const [endX, endY] = endStr.split(',').map((s) => parseInt(s, 10));
        return new Pipe(new Point2D(startX, startY), new Point2D(endX, endY));
    })
}

export const calculateOverlaps = (pipes: Pipe[]): number => {
    const allPoints = pipes.flatMap((pipe) => pipe.getAllPoints())
    const pointHits = new Map<string, number>();

    allPoints.forEach((point) => {
        const key = `${point.x},${point.y}`;
        const currentValue = pointHits.get(key) || 0;
        pointHits.set(key, currentValue + 1);

    })

    const dangerousAreas = [...pointHits.values()].filter((value) => value > 1).length;
    return dangerousAreas;
}
