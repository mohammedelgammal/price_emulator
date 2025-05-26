const toFixedDeciaml: (target: number, decimals: number) => number = (
  target: number,
  decimals: number
) => parseFloat(target.toFixed(decimals)); // toFixed() returns string

module.exports = toFixedDeciaml;
