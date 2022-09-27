/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {

    if (typeof(text) != "string") {
      throw new Error("Constructor Error: MarkovMachine requires one argument of type string");
    }

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
    let chains = {};
    for (let word of this.words) {
      if (!Object.keys(chains).includes(word)) {
        chains[word] = [];
      }
    }
    for (let i=0; i<this.words.length-1; i++) {
      if (!chains[this.words[i]].includes(this.words[i+1])) {
        chains[this.words[i]].push(this.words[i+1])
      }
    }
    return chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {

    const getRandomWord = (avail_words) => {
      let index = Math.floor(avail_words.length * Math.random());
      return avail_words[index];
    }

    const capitalize = (word) => {
      return word[0].toUpperCase() + word.slice(1,);
    }

    let chains = this.makeChains();

    let currentWord;
    let text = "";

    for (let i=0; i<numWords; i++) {
      if (currentWord) {
        let avail_words = chains[currentWord];
        if (avail_words.length > 0) {
          currentWord = getRandomWord(avail_words);
          text += ` ${currentWord}`;
        } else {
          currentWord = getRandomWord(this.words);
          text += `. ${capitalize(currentWord)}`;
        }
      } else {
        currentWord = getRandomWord(this.words);
        text += capitalize(currentWord);
      }
    }

    return text;
  }
}

const runTest = () => {
  let mm = new MarkovMachine("the cat in the hat");
  console.log(mm.makeText(10));
}

module.exports = {MarkovMachine, runTest}


