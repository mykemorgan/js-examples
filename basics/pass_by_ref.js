// JS pases by value, so you can have a function modify an object but not change the assignment
// of that object.

console.log('foo() pass by value test -----------------------');
function foo (a) {
    a = 5;
};

var a = 1;
console.log(a); // 1
foo(a);
console.log(a); // 1 still


function foo_attr (a) {
    a['attr'] = 5;
};

var attr = {};
console.log(attr); // empty
foo_attr(attr);
console.log(attr); // has 'attr'

console.log('x() use closure instead test -------------------');

// Use a closure instead if you have short functions:
function x() {
    var a;
    function y() {
        a = a || 1;
        console.log('in y()     - ' + a);
    }
    console.log('before y() - ' + a);
    y();
    console.log('after y()  - ' + a);
}
x();
