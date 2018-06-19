const index = require('../parser');

describe('index', () => {
    it('must do something', () => {
        let expectedOutput = "user,num events,median\n'1.1.1.1,3,1.5\n'2.2.2.2,2,5\n'3.3.3.3,1,NaN";
        index('./__test__/test.csv').then((actualOutput) => {
            expect(actualOutput).toEqual(expectedOutput);
        });
    });
});