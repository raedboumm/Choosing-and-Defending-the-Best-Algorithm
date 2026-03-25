// Sample tasks for validation
const tasks = [
    { start: 1, end: 3 },
    { start: 2, end: 5 },
    { start: 4, end: 6 },
    { start: 6, end: 7 },
    { start: 5, end: 9 },
    { start: 8, end: 10 }
];

// ---------- BRUTE-FORCE (Recursive) ----------
// Time Complexity: O(2^n)
// Space Complexity: O(n) for recursion stack
function bruteForceMaxTasks(tasks) {
    // Sort by start time for consistent processing
    const sorted = [...tasks].sort((a, b) => a.start - b.start);
    
    function dfs(idx, lastEndTime) {
        if (idx === sorted.length) return 0;
        
        // Skip current task
        let maxCount = dfs(idx + 1, lastEndTime);
        
        // Take current task if it doesn't overlap
        if (sorted[idx].start >= lastEndTime) {
            maxCount = Math.max(maxCount, 1 + dfs(idx + 1, sorted[idx].end));
        }
        
        return maxCount;
    }
    
    return dfs(0, -Infinity);
}

// ---------- GREEDY (Earliest End Time) ----------
// Time Complexity: O(n log n)
// Space Complexity: O(1) excluding input
function greedyMaxTasks(tasks) {
    // Sort by end time (earliest first)
    const sorted = [...tasks].sort((a, b) => a.end - b.end);
    
    let count = 0;
    let lastEndTime = -Infinity;
    
    for (const task of sorted) {
        if (task.start >= lastEndTime) {
            count++;
            lastEndTime = task.end;
        }
    }
    
    return count;
}

// ---------- VALIDATION ----------
console.log("=== Validation with sample tasks ===");
console.log("Brute-force result:", bruteForceMaxTasks(tasks));
console.log("Greedy result:", greedyMaxTasks(tasks));
console.log("Both match:", bruteForceMaxTasks(tasks) === greedyMaxTasks(tasks));

// ---------- PERFORMANCE TEST ----------
function generateRandomTasks(n) {
    const tasks = [];
    for (let i = 0; i < n; i++) {
        const start = Math.floor(Math.random() * 1000);
        const end = start + Math.floor(Math.random() * 100) + 1;
        tasks.push({ start, end });
    }
    return tasks;
}

function measureTime(fn, tasks, label) {
    const start = performance.now();
    const result = fn(tasks);
    const end = performance.now();
    console.log(`${label}: ${result} tasks selected, time = ${(end - start).toFixed(2)} ms`);
    return end - start;
}

console.log("\n=== Performance Test (10,000 tasks) ===");
const largeTasks = generateRandomTasks(10000);

// Warning: Brute-force will be extremely slow; use small n for testing
console.log("Note: Brute-force O(2^n) is NOT feasible for 10,000 tasks.");
console.log("Running with n=25 for demonstration...");
const smallTasks = generateRandomTasks(25);

try {
    measureTime(bruteForceMaxTasks, smallTasks, "Brute-force (n=25)");
} catch (e) {
    console.log("Brute-force too slow for this size");
}
measureTime(greedyMaxTasks, largeTasks, "Greedy (n=10,000)");

// ---------- BONUS: STRESS TESTING ----------
console.log("\n=== Stress Testing ===");

// Edge case 1: All tasks overlapping
const allOverlap = [
    { start: 1, end: 10 },
    { start: 2, end: 9 },
    { start: 3, end: 8 },
    { start: 4, end: 7 },
    { start: 5, end: 6 }
];
console.log("\nAll overlapping tasks:");
console.log("Greedy:", greedyMaxTasks(allOverlap)); // Should select only 1 task

// Edge case 2: All tasks non-overlapping
const allNonOverlap = [
    { start: 1, end: 2 },
    { start: 2, end: 3 },
    { start: 3, end: 4 },
    { start: 4, end: 5 }
];
console.log("\nAll non-overlapping tasks:");
console.log("Greedy:", greedyMaxTasks(allNonOverlap)); // Should select all 4

// Edge case 3: Same start time
const sameStart = [
    { start: 1, end: 2 },
    { start: 1, end: 3 },
    { start: 1, end: 4 }
];
console.log("\nSame start time:");
console.log("Greedy:", greedyMaxTasks(sameStart)); // Should select earliest ending: 1-2

// Edge case 4: Same end time
const sameEnd = [
    { start: 1, end: 5 },
    { start: 2, end: 5 },
    { start: 3, end: 5 }
];
console.log("\nSame end time:");
console.log("Greedy:", greedyMaxTasks(sameEnd)); // Should select the earliest start? Actually selects 1-5

// Edge case 5: Very large input scaling
console.log("\nScaling test (Greedy):");
[1000, 10000, 50000, 100000].forEach(n => {
    const hugeTasks = generateRandomTasks(n);
    const start = performance.now();
    greedyMaxTasks(hugeTasks);
    const end = performance.now();
    console.log(`n=${n}: ${(end - start).toFixed(2)} ms`);
});

// ---------- COMPARISON OUTPUT ----------
console.log("\n=== Comparison Summary ===");
console.log(`
┌─────────────────────┬──────────────────────┬──────────────────────┐
│                     │   Brute-Force        │      Greedy          │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ Time Complexity     │ O(2^n)               │ O(n log n)           │
│ Space Complexity    │ O(n) recursion       │ O(1)                 │
│ Max n (1 sec)       │ ~30                  │ ~1,000,000+          │
│ Optimal Result      │ Always optimal       │ Always optimal       │
│ Code Complexity     │ High (recursion)     │ Simple (linear scan) │
│ Memory Usage        │ Higher               │ Minimal              │
└─────────────────────┴──────────────────────┴──────────────────────┘
`);
