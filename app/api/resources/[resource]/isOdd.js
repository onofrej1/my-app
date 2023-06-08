function isOdd(number) {
  return number % 2 !== 0;
}

// Make isOdd available to other scripts (and other modules)
module.exports.isOdd = isOdd;
