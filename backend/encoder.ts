export class Encoder {
    static chars = "abcdefghijklmnopqrstuvwxyz";

    static createKey(split: string[], key: string): string {
        key = key.toLowerCase();
        const length = split.map(str => str.length).reduce((total, value) => total + value, 0);
        if (key.length > length) {
            key = key.substring(0, length - 1);
        } else {
            key = key.repeat(Math.floor(length / key.length));
            key = key.substring(0, length - key.length - 1);
        }

        return key;
    }

    encode(ip: string, key: string): string {
        let encoded = "";
        
        const split = ip.split(".");
        key = Encoder.createKey(split, key);

        let currentIndex = 0;
        for (let i = 0; i < split.length; i++) {
            const str = split[i];
            for (let j = 0; j < str.length; j++) {
                const shift = Encoder.chars.indexOf(key[currentIndex]) + 1;
                const number = parseInt(str[j]);
                const shiftedNumber = number + shift;

                const multiple = Math.ceil(shiftedNumber / Encoder.chars.length);
                encoded += Encoder.chars[Encoder.chars.length * multiple - number];

                currentIndex++;
            }
            encoded += ".";
        }
        
        return encoded;
    }

    decode(input: string, key: string) {
        let encoded = "";
        
        const split = input.split(".");
        key = Encoder.createKey(split, key);

        let currentIndex = 0;
        for (let i = 0; i < split.length; i++) {
            const str = split[i];
            for (let j = 0; j < str.length; j++) {
                

                currentIndex++;
            }
            encoded += ".";
        }
        
        return encoded;
    }
}