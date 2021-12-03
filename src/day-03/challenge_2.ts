import { readInput } from "../helpers/input";
import { findReportValue } from "./utils";

const inputFile = `${__dirname}/input.txt`;

const solve = () => {
    let report = readInput(inputFile);
    const oxygenValue = findReportValue([...report], (bit) => bit.ones >= bit.zeros ? "1" : "0");
    const co2Value = findReportValue([...report], (bit) => bit.ones >= bit.zeros ? "0" : "1");
    return oxygenValue * co2Value;
}

export default solve;