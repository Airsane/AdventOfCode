const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// Parse each line into array of numbers
const reports = input.map(line => line.split(" ").map(Number));

// Check if report is safe based on rules
function isReportSafe(report) {
    // Check if all differences are between 1 and 3
    for (let i = 0; i < report.length - 1; i++) {
        const diff = Math.abs(report[i + 1] - report[i]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    // Check if consistently increasing or decreasing
    let increasing = null;
    for (let i = 0; i < report.length - 1; i++) {
        const isIncreasing = report[i + 1] > report[i];
        if (increasing === null) {
            increasing = isIncreasing;
        } else if (increasing !== isIncreasing) {
            return false;
        }
    }

    return true;
}

// Count safe reports
const safeCount = reports.reduce((count, report) => {
    return count + (isReportSafe(report) ? 1 : 0);
}, 0);

console.log("Number of safe reports:", safeCount);
