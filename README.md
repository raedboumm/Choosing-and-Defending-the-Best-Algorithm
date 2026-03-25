# Delivery Task Scheduler - Algorithm Optimization

## Problem Statement
Select the maximum number of non-overlapping tasks a single delivery driver can perform. Each task has a start time and an end time.

## Implemented Solutions

### 1. Brute-Force (Recursive)
- Explores all combinations of tasks
- Time: O(2^n) - exponential, not feasible for large inputs
- Space: O(n) recursion stack
- Always returns optimal result

### 2. Greedy (Earliest End Time)
- Sorts tasks by end time, selects non-overlapping tasks
- Time: O(n log n) - sorting + linear scan
- Space: O(1) - constant extra space
- Always returns optimal result for activity selection problem

## Performance Comparison

| Metric              | Brute-Force        | Greedy              |
|---------------------|--------------------|---------------------|
| Time Complexity     | O(2^n)            | O(n log n)          |
| Space Complexity    | O(n)              | O(1)                |
| Max n (practical)   | ~30               | 1,000,000+          |
| Execution (10,000)  | Not feasible      | ~5-10 ms            |
| Optimal Result      | Yes               | Yes                 |
| Code Complexity     | High              | Low                 |

## Stress Test Results

| Edge Case                | Greedy Behavior                                    |
|--------------------------|-----------------------------------------------------|
| All overlapping          | Selects 1 task (earliest ending) ✓                  |
| All non-overlapping      | Selects all tasks ✓                                 |
| Same start time          | Selects earliest ending task ✓                      |
| Same end time            | Selects first non-overlapping (works correctly) ✓   |

## Analysis

### Which algorithm is faster for large inputs and why?
**Greedy is significantly faster.**  
It runs in O(n log n) due to sorting, while brute-force is O(2^n) and becomes unusable beyond ~30 tasks. For 10,000 tasks, greedy completes in milliseconds; brute-force would take longer than the age of the universe.

### Which algorithm is easier to maintain and scale?
**Greedy is easier to maintain.**  
The code is 10-15 lines, uses simple iteration, and has no complex recursion. Scaling is trivial — just add more tasks. Brute-force requires careful recursion handling and fails to scale at all.

### Memory trade-offs
- **Brute-force**: O(n) recursion stack — can cause stack overflow for large n.
- **Greedy**: O(1) extra memory — only stores a counter and last end time.

## Recommendation

**Use the Greedy Algorithm for the production system.**

### Reasons:
1. **Performance**: O(n log n) vs exponential — essential for real-time processing of thousands of tasks/second.
2. **Clarity**: Simple, readable code that's easy to debug and maintain.
3. **Scalability**: Handles any input size gracefully.
4. **Correctness**: Proved optimal for activity selection (earliest end time is the optimal greedy choice property).

### When brute-force might still be relevant:
- Extremely small input sizes (n < 20) where implementation simplicity is irrelevant
- Educational purposes to demonstrate exhaustive search
- When problem constraints require exploring all possibilities (e.g., non-standard task selection criteria)

## How to Run

```bash
node scheduler.js
