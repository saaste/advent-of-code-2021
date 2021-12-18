export enum PacketType {
    Sum = 0,
    Product = 1,
    Minimum = 2,
    Maximum = 3,
    Literal = 4,
    GreaterThan = 5,
    LessThan = 6,
    EqualTo = 7
}

export enum LengthType {
    LengthOfBits = 0,
    NumberOfPackets = 1
}

export class Packet {
    version: number;
    type: PacketType;
    binaryLength: number;
    value: number | null;
    lengthType: LengthType | null;
    numberOfSubBits: number | null;
    subPackets: Packet[];

    constructor(version: number, type: PacketType) {
        this.version = version;
        this.type = type;
        this.value = null;
        this.lengthType = null;
        this.numberOfSubBits = null;
        this.subPackets = [];
        this.binaryLength = 0;
    }

    getVersionSum(): number {
        let versionSum = this.version;
        for (const subPacket of this.subPackets) {
            versionSum += subPacket.getVersionSum();
        }
        return versionSum;
    }

    getValueSum(): number {
        switch (this.type) {
            case PacketType.Literal:
                if (!this.value)
                    throw new Error("Value missing from literal")
                return this.value;
            case PacketType.Sum:
                return this.subPackets.reduce((p, c) => p + c.getValueSum(), 0);
            case PacketType.Product:
                return this.subPackets.reduce((p, c) => p * c.getValueSum(), 1);
            case PacketType.Minimum:
                return Math.min(...this.subPackets.map((p) => p.getValueSum()));
            case PacketType.Maximum:
                return Math.max(...this.subPackets.map((p) => p.getValueSum()));
            case PacketType.GreaterThan:
                return this.subPackets[0].getValueSum() > this.subPackets[1].getValueSum() ? 1 : 0
            case PacketType.LessThan:
                return this.subPackets[0].getValueSum() < this.subPackets[1].getValueSum() ? 1 : 0
            case PacketType.EqualTo:
                return this.subPackets[0].getValueSum() === this.subPackets[1].getValueSum() ? 1 : 0
        }
    }

    printStructure = (padding: number = 0) => {
        if (this.type === PacketType.Literal) {
            console.log(" ".repeat(padding) + `- Version: ${this.version}`)
            console.log(" ".repeat(padding) + `  Type: ${this.type}`)
            console.log(" ".repeat(padding) + `  Value: ${this.value}`)
        } else {
            console.log(" ".repeat(padding) + `- Version: ${this.version}`)
            console.log(" ".repeat(padding) + `  Type: ${this.type}`)

            const lengthType = this.lengthType === LengthType.LengthOfBits ? "length" : "packet-number"
            console.log(" ".repeat(padding) + `  Length type: ${lengthType}`)
            for (const subPacket of this.subPackets) {
                subPacket.printStructure(padding + 3);
            }
        }
    }

    static parse(binaryString: string): Packet {
        binaryString = binaryString.replace(/\s/g, "");
        binaryString = binaryString.replace(/\[/g, "");
        binaryString = binaryString.replace(/\]/g, "");
        const type = parseInt(binaryString.substring(3, 6), 2);
        const version = parseInt(binaryString.substring(0, 3), 2);

        if (type === PacketType.Literal)
            return this.parseLiteralPacket(binaryString, version, type);
        return this.parseOperatorPacket(binaryString, version, type);
    }

    private static parseLiteralPacket(binaryString: string, version: number, type: PacketType): Packet {
        const oneBitRegEx = /^(\d{6}(0\d{4}))/;
        const multiBitRegEx = /^(\d{6}(0*)(1\d{4})*(0\d{4}))/;
        if (!oneBitRegEx.test(binaryString) && !multiBitRegEx.test(binaryString)) {
            throw new Error(`Invalid literal value binary string: ${binaryString}`);
        }

        // Try single bit first
        let matchResult = binaryString.match(oneBitRegEx);

        if (!matchResult) {
            matchResult = binaryString.match(multiBitRegEx);
        }

        if (!matchResult) {
            throw new Error(`Unable to match literal value binary string: ${binaryString}`);
        }

        const valuePart = matchResult[0].substring(6, matchResult[0].length);

        const valueBits = (valuePart.match(/.{1,5}/g) || []).map((bit) => bit.substring(1));

        if (valueBits.length === 0) {
            throw new Error(`Unable to find value bits from literal value binary string: ${binaryString}`);
        }

        const value = parseInt(valueBits.join(""), 2);
        const packet = new Packet(version, type);
        packet.value = value;
        packet.binaryLength = matchResult[0].length;

        return packet;
    }

    private static parseOperatorPacket(binaryString: string, version: number, type: PacketType): Packet {
        // Drop header
        binaryString = binaryString.substring(6, binaryString.length);
        const lengthType = binaryString.substring(0, 1) === "0" ? LengthType.LengthOfBits : LengthType.NumberOfPackets;

        const packet = new Packet(version, type);
        packet.lengthType = lengthType;

        const subPackets = [];
        let subBinaryString: string = "";
        let packetBinaryLength = 0;

        switch (lengthType) {
            case LengthType.LengthOfBits:
                const numberOfSubBits = parseInt(binaryString.substring(1, 16), 2)
                packet.numberOfSubBits = numberOfSubBits;

                subBinaryString = binaryString.substring(16, 16 + numberOfSubBits);
                let collectedBits = 0;
                let loop = 0;
                packetBinaryLength = 7 + 15;
                while (collectedBits < numberOfSubBits) {
                    const subPacket = Packet.parse(subBinaryString);
                    subPackets.push(subPacket);
                    packetBinaryLength += subPacket.binaryLength;
                    subBinaryString = subBinaryString.substring(subPacket.binaryLength);
                    collectedBits += subPacket.binaryLength
                    loop++;
                }

                packet.subPackets = subPackets
                packet.binaryLength = packetBinaryLength;
                break;

            case LengthType.NumberOfPackets:
                const numberOfPackets = parseInt(binaryString.substring(1, 12), 2)

                subBinaryString = binaryString.substring(12, binaryString.length);
                packetBinaryLength = 7 + 11;
                for (let i = 0; i < numberOfPackets; i++) {
                    const subPacket = Packet.parse(subBinaryString);
                    subPackets.push(subPacket);
                    packetBinaryLength += subPacket.binaryLength;
                    subBinaryString = subBinaryString.substring(subPacket.binaryLength);
                }

                packet.subPackets = subPackets
                packet.binaryLength = packetBinaryLength;
                break;

        }

        return packet;
    }
}
