/*
    Json Web Token configuration
*/

const JWTSecret = process.env.JWT_SECRET || "25730498520478520458094582"
const JWTExpires = process.env.JWT_EXPIRES_IN || 60000
const JWTCookieExpires = process.env.JWT_COOKIE_EXPIRES_IN || 60000

module.exports = {
    JWTSecret,
    JWTExpires,
    JWTCookieExpires
}
