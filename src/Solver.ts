class Solver {
    wordlist: string[];
    candidates: string[];
    guess: string;
    judge: string;

    constructor(wordlist: string[]) {
        this.wordlist = wordlist.slice(0, wordlist.length);
        this.candidates = wordlist.slice(0, wordlist.length);
        this.guess = "";
        this.judge = "";
    }

    setResult(guess: string, judge: string) {
        this.guess = guess;
        this.judge = judge;
    }

    reduceCandidates() {

        for (var i = 0; i < this.judge.length; i++) {
            if (this.judge[i] == "2") {
                this.candidates.forEach((candidate, index) => {
                    if (!(candidate[i] == this.guess[i])) {
                        this.candidates[index] = "@";
                    }
                });
            } else if (this.judge[i] == "1") {
                this.candidates.forEach((candidate, index) => {
                    if (!(candidate[i] != this.guess[i] && candidate.includes(this.guess[i]))) {
                        this.candidates[index] = "@";
                    }
                });
            } else if (this.judge[i] == "0") {
                this.candidates.forEach((candidate, index) => {
                    if (candidate.includes(this.guess[i])) {
                        this.candidates[index] = "@";
                    }
                });
            }

            this.candidates = this.candidates.filter(e => e !== "@");
            console.log(this.candidates);
        }
    }

    solve(): string {
        this.reduceCandidates();
        var guess = this.candidates[0];
        if (guess !== null) {
            return guess;
        } else {
            return "I have no idea";
        }
    }

}

module.exports = Solver;

