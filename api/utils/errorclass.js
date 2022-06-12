/*
    Class baed on the Error class that allows easier capture of error messages
*/

class BetterError extends Error {
    constructor(msg, errCode) {
        this.msg = msg
        this.code = errCode
    }
}

module.exports = BetterError
