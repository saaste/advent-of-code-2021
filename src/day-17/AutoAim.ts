import { Point2D } from "../helpers/Point2D";

interface TargetArea {
    topLeft: Point2D;
    bottomRight: Point2D;
}

enum TrajectoryResult {
    Hit = "HIT",
    Under = "UNDER",
    Over = "OVER"
}

interface ShootResult {
    result: TrajectoryResult;
    trajectory: Point2D[];
}

interface OptimalVelocity {
    velocity: Point2D;
    maxY: number;
    hittingVelocities: Point2D[];
}

export class AutoAim {
    targetArea: TargetArea;

    constructor(input: string) {
        const regEx = /^target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)$/g;

        const result = regEx.exec(input.trim());
        if (!result) throw new Error("Unable to parse the input");

        this.targetArea = {
            topLeft: new Point2D(parseInt(result[1], 10), parseInt(result[4], 10)),
            bottomRight: new Point2D(parseInt(result[2], 10), parseInt(result[3], 10))
        }
    }

    findOptimalTrajectory(limit: number = 300): OptimalVelocity {
        const bestVelocity = new Point2D(0, 0);
        const hittingVelocities: Point2D[] = [];

        let iteration = 0;
        let maxY = 0;
        let currentX = 0;
        let currentY = -(limit);

        while (currentX < limit || currentY < limit) {
            const launchResult = this.launch(new Point2D(currentX, currentY));
            if (launchResult.result === TrajectoryResult.Hit) {
                hittingVelocities.push(new Point2D(currentX, currentY));
                const trajectoryMaxY = Math.max(...launchResult.trajectory.map((p) => p.y));
                if (trajectoryMaxY >= maxY) {
                    maxY = trajectoryMaxY;
                    bestVelocity.x = currentX;
                    bestVelocity.y = currentY;
                }
            }
            iteration++;

            if (currentY === limit) {
                currentY = -(limit);
                currentX++;
            } else {
                currentY++;
            }
        }

        return { velocity: bestVelocity, maxY, hittingVelocities };
    }

    launch(velocity: Point2D): ShootResult {
        let currentPosition = new Point2D(0, 0);
        let isShotOver = false;
        let isHit = false;
        let result: TrajectoryResult;

        const trajectory: Point2D[] = [currentPosition];

        while (!isShotOver && !isHit) {
            currentPosition = new Point2D(currentPosition.x + velocity.x, currentPosition.y + velocity.y);
            trajectory.push(currentPosition);

            if (velocity.x > 0) velocity.x--
            else if (velocity.x < 0) velocity.x++;

            velocity.y--;
            isShotOver = this.isShotOver(currentPosition)
            isHit = this.isHit(currentPosition);
        }


        if (isHit) {
            result = TrajectoryResult.Hit
        } else {
            const lastPoint = trajectory[trajectory.length - 1];
            if (lastPoint.x < this.targetArea.topLeft.x) result = TrajectoryResult.Under
            else result = TrajectoryResult.Over
        }

        return { result: result, trajectory: trajectory }
    }

    visualizeTrajectory(trajectory: Point2D[]) {
        const maxY = Math.max(...trajectory.map((p) => p.y), this.targetArea.topLeft.y);
        const maxX = Math.max(...trajectory.map((p) => p.x), this.targetArea.bottomRight.x);
        const minY = Math.min(...trajectory.map((p) => p.y), this.targetArea.bottomRight.y);
        const minX = 0;

        for (let y = maxY; y >= minY; y--) {
            let row = "";
            for (let x = minX; x <= maxX; x++) {
                const currentPoint = new Point2D(x, y);
                if (trajectory.find((p) => p.equals(currentPoint))) {
                    row += "#"
                } else if (this.isHit(currentPoint)) {
                    row += "T"
                } else {
                    row += "."
                }
            }
            console.log(row);
        }
    }


    isHit(point: Point2D): boolean {
        const isBetweenX = point.x >= this.targetArea.topLeft.x && point.x <= this.targetArea.bottomRight.x;
        const isBetweenY = point.y >= this.targetArea.bottomRight.y && point.y <= this.targetArea.topLeft.y;
        return isBetweenX && isBetweenY;
    }

    isShotOver(point: Point2D): boolean {
        return point.x > this.targetArea.bottomRight.x || point.y < this.targetArea.bottomRight.y;
    }
}
