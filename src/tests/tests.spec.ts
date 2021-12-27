import { assert } from 'chai';
import day1_1 from '../day-01/challenge_1';
import day1_2 from '../day-01/challenge_2';
import day2_1 from '../day-02/challenge_1';
import day2_2 from '../day-02/challenge_2';
import day3_1 from '../day-03/challenge_1';
import day3_2 from '../day-03/challenge_2';
import day4_1 from '../day-04/challenge_1';
import day4_2 from '../day-04/challenge_2';
import day5_1 from '../day-05/challenge_1';
import day5_2 from '../day-05/challenge_2';
import day6_1 from '../day-06/challenge_1';
import day6_2 from '../day-06/challenge_2';
import day7_1 from '../day-07/challenge_1';
import day7_2 from '../day-07/challenge_2';
import day8_1 from '../day-08/challenge_1';
import day8_2 from '../day-08/challenge_2';
import day9_1 from '../day-09/challenge_1';
import day9_2 from '../day-09/challenge_2';
import day10_1 from '../day-10/challenge_1';
import day10_2 from '../day-10/challenge_2';
import day11_1 from '../day-11/challenge_1';
import day11_2 from '../day-11/challenge_2';
import day12_1 from '../day-12/challenge_1';
import day12_2 from '../day-12/challenge_2';
import day13_1 from '../day-13/challenge_1';
import day13_2 from '../day-13/challenge_2';
import day14_1 from '../day-14/challenge_1';
import day14_2 from '../day-14/challenge_2';
import day15_1 from '../day-15/challenge_1';
import day15_2 from '../day-15/challenge_2';
import day16_1 from '../day-16/challenge_1';
import day16_2 from '../day-16/challenge_2';
import day17_1 from '../day-17/challenge_1';
import day17_2 from '../day-17/challenge_2';
import day18_1 from '../day-18/challenge_1';
import day18_2 from '../day-18/challenge_2';
import day19_1 from '../day-19/challenge_1';
import day19_2 from '../day-19/challenge_2';
import day20_1 from '../day-20/challenge_1';
import day20_2 from '../day-20/challenge_2';
import day21_1 from '../day-21/challenge_1';
import day21_2 from '../day-21/challenge_2';
import day22_1 from '../day-22/challenge_1';
import day22_2 from '../day-22/challenge_2';
import day23_1 from '../day-23/challenge_1';
import day23_2 from '../day-23/challenge_2';
import day24_1 from '../day-24/challenge_1';
import day24_2 from '../day-24/challenge_2';

