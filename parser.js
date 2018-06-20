const readline = require('readline');
const fs = require('fs');
const calculateMedian = require('median');
const User = require('./user');

function defer() {
    let deferred = {
        promise: null,
        resolve: null,
        reject: null
    };

    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });

    return deferred;
}

function calculateTimestampDiffs(timestamps) {
    let timestampDiffs = [];

    /*
     * Sort array by timestamps to make sure that no negative medians are calculated if
     * the input is not sorted by timestamp
     */
    timestamps.sort();

    for (let i = 0; i < timestamps.length - 1; i++) {
        let thisTimestamp = timestamps[i];
        let nextTimestamp = timestamps[i + 1];
        let diff = nextTimestamp - thisTimestamp;
        timestampDiffs.push(diff);
    }
    return timestampDiffs;
}

function parseCsv(csvFilename) {
    let userMap = {};

    const rl = readline.createInterface({
        input: fs.createReadStream(csvFilename)
    });

    let readPromise = defer();

    rl.on('line', (line) => {
        let [timestamp, user] = line.split(',', 2);

        if (!(user in userMap)) {
            userMap[user] = new User();
        }
        userMap[user].addTimestamp(Math.floor(new Date(timestamp).getTime() / 1000));
    }).on('close', () => {
        let outputData = [];
        outputData.push(["user", "num events", "median"].join(','));

        Object.keys(userMap).forEach((userId) => {
            let user = userMap[userId];
            let timestampDiffs = calculateTimestampDiffs(user.timestamps);
            let median = calculateMedian(timestampDiffs);

            // Add a ' before the user (IP), otherwise Excel will be confused.
            outputData.push(["'" + userId, user.getNumEvents(), median].join(','));
        });

        let output = outputData.join("\n");
        readPromise.resolve(output);
    });

    return readPromise.promise;
}

module.exports = parseCsv;