import { checkDigits, previousNumber } from "./utils";

const solve = () => {

    let number = 9999999;
    let highest = 0;

    while (number > 1111111) {
        const digits = number.toString().split("").map((s) => parseInt(s, 10));
        const result = checkDigits(digits);
        if (result !== false) {
            highest = parseInt(result.join(""), 10);
            break;
        }

        number = previousNumber(number);
    }

    return highest;
}



export default solve;

