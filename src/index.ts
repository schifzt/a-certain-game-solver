import { readFileSync } from 'fs';
import * as readline from 'readline';
// const readline = require('readline');
const Colors = require('colors');

const WordGame = require('./WordGame');
const Solver = require('./Solver');

const file: string = readFileSync('resources/sgb-words.txt', 'utf-8');
const wordlist: string[] = file.split("\n");

var game = new WordGame(wordlist);
var solver = new Solver(wordlist);
console.log("answer: " + Colors.brightGreen(game.getAnswer()));

function manual() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt('> ');

    var trial = 1;
    rl.prompt();
    rl.on('line', (line) => {
        var input: string = line.trim();
        if (game.varidateInput(input)) {
            trial++;
            console.log(Colors.blue(input));
            game.judgeInput(input).printResult();
        } else {
            console.log(Colors.red(input).strikethrough);
        };

        if (trial <= game.getMaxTrial()) {
            rl.prompt();
        } else {
            function askContinue() {
                rl.question("continue: [y/n]", (input) => {
                    if (input.match(/^y(es)?$/i)) {
                        trial = 1;
                        rl.prompt();
                    } else if (input.match(/^n(o)?$/i)) {
                        rl.close();
                    } else {
                        askContinue();
                    }
                });
            }
            askContinue();
        }
    });
}

function auto() {
    for (var trial = 1; trial <= game.getMaxTrial(); trial++) {
        var input = solver.solve();
        console.log("> " + input);
        if (game.varidateInput(input)) {
            console.log(Colors.blue(input));
            game.judgeInput(input).printResult();
        } else {
            console.log(Colors.red(input).strikethrough);
        };
    }
}

manual();
// auto();
