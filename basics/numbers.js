'use strict';

var assert = require('assert');
var use_v4 = false;

var number = 10.00;
var str = '10.00';
var obj_n = { value: number };
var obj_s = { value: str };

try {
    assert(number == str, 'number == str'); // fine, type coercion before compare
} catch (err) {
    console.log(err);
}

try {
    assert(number === str, 'number === str'); // throws
} catch (err) {
    console.log(err);
}

try {
    assert.deepEqual(obj_n, obj_s, 'obj_n deep equaled obj_s'); // fine: apparently coreces also?
} catch (err) {
    console.log(err);
}

if (use_v4) {
    try {
        assert.deepStrictEqual(obj_n, obj_s, 'obj_n strict deep equaled obj_s'); // throws. But need Node v4 or core-assert module
    } catch (err) {
        console.log(err);
    }
}

if ('10.00' === '10.0') {
    console.log('strings equal!');
} else {
    console.log('strings NOT equal!');
}
if (+('10.00') == +('10.0')) {
    console.log('numbers equal!');
} else {
    console.log('numbers NOT equal!');
}

str='10.00';
console.log(str);
console.log(+(str));
str='10.44';
console.log(str);
console.log(+(str));
str='10.77';
console.log(str);
console.log(+(str));

str='banana';
console.log(str);
console.log(+(str));

if (+(str) >= 0)
    console.log('+(banana) greater than zero');
else
    console.log('+(banana) not greater than zero');

console.log(NaN >= 0);
console.log(NaN < 0);


function show_number(num) {
    console.log('Displaying number ' + num + ' -------------');
    console.log(+(num));
    console.log((+(num)).toFixed(2));
}


console.log('...');

show_number(10.444);
show_number(10.777);
show_number('10.444');
show_number('10.777');
show_number('10.707');

console.log('...');

let round = 1.5050;
console.log(round);
console.log(+(round));
console.log(+(round).toFixed(2));

let round2 = '1.5051';
console.log(round2);
console.log(+(round2));
console.log((+(round2)).toFixed(2));

// Number.prototype.toFixed() has an interesting view of what "round" means???
assert((+('1.5050')).toFixed(2) === '1.50'); // true
assert((+('1.5051')).toFixed(2) === '1.51'); // true
