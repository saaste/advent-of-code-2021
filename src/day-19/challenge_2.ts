import { Point3D } from "../helpers/Point3D";
import { manhattanDistance } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-19.txt`;

const solve = () => {
    // Scanner positions. Got these from the previous run
    const scannerPositions = [
        '0,0,0',           '-80,52,1283',    '-76,151,-1118',
        '5,63,2538',       '1240,55,2565',   '1186,1281,2430',
        '1195,1342,3702',  '2377,1258,3717', '2415,1217,4925',
        '2364,1239,6023',  '2398,2456,6145', '3544,1368,3737',
        '2358,73,6180',    '3603,-11,6028',  '1258,2529,2454',
        '2452,2497,2417',  '3551,2397,2409', '2364,1345,7273',
        '2426,1273,2530',  '2290,3618,2570', '2321,2402,3597',
        '2324,125,2555',   '1198,151,3697',  '2406,2571,7337',
        '1079,77,4802',    '-59,80,4993',    '-1179,41,2595',
        '-14,1212,2404',   '2438,3714,1365', '2336,1349,8413',
        '2386,1183,9749',  '2312,2549,9777', '2329,2553,10906',
        '3545,2415,10970', '1233,3689,1388', '2362,115,3694',
        '4729,2504,10854'
    ];

    const scanners = scannerPositions.map((s) => {
        const [x,y,z] = s.split(",").map((s) => parseInt(s, 10));
        return new Point3D(x, y, z);
    });

    let longestDistance = 0;
    for (let i = 0; i < scanners.length - 1; i++) {
        const a = scanners[i];
        for (let j = 1; j < scanners.length; j++) {
            const b = scanners[j];
            const manhattanDist = manhattanDistance(a, b);
            if (manhattanDist > longestDistance) {
                longestDistance = manhattanDist;
            }
        }
    }
    
    return longestDistance;
}

export default solve;
