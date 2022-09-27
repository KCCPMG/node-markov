/** Command-line tool to generate Markov text. */
const axios = require('axios');
const fs = require('fs');
const { MarkovMachine } = require('./markov');


async function makeText(textLocation, numWords=200) {

  let text;

  // check text
  if (fs.existsSync(textLocation)) {
    text = await fs.promises.readFile(textLocation, 'utf8'); 
  } else {
    try {
      res = await axios.get(textLocation);
    } catch(e) {
      // console.log(e);
      throw new Error("Argument textLocation must be a valid file or a url")
    }
    text = res.data;
  }

  // check numWords
  if (typeof(numWords) != "number") {
    throw new Error("Argument numWords must be of type number")
    
  } else if (numWords % 1 != 0) {
    throw new Error("Argument numWords must be an integer")
  }

  mm = new MarkovMachine(text);
  return (mm.makeText(numWords));

}

module.exports = {makeText}


// run from node only if given a CLI argument
if (process.argv[2]) {
  if (process.argv[3]) {
    let wordCount = Number(process.argv[3])
    makeText(process.argv[2], wordCount)
    .then((text) => {
      console.log(text);
    })
  } else {
    makeText(process.argv[2])
    .then((text) => {
      console.log(text);
    })
  }
}