describe("Day tests", () => {

    describe("Day1", () => {
        it("Challenge 1", () => {
            assert.equal(day1_1(), 1374);
        });
        it("Challenge 2", () => {
            assert.equal(day1_2(), 1418);
        });
    });

    describe("Day2", () => {
        it("Challenge 1", () => {
            assert.equal(day2_1(), 1383564);
        });
        it("Challenge 2", () => {
            assert.equal(day2_2(), 1488311643);
        });
    });

    describe("Day3", () => {
        it("Challenge 1", () => {
            assert.equal(day3_1(), 3009600);
        });
        it("Challenge 2", () => {
            assert.equal(day3_2(), 6940518);
        });
    });

    describe("Day4", () => {
        it("Challenge 1", () => {
            assert.equal(day4_1(), 63424);
        });
        it("Challenge 2", () => {
            assert.equal(day4_2(), 23541);
        });
    });

    describe("Day5", () => {
        it("Challenge 1", () => {
            assert.equal(day5_1(), 7269);
        });
        it("Challenge 2", () => {
            assert.equal(day5_2(), 21140);
        });
    });

    describe("Day6", () => {
        it("Challenge 1", () => {
            assert.equal(day6_1(), 394994);
        });
        it("Challenge 2", () => {
            assert.equal(day6_2(), 1765974267455);
        });
    });

    describe("Day7", () => {
        it("Challenge 1", () => {
            assert.equal(day7_1(), 354129);
        });
        it("Challenge 2", () => {
            assert.equal(day7_2(), 98905973);
        });
    });

    describe("Day8", () => {
        it("Challenge 1", () => {
            assert.equal(day8_1(), 452);
        });
        it("Challenge 2", () => {
            assert.equal(day8_2(), 1096964);
        });
    });

    describe("Day9", () => {
        it("Challenge 1", () => {
            assert.equal(day9_1(), 539);
        });
        it("Challenge 2", () => {
            assert.equal(day9_2(), 736920);
        });
    });

    describe("Day10", () => {
        it("Challenge 1", () => {
            assert.equal(day10_1(), 442131);
        });
        it("Challenge 2", () => {
            assert.equal(day10_2(), 3646451424);
        });
    });

    describe("Day11", () => {
        it("Challenge 1", () => {
            assert.equal(day11_1(), 1741);
        });
        it("Challenge 2", () => {
            assert.equal(day11_2(), 440);
        });
    });

    describe("Day12", () => {
        it("Challenge 1", () => {
            assert.equal(day12_1(), 5228);
        });
        // TODO: Enable if you figure out a better performing solution
        // it("Challenge 2", () => {
        //     assert.equal(day12_2(), 131228);
        // });
    });

    describe("Day13", () => {
        it("Challenge 1", () => {
            assert.equal(day13_1(), 664);
        });
        it("Challenge 2", () => {
            const output = day13_2().replace(/(?:\r\n|\r|\n)/g, '');
            assert.equal(output,
                `####.####...##.#..#.####.#....###..#....#....#.......#.#.#.....#.#....#..#.#....###..###.....#.##.....#..#....###..#....#....#.......#.#.#...#...#....#..#.#....#....#....#..#.#.#..#....#....#..#.#....####.#.....##..#..#.####.####.###..####.`);
        });
    });

    describe("Day14", () => {
        it("Challenge 1", () => {
            assert.equal(day14_1(), 3697);
        });
        it("Challenge 2", () => {
            assert.equal(day14_2(), 4371307836157);
        });
    });

    describe("Day15", () => {
        it("Challenge 1", () => {
            assert.equal(day15_1(), 537);
        });
        // TODO: Enable if you figure out a better performing solution
        // it("Challenge 2", () => {
        //     assert.equal(day15_2(), 2881);
        // });
    });

    describe("Day16", () => {
        it("Challenge 1", () => {
            assert.equal(day16_1(), 965);
        });
        it("Challenge 2", () => {
            assert.equal(day16_2(), 116672213160);
        });
    });

    describe("Day17", () => {
        it("Challenge 1", () => {
            assert.equal(day17_1(), 2628);
        });
        it("Challenge 2", () => {
            assert.equal(day17_2(), 1334);
        });
    });

    describe("Day18", () => {
        it("Challenge 1", () => {
            assert.equal(day18_1(), 4120);
        });
        it("Challenge 2", () => {
            assert.equal(day18_2(), 4725);
        });
    });

    describe("Day19", () => {
        it("Challenge 1", () => {
            assert.equal(day19_1(), 459);
        });
        it("Challenge 2", () => {
            assert.equal(day19_2(), 19130);
        });
    });

    describe("Day20", () => {
        it("Challenge 1", () => {
            assert.equal(day20_1(), 5065);
        });
        it("Challenge 2", () => {
            assert.equal(day20_2(), 14790);
        }).timeout(15000);
    });

    describe("Day21", () => {
        it("Challenge 1", () => {
            assert.equal(day21_1(), 916083);
        });
        it("Challenge 2", () => {
            assert.equal(day21_2(), 49982165861983);
        }).timeout(15000);
    });

    describe("Day22", () => {
        it("Challenge 1", () => {
            assert.equal(day22_1(), 642125);
        });
        it("Challenge 2", () => {
            assert.equal(day22_2(), 1235164413198198);
        }).timeout(15000);
    });

    describe("Day23", () => {
        it("Challenge 1", () => {
            assert.equal(day23_1(), 15385);
        }).timeout(30000);
        it("Challenge 2", () => {
            assert.equal(day23_2(), 49803);
        }).timeout(30000);
    });

    describe("Day24", () => {
        it("Challenge 1", () => {
            assert.equal(day24_1(), 94992992796199);
        });
        it("Challenge 2", () => {
            assert.equal(day24_2(), 11931881141161);
        });
    });

});
