const parseCsv = require('./parser');

parseCsv('/tmp/personalshop.csv').then((output) => {
    console.log(output);
});
