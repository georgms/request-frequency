const parseCsv = require('./parser');

parseCsv('file.csv').then((output) => {
    console.log(output);
});
