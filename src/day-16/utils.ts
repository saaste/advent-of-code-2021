
export const hexToBin = (hex: string): string => {
    let binary = "";
    for (const c of hex) {
        binary += parseInt(c, 16).toString(2).padStart(4, '0');
    }
    return binary;
}
