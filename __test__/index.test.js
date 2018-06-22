const index = require('../parser');

let expectedOutput = "user,num events,median\n'1.1.1.1,3,1.5\n'2.2.2.2,2,5\n'3.3.3.3,1,NaN";

describe('index', () => {
    it('must do something with timestamps', () => {
        index('./__test__/test_timestamp.csv').then((actualOutput) => {
            expect(actualOutput).toEqual(expectedOutput);
        });
    });
});

describe('index', () => {
  it('must do something with datestrings', () => {
    index('./__test__/test_datestring.csv').then((actualOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    });
  });
});

describe('index', () => {
  it('must do something with messed up timestamp sorting', () => {
    index('./__test__/test_timestamp_messy_order.csv').then((actualOutput) => {
      expect(actualOutput).toEqual(expectedOutput);
    });
  });
});
