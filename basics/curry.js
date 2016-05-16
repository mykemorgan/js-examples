// ----------------------------------------------------------------------
// From Effective JS:
// Exercise #5: curry: binary function and arg, return new function
// that can take the second arg.
// - ES6 has new "..." arguments which allow any number of arg in this
//   type of construct. Most browsers do not yet support that.
// - Also can use arrow functions.

function add(x,y) {
    return x + y;
}

// Write our own curry
function curry(binary_func, default_arg) {
    return function (second_arg) {
        return binary_func(default_arg, second_arg);
    };
}
var add3 = curry(add, 3);

// Use arrow functions for currying
var add4 = (val) => add(val, 4);

console.log(add3(5));
console.log(add4(5));


