var bb = require('bluebird');

var promises1 = [

    bb.resolve(1),
    bb.resolve(0),
    bb.reject(new Error('foo'))
];

var promises2 = [

    bb.resolve(1),
    bb.resolve(2)
];

var promises3 = [

    bb.resolve(0),
    bb.reject(new Error('foo'))
];

function didAllPromisesFail(collection, criteria) {
    
    if (!criteria) {
        criteria = function(item) {
            return !item;
        };
    }

    return bb.all(collection.map(function(item) {

        return bb.cast(item)
            .then(function(value) {

                if (criteria(value)) {
                    return false;
                }

                return true;

            }).catch(function(err) {

                return false;
            });

    })).then(function(results) {

        return results.every(function(item) {
            return !item;
        });
    });
}


didAllPromisesFail(promises1).then(function(result) {
    console.log('promises1', result);
});

didAllPromisesFail(promises2).then(function(result) {
    console.log('promises2', result);
});

didAllPromisesFail(promises3).then(function(result) {
    console.log('promises3', result);
});


// Other samples.
bb.delay(500).then(function() {
    console.log("500 ms passed");
    return "Hello world";
}).delay(500).then(function(helloWorldString) {
    console.log(helloWorldString);
    console.log("another 500 ms passed") ;
});
