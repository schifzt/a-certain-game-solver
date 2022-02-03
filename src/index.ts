import { readFileSync } from 'fs';
import * as readline from 'readline';
const Colors = require('colors');

const WordGame = require('./WordGame');
const Solver = require('./Solver');

const file: string = readFileSync('resources/sorted.txt', 'utf-8');
const wordlist: string[] = file.split("\n");

function rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const game = new WordGame(wordlist);
const solver = new Solver(wordlist);


function vsSelf() {
    game.setAnswer(wordlist[rndInt(0, wordlist.length - 1)]);
    console.log("answer: " + Colors.brightGreen(game.getAnswer()));

    for (var trial = 1; trial <= game.getMaxTrial(); trial++) {
        const input = solver.solve();
        console.log("> " + input);
        game.setInput(input);

        if (game.varidateInput()) {
            console.log(Colors.blue(input));
            game.judgeInput();
            game.printResult();
            solver.setResult(input, game.getJudge());
        } else {
            console.log(Colors.red(input).strikethrough);
        };
    }
}

function vsPerson(rl: readline.Interface) {
    game.setAnswer(wordlist[rndInt(0, wordlist.length - 1)]);
    console.log("answer: " + Colors.brightGreen(game.getAnswer()));

    rl.setPrompt('> ');

    var trial = 1;
    rl.prompt();
    rl.on('line', (line) => {
        const input: string = line.trim();
        game.setInput(input);
        if (game.varidateInput()) {
            trial++;
            console.log(Colors.blue(input));
            game.judgeInput();
            game.printResult();
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
                        process.exit(0);
                    } else {
                        askContinue();
                    }
                });
            }
            askContinue();
        }
    });
}


function vsMachine(rl: readline.Interface) {
    game.setAnswer(wordlist[rndInt(0, wordlist.length - 1)]);
    console.log("answer: " + Colors.brightGreen(game.getAnswer()));

    rl.setPrompt('> ');

    var trial = 1;
    var input = solver.solve()
    console.log("input: " + Colors.blue(input));
    game.setInput(input);
    rl.prompt();
    rl.on('line', (line) => {
        const judge: string = line.trim();
        game.setJudge(judge);

        if (game.varidateJudge()) {
            game.printResult();

            rl.question("register: [y/n]", (yn) => {
                if (yn.match(/^y(es)?$/i)) {
                    solver.setResult(input, judge);
                    console.log();

                    input = solver.solve();
                    console.log("input: " + Colors.blue(input));
                    rl.prompt();
                } else {
                    rl.prompt();

                }
            });
        } else {
            rl.prompt();
        }

        if (line.trim().match('exit')) {
            rl.close();
            process.exit(0);
        }
    });
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("mode == " + Colors.blue(0) + ": a machine asks, a machine solves, and a machine judges.");
console.log("mode == " + Colors.blue(1) + ": a machine asks, a person solves, and a machine judges,");
console.log("mode == " + Colors.blue(2) + ": a website asks, a person input judges, a machine solves");
rl.question("> mode:", (yn) => {
    switch (yn.trim()) {
        case "0": vsSelf(); break;
        case "1": vsPerson(rl); break;
        case "2": vsMachine(rl); break;
    }
});