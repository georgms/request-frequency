class User {
    constructor() {
        this.timestamps = [];
    }

    addTimestamp(timestamp) {
        this.timestamps.push(timestamp);
    }

    getNumEvents() {
        return this.timestamps.length;
    }


}

module.exports = User;