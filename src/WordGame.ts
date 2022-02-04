import { exit } from 'process';
import * as readline from 'readline';
const Colors = require('colors');


class WordGame {
    wordlist: string[];
    answer: string;
    judge: string;
    input: string;
    box_size: number;
    MAX_TRIAL: number;

    constructor(wordlist: string[], box_size: number = 3) {
        this.wordlist = wordlist.slice(0, wordlist.length);
        this.answer = "";
        this.judge = "";
        this.input = "";
        this.box_size = box_size;
        this.MAX_TRIAL = 6;
    }

    getAnswer(): string {
        return this.answer;
    }

    setAnswer(s: string) {
        this.answer = s;
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

    colorbox2(cpalette: string): string {
        switch (cpalette) {
            case "default":
                return Colors.black("  ").bgGreen.repeat(this.box_size);
            case "cb":
                return Colors.black("  ").bgRed.repeat(this.box_size);
            default: return "";
        }
    }

    colorbox1(cpalette: string): string {
        switch (cpalette) {
            case "default":
                return Colors.black("  ").bgYellow.repeat(this.box_size);
            case "cb":
                return Colors.black("  ").bgBlue.repeat(this.box_size);
            default: return "";
        }
    }

    colorbox0(cpalette: string): string {
        switch (cpalette) {
            case "default":
                return Colors.white("  ").bgGrey.repeat(this.box_size);
            case "cb":
                return Colors.white("  ").bgGrey.repeat(this.box_size);
            default: return "";
        }
    }

    printResult(cpalette: string): this {
        if (this.judge === "") {
            return this;
        }
        let out: string = "";
        for (var s of this.judge) {
            if (s == "2") {
                out += this.colorbox2(cpalette);
            } else if (s == "1") {
                out += this.colorbox1(cpalette);
            } else if (s == "0") {
                out += this.colorbox0(cpalette);
            }
            out += Colors.white(" ");
        }

        for (let i = 0; i < this.box_size; i++) {
            console.log(out);
        }
        return this;
    }
}

module.exports = WordGame;

