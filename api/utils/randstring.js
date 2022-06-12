/*
    Generates a random string
*/

const chars = "abcdefghijklmnopqrstuvwxyz1234567890_.";

const generateStr = (len) => {
  let str = "";

  for (i = 1; i <= len; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

module.exports = { generateStr };
