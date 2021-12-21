import assert, { AssertionError } from 'assert';
import { SnailfishNumber } from './SnailfishNumber';

describe("SnailfishNumber", () => {
    describe("toString", () => {
        it("returns a proper string representation", () => {
            let number = new SnailfishNumber(1, 2);
            assert.strictEqual(number.toString(), "[1,2]");

            number = new SnailfishNumber(new SnailfishNumber(1, 2), new SnailfishNumber(3, 4));
            assert.strictEqual(number.toString(), "[[1,2],[3,4]]");
        })
    });

    describe("from", () => {
        it("parse simple object", () => {
            const number = SnailfishNumber.from("[1,2]");
            assert.strictEqual(number.left, 1);
            assert.strictEqual(number.right, 2);
            assert.strictEqual(number.depth, 0);
            assert.strictEqual(number.parent, null);
        });
        it("parse complex object", () => {
            const rootNumber = SnailfishNumber.from("[[1,2],[3,[4,5]]]");

            const rootLeft = rootNumber.left as SnailfishNumber;
            const rootRight = rootNumber.right as SnailfishNumber;

            const rightLeft = rootRight.left as number;
            const rightRight = rootRight.right as SnailfishNumber;

            assert.strictEqual(rootLeft.left, 1);
            assert.strictEqual(rootLeft.right, 2);
            assert.strictEqual(rightLeft, 3);
            assert.strictEqual(rightRight.left, 4);
            assert.strictEqual(rightRight.right, 5);
        });
    });

    describe("add", () => {
        it("sums to numbers", () => {
            const a = new SnailfishNumber(1, 2);
            const b = new SnailfishNumber(3, 4);
            const c = a.add(b);

            const left = c.left as SnailfishNumber;
            const right = c.right as SnailfishNumber;

            assert.strictEqual(left.left, 1);
            assert.strictEqual(left.right, 2);
            assert.strictEqual(right.left, 3);
            assert.strictEqual(right.right, 4);
        });
    });

    describe("reduce", () => {
        describe("explode only", () => {
            it("does proper reducing 1", () => {
                const number = SnailfishNumber.from("[[[[[9,8],1],2],3],4]");
                number.reduce();

                const actual = number.toString();
                assert.strictEqual(actual, "[[[[0,9],2],3],4]");
            });
            it("does proper reducing 2", () => {
                const number = SnailfishNumber.from("[7,[6,[5,[4,[3,2]]]]]");
                number.reduce();

                const actual = number.toString();
                assert.strictEqual(actual, "[7,[6,[5,[7,0]]]]");
            });
            it("does proper reducing 3", () => {
                const number = SnailfishNumber.from("[[6,[5,[4,[3,2]]]],1]");
                number.reduce();

                const actual = number.toString();
                assert.strictEqual(actual, "[[6,[5,[7,0]]],3]");
            });
            it("does proper two step reducing 1", () => {
                const number = SnailfishNumber.from("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]");
                number.reduce();

                const actual = number.toString();
                assert.strictEqual(actual, "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");
            });
        });
    });
    describe("split only", () => {
        it("does proper reducing 1", () => {
            const number = new SnailfishNumber(10, 11)
            number.reduce();

            const actual = number.toString();
            assert.strictEqual(actual, "[[5,5],[5,6]]");
        });

        it("does proper reducing 2", () => {
            const number = new SnailfishNumber(10, new SnailfishNumber(11, 12))
            number.reduce();

            const actual = number.toString();
            assert.strictEqual(actual, "[[5,5],[[5,6],[6,6]]]");
        });
    });
    describe("mixed", () => {
        it("does proper reducing 1", () => {
            const a = SnailfishNumber.from("[[[[4,3],4],4],[7,[[8,4],9]]]");
            const b = SnailfishNumber.from("[1,1]");

            const sum = a.add(b);
            assert.strictEqual(sum.toString(), "[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]")

            sum.reduce();
            assert.strictEqual(sum.toString(), "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
        });
        it("does proper reducing 2", () => {
            const rawNumbers = [
                "[1,1]",
                "[2,2]",
                "[3,3]",
                "[4,4]",
            ];
            const parsedNumbers: SnailfishNumber[] = rawNumbers.map((n) => SnailfishNumber.from(n));
            assert.deepEqual(parsedNumbers.map((n) => n.toString()), rawNumbers);

            let sum: SnailfishNumber | undefined = undefined;
            for (const parsedNumber of parsedNumbers) {
                if (sum === undefined) {
                    sum = parsedNumber;
                } else {
                    sum = sum.add(parsedNumber)
                }
            }

            sum?.reduce();
            assert.strictEqual(sum?.toString(), "[[[[1,1],[2,2]],[3,3]],[4,4]]");
        });
        it("does proper reducing 3", () => {
            const rawNumbers = [
                "[1,1]",
                "[2,2]",
                "[3,3]",
                "[4,4]",
                "[5,5]",
            ];
            const parsedNumbers: SnailfishNumber[] = rawNumbers.map((n) => SnailfishNumber.from(n));
            assert.deepEqual(parsedNumbers.map((n) => n.toString()), rawNumbers);

            let sum: SnailfishNumber | undefined = undefined;
            for (const parsedNumber of parsedNumbers) {
                if (sum === undefined) {
                    sum = parsedNumber;
                } else {
                    sum = sum.add(parsedNumber)
                }
            }
            sum?.reduce();
            assert.strictEqual(sum?.toString(), "[[[[3,0],[5,3]],[4,4]],[5,5]]");
        });
        it("does proper reducing 3", () => {
            const rawNumbers = [
                "[1,1]",
                "[2,2]",
                "[3,3]",
                "[4,4]",
                "[5,5]",
                "[6,6]"
            ];
            const parsedNumbers: SnailfishNumber[] = rawNumbers.map((n) => SnailfishNumber.from(n));
            assert.deepEqual(parsedNumbers.map((n) => n.toString()), rawNumbers);

            let sum: SnailfishNumber | undefined = undefined;
            for (const parsedNumber of parsedNumbers) {
                if (sum === undefined) {
                    sum = parsedNumber;
                } else {
                    sum = sum.add(parsedNumber)
                }
            }
            sum?.reduce();
            assert.strictEqual(sum?.toString(), "[[[[5,0],[7,4]],[5,5]],[6,6]]");
        });
        it("does proper reducing 4", () => {
            const a = SnailfishNumber.from("[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]");
            const b = SnailfishNumber.from("[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]");
            const sum = a.add(b);
            sum.reduce();
            assert.strictEqual(sum?.toString(), "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]");
        });
    });
});
