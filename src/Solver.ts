class Solver {
    wordlist: string[];
    guesslist: string[];
    judgelist: string[];

    constructor(wordlist: string[]) {
        this.wordlist = wordlist;
        this.guesslist = [];
        this.judgelist = [];
    }

    setResult(guess: string, judge: string) {
        this.guesslist.push(guess);
        this.judgelist.push(judge);
    }

    solve(): string {
        let guess: string = "apple";
        return guess;
    }

}

module.exports = Solver;

