/** Textual markov chain generator */

const { __esModule } = require("start");


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
      // TODO
      this.chains = {};

      for (let i = 0; i < this.words.length; i++) {
        let word = this.words[i];
        let nextWord = this.words[i + 1] || null;

        if (!this.chains[word]) {
            this.chains[word] = [];
        }
        this.chains[word].push(nextWord);
      }
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      // TODO
      let words = [];
      let wordKeys = Object.keys(this.chains);

      if (wordKeys.length === 0) return "";

      // Pick a starting word randomly
      let word = this.choice(wordKeys);

      // Generate the text based on Markov chain
      while (words.length < numWords && word !== null) {
        words.push(word);

        let nextWords = this.chains[word];
        word = this.choice(nextWords);

        if (word === null) {
            break;
        }
      }

      return words.join(" ");
    }

    // Pick a random element from an array
    choice(arr) {
        if (arr.length === 0) return null;
        let idx = Math.floor(Math.random() * arr.length);
        return arr[idx];
    }
  }

// Export the class to use in other files
module.exports = { MarkovMachine };
  