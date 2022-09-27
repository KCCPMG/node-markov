const {makeText} = require('./makeText')

describe("Test makeText", function(){

  test("number of words from eggs.txt", async function(){
    let mm = await makeText('eggs.txt', 100);
    expect(mm.split(" ").length).toEqual(100);
  })

  test("number of words from Alice in Wonderland", async function(){
    let mm = await makeText('https://www.gutenberg.org/files/11/11-0.txt', 100);
    expect(mm.split(" ").length).toEqual(100);
  })

  test("fail on invalid textLocation", async function(){
    try {
      await makeText('arglebargle.txt', 100);
    } catch(e) {
      expect(e.message).toEqual('Argument textLocation must be a valid file or a url');
    }  
  })

  test("fail on invalid numWords (NaN)", async function(){
    try {
      await makeText('eggs.txt', "q3tbas");
    } catch(e) {
      expect(e.message).toEqual('Argument numWords must be of type number');
    }

  })

  test("fail on invalid numWords (Decimal)", async function(){
    try {
      await makeText('eggs.txt', 3.14);
    } catch(e) {
      expect(e.message).toEqual('Argument numWords must be an integer');
    }
  })

})