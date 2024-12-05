const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const leftArray = [];
const rightArray = [];

input.forEach((line) => {
    const [left, right] = line.split("/t");
    leftArray.push(parseInt(left));
    rightArray.push(parseInt(right));
});

// Create copy of arrays before sorting to avoid modifying original
const sortedLeftArray = [...leftArray].sort((a, b) => a - b);
const sortedRightArray = [...rightArray].sort((a, b) => a - b);

const differenceArray = [];
sortedLeftArray.forEach((left, index) => {
    const difference = Math.abs(sortedRightArray[index] - left);
    differenceArray.push(difference);
});

console.log(differenceArray);

// sum differenceArray
const sum = differenceArray.reduce((acc, curr) => acc + curr, 0);
console.log(sum);