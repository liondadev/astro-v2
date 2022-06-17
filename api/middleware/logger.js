/*
    Logger middleware
    This logs all requests, cookies, and what URL they are requesting to the console
    This can be used for ANTI-DDOS or other purposes
*/

const log = require("../utils/log")

module.exports = (req, res) => {
    log(`\nRequest Recieved:\n${req}\n`)
}
