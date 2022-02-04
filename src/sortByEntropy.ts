import { readFileSync } from 'fs';
const WordGame = require('./WordGame');

const file: string = readFileSync('resources/wordlist.txt', 'utf-8');
const wordlist: string[] = file.split("\n");

/**
 * Select the best guess to maximize an entropy of a judge (e.g. 21100).
 * Example:
 *
 *     p(judge="21100"|answer="gorge", guess="group") = 1.
 *     p(judge="21100"|answer="zzzzz", guess="group") = 0.
 *     p(judge="21100"|guess="group") = \sum_{word in wordlist} p(judge="21100"|answer="word", guess="group")*p(word).
 *
 * Assuming p(word) follows uniform ditribution, we can calculate p(judge="21100"|guess="group").
 * Next, an entropy of pattern conditioned on guess taking a certain value "group" is given by
 *
 *     H(pattern|guess="group") = \sum_{pattern in all pattern} -p(judge="pattern"|guess="group")*log(p(judge="pattern"|guess="group")).
 *
 * Therefore, we get the best guess by
 *
 *     guess* = max_{word in wordlist} H(pattern|guess="word").
 */

function calcEntropy(guess: string): number {
    var game = new WordGame(wordlist);
    var judgeFreq: { [key: string]: number; } = {};

    // p(judge="21100"|guess="group") = judgeFreq[judge]/wordlist.length
    for (var answer of wordlist) {
        game.setAnswer(answer);
        game.setInput(guess);
        game.judgeInput();
        var judge = game.getJudge();
        if (Object.keys(judgeFreq).includes(judge)) {
            judgeFreq[judge] += 1;
        } else {
            judgeFreq[judge] = 1;
        }
    }

    var entropy: number = 0;
    var allpattern = Object.keys(judgeFreq);
    for (judge of allpattern) {
        var p = judgeFreq[judge] / wordlist.length;
        entropy += -p * Math.log(p) / Math.log(2);
    }
    return entropy;
}


function sortByEntropy(wordlist_: string[]): string[] {
    var entropy: { [key: string]: number } = {};
    for (var word of wordlist_) {
        entropy[word] = calcEntropy(word);
    }

    // sort dictionary by value
    var temp = Object.keys(entropy).map(function (key) {
        return [key, entropy[key]];
    }).sort(function (first, second) {
        if (first[1] > second[1]) return -1;
        if (second[1] < first[1]) return 1;
        return 0;
    });

    var sorted: string[] = [];
    for (var item of temp) {
        sorted.push(item[0].toString());
    }

    return sorted;
}

// console.log(calcEntropy("tares"));
// const sublist = ["apple", "which", "their", "quote", "gizmo"];
// const sorted = sortByEntropy(sublist);

import { createWriteStream } from 'fs';
function main() {
    const sorted = sortByEntropy(wordlist);
    var file2 = createWriteStream('resources/sorted.txt', 'utf8');
    file2.on('error', function (err) { /* error handling */ });
    sorted.forEach(function (v: string) { file2.write(v + '\n'); });
    file2.end();
    console.log("complete");
}

module.exports = sortByEntropy;