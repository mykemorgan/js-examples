
var foo;

function createFoo(value) {
    if (value > 0) {
        return value;
    }
}

console.log('Starting foo = ' + foo);

if (foo = createFoo(-10)) {
    console.log('Created foo! -> ' + foo);
}
console.log('Now foo = ' + foo);

if (foo = createFoo(10)) {
    console.log('Created foo! -> ' + foo);
}
console.log('Now foo = ' + foo);

