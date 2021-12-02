import assert from 'assert';

import day1_1 from '../day-01/challenge_1';
import day1_2 from '../day-01/challenge_2';
import day2_1 from '../day-02/challenge_1';
import day2_2 from '../day-02/challenge_2';

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