'use strict';

// Spread and Rest functionality.

// Spread "expands" an iterable object into its constituent values:
var arr = [1, 2, 3];
var arr2 = [...arr, 5,6,7, ...arr];

console.log(`** arr:`);
console.log(arr);
console.log(`** arr2:`);
console.log(arr2);

function takeThree(a, b, c) {
    console.log(`Arg a: [${a}]`);
    console.log(`Arg b: [${b}]`);
    console.log(`Arg c: [${c}]`);
}

console.log(`** Regular func call:`);
takeThree(11, 12, 13);
console.log(`** Spreaded array call:`);
takeThree(...arr);

// Rest scoops up any number of arguments into an array ("the rest"). Similar to argv:
// Different from 'arguments' in that only the named params are in the array,
// whereas arguments here would contain also a & b.
// Also, arguments has special functionality and is not an actual Array type
// so you can't use like .sort(), .map(), etc. on arguments
function variableArgs(a, b, ...args) {
    console.log(`Arg a: [${a}]`);
    console.log(`Arg b: [${b}]`);
    console.log(`Arg args(${typeof args} ${Array.isArray(args) ? 'is' : 'is not'} Array): [${args}]`);
    console.log(`Sorted args: [${args.sort()}]`);
}

console.log(`** variableArgs() called with one:`);
variableArgs(211);
console.log(`** variableArgs() called with two:`);
variableArgs(211, 212);
console.log(`** variableArgs() called with three:`);
variableArgs(211, 212, 213);
console.log(`** variableArgs() called with five:`);
variableArgs(211, 212, 213, 'banana214', 215);

console.log(`** Rest is just an array with all the normal array fun:`);
function addAll(...toAdd) {
    return toAdd.reduce((accum, arg) => accum + arg);
}

console.log(`Adding 1 even number: ${addAll(2)}`);
console.log(`Adding 2 even number: ${addAll(2, 4)}`);
console.log(`Adding 3 even number: ${addAll(2, 4, 6)}`);
console.log(`Adding 4 even number: ${addAll(2, 4, 6, 8)}`);
console.log(`Adding 5 even number: ${addAll(2, 4, 6, 8, 10)}`);
