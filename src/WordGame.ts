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
    input: string;
    square_size: number;
    MAX_TRIAL: number;

    constructor(wordlist: string[], square_size: number = 3) {
        this.wordlist = wordlist.slice(0, wordlist.length);
        this.answer = this.wordlist[rndInt(0, this.wordlist.length - 1)];
        this.judge = "";
        this.input = "";
        this.square_size = square_size;
        this.MAX_TRIAL = 3;
    }

    getAnswer(): string {
        return this.answer;
    }

    getJudge(): string {
        return this.judge;
    }

    setJudge(s: string) {
        this.judge = s;
    }

    setInput(s: string) {
        this.input = s;
    }

    getMaxTrial(): number {
        return this.MAX_TRIAL;
    }

    varidateJudge(): boolean {
        var s = this.judge;
        const regex = /[^0-2]/g;
        return s.length == 5 && s.match(regex) === null ? true : false;
    }

    varidateInput(): boolean {
        var s = this.input;
        return s.length == 5 && this.wordlist.includes(s) ? true : false;
    }

    judgeInput(): this {
        this.judge = "";
        for (var i = 0; i < this.input.length; i++) {
            if (this.input[i] == this.answer[i]) {
                this.judge += 2;
            } else if (this.answer.includes(this.input[i])) {
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
                out += Colors.black("  ").bgGreen.repeat(this.square_size);
            } else if (s == "1") {
                out += Colors.black("  ").bgYellow.repeat(this.square_size);
            } else if (s == "0") {
                out += Colors.white("  ").bgGrey.repeat(this.square_size);
            }
            out += Colors.white(" ");
        }

        for (let i = 0; i < this.square_size; i++) {
            console.log(out);
        }
        return this;
    }
}

module.exports = WordGame;

