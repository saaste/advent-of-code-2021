import assert from "assert";
import { required, steps } from "./hand-parsed";

export const previousNumber = (number: number): number => {
    const digits = number.toString().split("").map((s) => parseInt(s, 10));
    for (let i = 0; i < digits.length; i++) {
        const currentDigit = digits[i];
        if (i === digits.length - 1) {
            digits[i] = currentDigit === 1 ? 9 : currentDigit - 1
        } else {
            const rest = digits.slice(i + 1, digits.length);
            if (rest.join("") === "1".repeat(rest.length)) {
                for (let j = 1; j <= rest.length; j++) {
                    digits[i + j] = 9;
                }
                digits[i] = currentDigit === 1 ? 9 : currentDigit - 1;
                return parseInt(digits.join(""), 10);
            }
        }
    }
    return parseInt(digits.join(""), 10);
}

export const nextNumber = (number: number): number => {
    const digits = number.toString().split("").map((s) => parseInt(s, 10));
    for (let i = 0; i < digits.length; i++) {
        const currentDigit = digits[i];
        if (i === digits.length - 1) {
            digits[i] = currentDigit === 9 ? 1 : currentDigit + 1
        } else {
            const rest = digits.slice(i + 1, digits.length);
            if (rest.join("") === "9".repeat(rest.length)) {
                for (let j = 1; j <= rest.length; j++) {
                    digits[i + j] = 1;
                }
                digits[i] = currentDigit === 9 ? 1 : currentDigit + 1;
                return parseInt(digits.join(""), 10);
            }
        }
    }
    return parseInt(digits.join(""), 10);
}

export const checkDigits = (digits: number[]) => {
    let z = 0;
    const res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let digitsIdx = 0;

    for (let i = 0; i < 14; i++) {
        const increment = steps[i];
        const modReq = required[i];

        if (modReq === null) {
            assert(increment !== null, "Invalid increment");
            z = z * 26 + digits[digitsIdx] + increment;
            res[i] = digits[digitsIdx];
            digitsIdx++;
        } else {
            assert(modReq !== null, "Invalid mod requirement");
            res[i] = ((z % 26) - modReq);
            z = Math.floor(z / 26)
            if (res[i] < 1 || res[i] > 9)
                return false;
        }
    }

    return res;
}
