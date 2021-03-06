'use strict';

// Destructuring assignment examples.
//
// This doesn't work through node v5
// Node ^6 seems to support ES6 stuff. Or, at least this part of it anyway. Use 6.9.5:
// % nvm exec 6.9.5 node destructuring.js
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

function test1() {
    let key = 'z';
    let { [key]: foo } = { z: 'bar' };

    console.log('test1() -----------------------------------------------------------');
    console.log(foo); // "bar"
}

function test2_1() {
    let o = {p: 42, q: true};
    let {p, q} = o;

    console.log('test2_1() -----------------------------------------------------------');
    console.log(p); // 42
    console.log(q); // true 

    // Assign new variable names
    let {p: foo, q: bar} = o;

    console.log(foo); // 42
    console.log(bar); // true

}

function test2_2() {
    let o = [42, 13, 7];
    let [p, q] = o;

    console.log('test2_2() -----------------------------------------------------------');
    console.log(p); // 42
    console.log(q); // 13

    // Assign new variable names
    let [foo, , bar] = o;

    console.log(foo); // 42
    console.log(bar); // 7

}

function test3() {
    let person = {
        id: 1234,
        name: {
            first: 'myke',
            last: 'morgan'
        },
        url: 'http://www.myke.com'
    };

    let {id: identifier, name: { first: first_name, last: last_name }} = person;

    console.log('test3() -----------------------------------------------------------');
    console.log(person);
    console.log(identifier);
    console.log(first_name + ' ' + last_name);
}

function test4() {
    let agent = {
        id: 1234,
        aliases: [
            {
                name: {
                    first: 'myke',
                    last: 'morgan'
                },
            },
            {
                name: {
                    first: 'mike',
                    last: 'morgan'
                },
            },
            {
                name: {
                    first: 'michael',
                    last: 'morgan'
                },
            }
        ],
        url: 'http://www.myke.com'
    };

    let { id: code, url, aliases } = agent;

    console.log('test4() -----------------------------------------------------------');
    console.log(agent);
    
    console.log('Code: ' + code);
    console.log('URL:  ' + url);

    for (let { name: {first: first_name}, name: {last: last_name} } of aliases) {
        console.log('alias: ' + first_name + ' ' + last_name);
    }
}

test1();
test2_1();
test2_2();
test3();
test4();
