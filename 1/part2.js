const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const leftArray = [];
const rightArray = [];

input.forEach((line) => {
    const [left, right] = line.split("/t");
    leftArray.push(parseInt(left));
    rightArray.push(parseInt(right));
});

// Count frequency of numbers in right array
const frequencyArrayRight = [];
rightArray.forEach((num) => {
    if (!frequencyArrayRight[num]) {
        frequencyArrayRight[num] = 1;
    } else {
        frequencyArrayRight[num]++;
    }
});


// Calculate similarity score
let similarityScore = 0;
leftArray.forEach((num) => {
    if (frequencyArrayRight[num]) {
        // Multiply the number by how many times it appears in right array
        similarityScore += num * frequencyArrayRight[num];
    }
});

console.log(similarityScore);
