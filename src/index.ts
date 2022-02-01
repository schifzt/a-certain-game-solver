import { readFileSync } from 'fs';
import * as readline from 'readline';
const Colors = require('colors');


const mode = "play";

const file: string = readFileSync('resources/sgb-words.txt', 'utf-8');
const words: string[] = file.split("\n");
// for (const word of words) {
//     console.log(colors.blue(word));
// }

// type statusColors = {
//     correct: string;
//     justin: string;
//     missed: string;
// }

const square_size: number = 3;
function correct(s: string = " "): string {
    return Colors.black(s + s).bgGreen.repeat(square_size);
}

function justin(s: string = " "): string {
    return Colors.black(s + s).bgYellow.repeat(square_size);
}

function missed(s: string = " "): string {
    return Colors.white(s + s).bgGrey.repeat(square_size);
}
const bar: string = Colors.white(" ");

var out: string = correct() + bar + correct() + bar + justin() + bar + missed() + bar + missed();
for (let i = 0; i < square_size; i++) {
    console.log(out);
}

// main
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.setPrompt('> ');

// inifinte loop
rl.prompt();
rl.on('line', (input) => {
    console.log(Colors.blue(input));
    rl.prompt();
});