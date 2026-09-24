/*
Provide 3 unique implementations of the following function in JavaScript.
**Input**: `n` - any integer
*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

// Closed-form Gauss formula: n(n + 1) / 2
var sum_to_n_a = function (n) {
    return (n * (n + 1)) / 2;
};

// Same formula, integer divide via bit-shift (avoids floating-point divide)
var sum_to_n_b = function (n) {
    return (n * (n + 1)) >> 1;
};

// Algebraic rewrite of n(n + 1) / 2 as ((n + 0.5)^2) / 2 - 1/8
var sum_to_n_c = function (n) {
    return ((n + 0.5) ** 2) / 2 - 0.125;
};
