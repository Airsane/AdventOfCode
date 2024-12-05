const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// Parse each line into array of numbers
const reports = input.map(line => line.split(" ").map(Number));

// Check if report is safe based on rules
function isReportSafe(report, skipIndex = -1) {
    // Create array without skipped index if specified
    const checkReport = skipIndex === -1 ? report : report.filter((_, i) => i !== skipIndex);

    // Check if all differences are between 1 and 3
    for (let i = 0; i < checkReport.length - 1; i++) {
        const diff = Math.abs(checkReport[i + 1] - checkReport[i]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    // Check if consistently increasing or decreasing
    let increasing = null;
    for (let i = 0; i < checkReport.length - 1; i++) {
        const isIncreasing = checkReport[i + 1] > checkReport[i];
        if (increasing === null) {
            increasing = isIncreasing;
        } else if (increasing !== isIncreasing) {
            return false;
        }
    }

    return true;
}

// Check if report can be made safe by removing one number
function canBeMadeSafe(report) {
    // First check if already safe
    if (isReportSafe(report)) {
        return true;
    }

    // Try removing each number one at a time
    for (let i = 0; i < report.length; i++) {
        if (isReportSafe(report, i)) {
            return true;
        }
    }

    return false;
}

// Count safe reports with Problem Dampener
const safeCount = reports.reduce((count, report) => {
    return count + (canBeMadeSafe(report) ? 1 : 0);
}, 0);

console.log("Number of safe reports with Problem Dampener:", safeCount);
