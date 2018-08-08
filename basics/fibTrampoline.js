// Trampoline example using BigInt
//
// BigInt is a proposal (it's all the 'n's after the numbers like: "1n"):
// https://github.com/tc39/proposal-bigint
//
// Trampoline pattern:
// https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3
//
// Basically, you change a recursive function to return the recursing function
// to call instead of directly recursing. Then you don't blow up the stack.
// Not sure which release BigInt is available in.

// TODO/mm - make this a real package so we can import node_modules like this...
var bigInt = require("big-integer");

// A BigInt npm package:
// https://www.npmjs.com/package/big-integer
//
// BigInt version
// const fibRecBigInt = (n, a = 1n, b = 0n) => {
//   if (n === 0n) return b;
//
//   return () => fibRecBigInt(n - 1n, a + b, a);
// }

// Normal Int version
const fibRecInt = (n, a = 1, b = 0) => {
    if (n === 0) return b;

    return () => fibRecInt(n - 1, a + b, a);
};

// Plain recursion.
// Note that node version 8 no longer supports Tail Call Optimization
// So this is going to blow up for not-so-big values of 'n'
const fibRawRecurse = (n, a = 1, b = 0) => {
    if (n === 0) return b;

    return fibRawRecurse(n - 1, a + b, a);
};


const trampoline = fn => (...args) => {
  let result = fn(...args);

  while (typeof result === "function") {
    result = result();
  }

  return result;
};

//const fib = trampoline(fibRecBigInt);
//fib(BigInt(1e6));

const fib = trampoline(fibRecInt);

//const testFib = 1200; // approaching largest non BigInt
const testFib = 4650; // around where call stack is exceeded in recursion
console.time('trampoline');
console.log('Trampoline on ' + testFib + 'returns:       ' + fib(testFib));
console.timeEnd('trampoline');

console.time('stack');
console.log('Stack recursion on ' + testFib + ' returns: ' + fibRawRecurse(testFib));
console.timeEnd('stack');
