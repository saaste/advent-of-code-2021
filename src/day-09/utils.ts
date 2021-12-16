import { Point2D } from "../helpers/Point2D";

export interface DepthPoint {
    point: Point2D;
    depth: number;
}

export const getTop = (heightMap: number[][], x: number, y: number): DepthPoint => {
    const point = new Point2D(x, y - 1);
    if (y === 0) {
        return { point, depth: Infinity };
    }
    return { point, depth: heightMap[y - 1][x] };
}

export const getRight = (heightMap: number[][], x: number, y: number): DepthPoint => {
    const point = new Point2D(x + 1, y)
    if (x === heightMap[0].length - 1) {
        return { point, depth: Infinity };
    }
    return { point, depth: heightMap[y][x + 1] };
}

export const getBottom = (heightMap: number[][], x: number, y: number): DepthPoint => {
    const point = new Point2D(x, y + 1)
    if (y === heightMap.length - 1) {
        return { point, depth: Infinity };
    }
    return { point, depth: heightMap[y + 1][x] };
}

export const getLeft = (heightMap: number[][], x: number, y: number): DepthPoint => {
    const point = new Point2D(x - 1, y)
    if (x === 0) {
        return { point, depth: Infinity };
    }
    return { point, depth: heightMap[y][x - 1] };
}

export const findLowPoints = (heightMap: number[][]): DepthPoint[] => {
    const maxRow = heightMap.length - 1;
    const maxCol = heightMap[0].length - 1;
    const lowPoints: DepthPoint[] = [];
    for (let y = 0; y <= maxRow; y++) {
        for (let x = 0; x <= maxCol; x++) {
            const point = heightMap[y][x];
            const top = getTop(heightMap, x, y);
            const right = getRight(heightMap, x, y);
            const bottom = getBottom(heightMap, x, y);
            const left = getLeft(heightMap, x, y);
            if (point < top.depth && point < right.depth && point < bottom.depth && point < left.depth) {
                lowPoints.push({ point: new Point2D(x, y), depth: point });
            }
        }
    }
    return lowPoints;
}

export const findBasinSize = (heightMap: number[][], location: DepthPoint, basinSize: number = 0, checkedLocatons: DepthPoint[] = []): [number, DepthPoint[]] => {
    if (location.depth === 9 || location.depth === Infinity || alreadyChecked(checkedLocatons, location)) {
        return [basinSize, checkedLocatons];
    }

    basinSize += 1;
    checkedLocatons = [...checkedLocatons, location]

    const top = getTop(heightMap, location.point.x, location.point.y);
    if (top.depth !== Infinity && location.depth < top.depth) {
        [basinSize, checkedLocatons] = findBasinSize(heightMap, top, basinSize, checkedLocatons);
    }

    const right = getRight(heightMap, location.point.x, location.point.y);
    if (right.depth !== Infinity && location.depth < right.depth) {
        [basinSize, checkedLocatons] = findBasinSize(heightMap, right, basinSize, checkedLocatons);
    }

    const bottom = getBottom(heightMap, location.point.x, location.point.y);
    if (bottom.depth !== Infinity && location.depth < bottom.depth) {
        [basinSize, checkedLocatons] = findBasinSize(heightMap, bottom, basinSize, checkedLocatons);
    }
    const left = getLeft(heightMap, location.point.x, location.point.y);
    if (left.depth !== Infinity && location.depth < left.depth) {
        
        [basinSize, checkedLocatons] = findBasinSize(heightMap, left, basinSize, checkedLocatons);
    }

    return [basinSize, checkedLocatons];
}

const alreadyChecked = (checkedLocations: DepthPoint[], target: DepthPoint): boolean => {
    for (const checkedLocation of checkedLocations) {
        if (checkedLocation.point.x === target.point.x && checkedLocation.point.y === target.point.y) {
            return true;
        }
    }
    return false;
}