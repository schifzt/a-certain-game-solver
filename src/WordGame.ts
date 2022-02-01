import { exit } from 'process';
import * as readline from 'readline';
const Colors = require('colors');

function rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class WordGame {
    wordlist: string[];
    answer: string;
    judge: string;
    square_size: number;
    MAX_TRIAL: number;

    constructor(wordlist: string[], square_size: number = 3) {
        this.wordlist = wordlist;
        this.answer = this.wordlist[rndInt(0, this.wordlist.length - 1)];
        this.judge = "";
        this.square_size = square_size;
        this.MAX_TRIAL = 6;
    }

    correct(s: string = " "): string {
        return Colors.black(s + s).bgGreen.repeat(this.square_size);
    }

    justin(s: string = " "): string {
        return Colors.black(s + s).bgYellow.repeat(this.square_size);
    }

    missed(s: string = " "): string {
        return Colors.white(s + s).bgGrey.repeat(this.square_size);
    }

    bar(): string {
        return Colors.white(" ");
    }

    getAnswer(): string {
        return this.answer;
    }

    getMaxTrial(): number {
        return this.MAX_TRIAL;
    }

    varidateInput(s: string): boolean {
        return s.length == 5 && s !== null && this.wordlist.includes(s) ? true : false;
    }

    judgeInput(input: string): this {
        this.judge = "";
        for (var i = 0; i < input.length; i++) {
            if (input[i] == this.answer[i]) {
                this.judge += 2;
            } else if (this.answer.includes(input[i])) {
                this.judge += 1;
            } else {
                this.judge += 0;
            }
        }
        return this;
    }

    printResult(): this {
        if (this.judge === "") {
            return this;
        }
        let out: string = "";
        for (var s of this.judge) {
            if (s == "2") {
                out += this.correct();
            } else if (s == "1") {
                out += this.justin();
            } else if (s == "0") {
                out += this.missed();
            }
            out += this.bar();
        }

        for (let i = 0; i < this.square_size; i++) {
            console.log(out);
        }
        return this;
    }
}

module.exports = WordGame;

