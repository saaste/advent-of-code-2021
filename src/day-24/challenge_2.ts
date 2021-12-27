import { checkDigits, nextNumber } from "./utils";

const solve = () => {
    let number = 1111111;
    let lowest = Infinity;

    while (number < 9999999) {
        const digits = number.toString().split("").map((s) => parseInt(s, 10));
        const result = checkDigits(digits);
        if (result !== false) {
            lowest = parseInt(result.join(""), 10);
            break;
        }
        number = nextNumber(number);
    }

    return lowest;
}

export default solve;

