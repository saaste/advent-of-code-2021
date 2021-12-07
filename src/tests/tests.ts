import assert from 'assert';

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

describe("Day1", () => {
    it("Challenge 1", () => {
        assert.strictEqual(day1_1(), 1374);
    });
    it("Challenge 2", () => {
        assert.strictEqual(day1_2(), 1418);
    });
});

describe("Day2", () => {
    it("Challenge 1", () => {
        assert.strictEqual(day2_1(), 1383564);
    });
    it("Challenge 2", () => {
        assert.strictEqual(day2_2(), 1488311643);
    });
});

describe("Day3", () => {
    it("Challenge 1", () => {
        assert.strictEqual(day3_1(), 3009600);
    });
    it("Challenge 2", () => {
        assert.strictEqual(day3_2(), 6940518);
    });
});

describe("Day4", () => {
    it("Challenge 1", () => {
        assert.strictEqual(day4_1(), 63424);
    });
    it("Challenge 2", () => {
        assert.strictEqual(day4_2(), 23541);
    });
});

describe("Day5", () => {
    it("Challenge 1", () => {
        assert.strictEqual(day5_1(), 7269);
    });
    it("Challenge 2", () => {
        assert.strictEqual(day5_2(), 21140);
    });
});

describe("Day6", () => {
    it("Challenge 1", () => {
        assert.strictEqual(day6_1(), 394994);
    });
    it("Challenge 2", () => {
        assert.strictEqual(day6_2(), 1765974267455);
    });
});

describe("Day7", () => {
    it("Challenge 1", () => {
        assert.strictEqual(day7_1(), 354129);
    });
    it("Challenge 2", () => {
        assert.strictEqual(day7_2(), 98905973);
    });
});
