// Testing defineProperty of Objects
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
//
'use strict';

var assert = require('assert');

var params = {
    amount: 30.00,
    discount_rate: 30,
    get discount() { // enumerable by default!
        return this.amount * this.discount_rate / 100;
    }
};

Object.defineProperty(params, 'other_discount', {
    get: function () {
        return this.amount * 2 * this.discount_rate / 100;
    },
//    enumerable: true // Need to explicitly set when using defineProperty() if want it enumerable
});

var test = {
    amount: 10.00,
    discount_rate: 30,
    discount: 3
};

console.log('Initial params object:');
console.log(params);
console.log(JSON.stringify(params));
console.log(params.amount);
console.log(params.discount_rate);
console.log(params.discount);
console.log(params.other_discount);

console.log('Corrected params object:');
params.amount = 10.00;
console.log(params);
console.log(JSON.stringify(params));
console.log(params.amount);
console.log(params.discount_rate);
console.log(params.discount);
console.log(params.other_discount);

console.log('List of keys:');
console.log(Object.keys(params));
console.log(Object.keys(test));

console.log('deepEquals tests:');
           
try {
    assert.deepEqual(params, test, '1. params with getter deepEquals test object');
    console.log('1. params with getter deepEquals test object');
} catch (err) {
    console.log('Exception - ' + err);
}

try {
    assert.deepEqual(test, params, '2. test object deepEquals params with getter');
    console.log('2. test object deepEquals params with getter');
} catch (err) {
    console.log('Exception - ' + err);
}

try {
    test.discount = 5;
    assert.deepEqual(params, test, '3. params with getter deepEquals test object');
    console.log('3. params with getter deepEquals test object');
} catch (err) {
    console.log('Exception - ' + err);
}

try {
    params.discount = 5;
    assert.deepEqual(params, test, '4. params with getter deepEquals test object');
    console.log('4. params with getter deepEquals test object');
} catch (err) {
    console.log('Exception - ' + err);
}


console.log('\n++++++++++ Property Creation Closures ++++++++++\n');
function createObject(x, y) {
    var foo = 'always present';
    var bar;
    var ret = {};

    // bar only gets set when both x and y passed
    if (x && y) {
        bar = x + y;
    }
    if (foo) {
        ret['prop_foo'] = foo;
    }
    if (bar) {
        ret['prop_bar'] = bar;
    }

    // Use the closure
    Object.defineProperty(ret, 'status_a', {
        get: function() {
            if (bar) {
                return 'status: foo and bar -> ' + foo + ' ' + bar;
            }
            return 'status: only foo -> ' + foo;
        }
    });
    // Use the object's properties
    Object.defineProperty(ret, 'status_b', {
        get: function() {
            if (this.prop_bar) {
                return 'status: foo and bar -> ' + this.prop_foo + ' ' + this.prop_bar;
            }
            return 'status: only foo -> ' + this.prop_foo;
        }
    });

    return ret;
}

var obj1 = createObject();
var obj2 = createObject('w');
var obj3 = createObject('x', 'y');

console.log(obj1);
console.log(obj1.status_a);
console.log(obj1.status_b);

console.log(obj2);
console.log(obj2.status_a);
console.log(obj2.status_b);

console.log(obj3);
console.log(obj3.status_a);
console.log(obj3.status_b);
