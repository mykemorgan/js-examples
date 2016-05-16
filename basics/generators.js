// From: https://github.com/DrkSephy/es6-cheatsheet
//
// Generators are similar to python generators
// 'use strict';

var http = require('http');

console.log(`Generator1 -----------------------------------------`);

function* simpleGenerator1() {
    yield 1;
    yield 2;
    yield 3;
}

var generator1 = simpleGenerator1();
console.log(generator1.next()); // { value: 1, done: false }
console.log(generator1.next()); // { value: 2, done: false }
console.log(generator1.next()); // { value: 3, done: false }
console.log(generator1.next()); // { value: undefined, done: true }


console.log(`Generator2 in a loop ------------------------------`);

function* simpleGenerator2() {
    for (let i = 1; i <= 4 ; i += 1) {
        yield i*i;
    }

    return `we are done`;
}

let generator2 = simpleGenerator2();
let next = generator2.next();
while (next.done === false) {
    console.log(next);
    next = generator2.next();
}
console.log(next); // { value: 'we are done', done: true }


// -------------------------------------------------------------------------------
// The below is from the ES6 cheatsheet here: https://github.com/DrkSephy/es6-cheatsheet
// It seems like either a really confusing or incomplete explanation of the example
// of "async code in an sync manner".
//
// Perhaps read this blog further instead?
// https://davidwalsh.name/es6-generators

// Me trying to get the above to work:
function run_time() {
    var generator;

    //  we can utilize Generators to write asynchronous code in a synchronous manner:
    function request(url) {
        function callback(response) {
            console.log(`Client callback called`);
            
            response.setEncoding('utf8'); // Needed so 'on' returns Strings not Buffers
            // console.log(response.headers);
            response.on('data', function (data) {
                generator.next(data);
                // console.log(data);
            });
            // response.on('error', function (err) {
            //     generator.next(response);
            //     console.error("Got an error: " + err.message);
            // });
        }

        console.log(`Sending GET to ${url}`);
        http.get(url, callback);
        console.log(`GET sent to ${url}`);
        return 'foo';
    }

    // And here we write a generator function that will return our data:
    // By the power of yield, we are guaranteed that entry1 will have the
    // data needed to be parsed and stored in data1.
    function* getTimeData() {
        console.log(`gtd 1`);
        var entry1 = yield request('http://localhost:8080/api/gettime');
        console.log(`gtd post yield 1 - ${entry1}`);
        var data1  = JSON.parse(entry1);
        console.log(`gtd post parse 1 - `, data1);
        var entry2 = yield request('http://localhost:8080/api/unixtime?iso=123');
        console.log(`gtd post yield 2 - ${entry2}`);
        var data2  = JSON.parse(entry2);
        console.log(`gtd post parse 2 - `, data2);

        yield {d1: data1,
               d2: data2};
    }

    console.log(`run_time() begin`);
    generator = getTimeData();
    console.log(`Initialized generator`);
    let timeval = generator.next();
    console.log(`Done with everything! Result: `, timeval);
    // Of course the results is {value: 'foo', done: 'false'} because it just returns the first yield,
    // which is the return value of request(), which is 'foo'. And since there's another yield in the
    // generator, it's not done().
    // If we squeeze out the generator by calling next() here, then the generator function
    // lacks the return value from the yields to parse the entry into the data...
    // WTF is that cheatsheet talking about?!?
}


console.log('----------------------------------------------------------------------');
console.log('Time Generator:');
run_time();
console.log('Done with Time Generator');

// -------------------------------------------------------------------------------
// More confusing stuff from the cheatsheet:

// function request(url) {
//     return new Promise((resolve, reject) => {
//         getJSON(url, resolve);
//     });
// }

// function iterateGenerator(gen) {
//     var generator = gen();
//     (function iterate(val) {
//         var ret = generator.next();
//         if(!ret.done) {
//             ret.value.then(iterate);
//         } 
//     })(); 
// }

// iterateGenerator(function* getData() {
//     var entry1 = yield request('http://some_api/item1');
//     var data1  = JSON.parse(entry1);
//     var entry2 = yield request('http://some_api/item2');
//     var data2  = JSON.parse(entry2);
// });
