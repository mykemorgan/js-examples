var promises1 = [

    Promise.resolve(1),
    Promise.resolve(0),
    Promise.reject(new Error('foo'))
];

var promises2 = [

    Promise.resolve(1),
    Promise.resolve(2)
];

var promises3 = [

    Promise.resolve(0),
    Promise.reject(new Error('foo'))
];

// Did all promises in a collection of promises fail?
// "Fail" being, not meeting 'criteria', or being rejected.
// With reasonable default for "criteria".
function didAllPromisesFail(collection, criteria) {

    if (!criteria) {
        criteria = function(item) {
            return !item;
        };
    }

    // Iterate over all the collection and attempt to resolve/reject each promise,
    // mapping the collection into a true/false array.
    return Promise.all(collection.map(function(item) {
        return Promise.resolve(item)
            .then(function(value) {
                if (criteria(value)) {
                    return false;
                }
                return true;
            }).catch(function(err) {
                return false;
            });
    })).then(function(results) {
        // If Promise.all() fulfills, 'results' is an array of the results of the promises in it's input
        // So iterate over the arrary making sure they are all false.
        return results.every(function(item) {
            return !item;
        });
    });
}


didAllPromisesFail(promises1).then(function(result) {
    console.log(`didAllPromisesFail(promises1): ${result}`);
});

didAllPromisesFail(promises2).then(function(result) {
    console.log(`didAllPromisesFail(promises2): ${result}`);
});

didAllPromisesFail(promises3).then(function(result) {
    console.log(`didAllPromisesFail(promises3): ${result}`);
});



// ----------------------------------------------------------------------
// Delay promises.
// ----------------------------------------------------------------------
function delay(time) {
    return new Promise((resolve) => {
        return setTimeout(resolve, time);
    });
}

const my_delay = 1500;

console.log(`Starting delay example...`);
delay(my_delay).then(() => {
    console.log(`${my_delay} ms passed`);
    return "Hello world promise result";
}).then((value) => {
    console.log(`beginning another ${my_delay} ms delay`);
    return delay(my_delay).then(() => {
        console.log(`second ${my_delay} ms passed`) ;
        return value;
    });
}).then(function(helloWorldString) {
    console.log(helloWorldString);
});

// ----------------------------------------------------------------------
// Another Promise.all() example of fast-failing
// ----------------------------------------------------------------------
console.log(`Starting fast-fail of Promise.all()`);

var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'one seconds');
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two seconds');
});
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'three seconds');
});
var p4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 4000, 'four seconds');
});
var p5 = new Promise((resolve, reject) => {
    reject('Immediate reject promise');
});

// Can't decide if this is formatted nicer than below...
Promise.all([p1, p2, p3, p4, p5])
    .then(values => {
        console.log(values);
    }, rejectReason => {
        console.log(rejectReason);
    });

// Can't decide if this is formatted nicer than above...
Promise.all([p1, p2, p3, p4]).then(values => {
    console.log(values);
}, rejectReason => {
    console.log(rejectReason);
});

// catch() is mostly equivalent to then with second argument.
console.log(`Starting fast-fail of Promise.all() with catch()`);

// Can't decide if this is formatted nicer than below...
Promise.all([p1, p2, p3, p4, p5])
    .then(values => {
        console.log(values);
    })
    .catch(reason => {
        console.log(reason);
    });

// Can't decide if this is formatted nicer than above...
Promise.all([p1, p2, p3, p4]).then(values => {
    console.log(values);
}).catch(reason => {
    console.log(reason);
});


// ----------------------------------------------------------------------
// Need an example of what happens when sub-code throw()'s
// ----------------------------------------------------------------------
