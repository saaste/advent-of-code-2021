import { readInputAsString } from "../helpers/input";
import { Packet } from "./Packet";
import { hexToBin } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-16.txt`;

const solve = () => {
    const input = readInputAsString(inputFile);
    const packet = Packet.parse(hexToBin(input));
    return packet.getValueSum();
}

export default solve;
