'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

function test() {
    let o1 = { a: 1 };
    let o2 = { b: 2 };
    let o3 = { c: 3 };
    let o4 = { b: 'duplicate key' };
    let obj1, obj2;
    
    console.log('Jamming everything into one object with overlapping keys');
    console.log(o1);
    obj1 = Object.assign({}, o1, o2, o3, o4);
    console.log(o1);
    console.log(obj1);

    console.log('Jamming everything into an existing object with overlapping keys');
    console.log(o1);
    obj2 = Object.assign(o1, o2, o3, o4);
    console.log(o1);
    console.log(obj2);
    if (o1 === obj2) {
        console.log("base object equals returned");
    } else {
        console.log("base object not equal to returned");
    }

    if (obj1 === obj2) {
        console.log("assigned objects equal");
    } else {
        console.log("assigned objects not equal");
    }
}

test();
