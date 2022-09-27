const {MarkovMachine} = require('./markov.js')
// require('jest')

describe("Test make chains of markov-machine", function(){

  test("make chains with sample input", function(){
    mm = new MarkovMachine("the cat in the hat")
    chains = mm.makeChains();
    expect(chains["the"]).toContain("cat")
    expect(chains["the"]).toContain("hat")
    expect(chains["cat"]).toContain("in")
    expect(chains["in"]).toContain("the")
    expect(chains["hat"].length).toEqual(0)
  })

})