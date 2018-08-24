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


console.log('------------------');

// Currying arbitrary argument lists into sums...
function sum(...args) {
//    console.log('  Called sum(', args, ')');
    function curried(...args2) {
//        console.log('  Called curried(', args2, '), returning sum(', args, args2, ')');
        return sum(...args, ...args2);
    }
    curried.value = () => {
//        console.log('  Calculating value() of args: ', args);
        return args.reduce((total, curr) => curr + total);
    };
    return curried;
}
console.log('sum(1,2,3)     ------------------');
console.log(sum(1,2,3).value());
console.log('sum(1)(2)(3))  ------------------');
console.log(sum(1)(2)(3).value());
console.log('sum(1,2)(3))   ------------------');
console.log(sum(1,2)(3).value());
console.log('sum(1,2)(3,4)) ------------------');
console.log(sum(1,2)(3,4).value());

// Can we get rid of the need for .value()?
