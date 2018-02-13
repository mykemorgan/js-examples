function rejectPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 2000, 'reject after two seconds');
        setTimeout(resolve, 3000, 'resolve after three seconds');
    });
}

function doPromiseChain() {
    console.log(`Calling rejectPromise()`);
    rejectPromise().then(value => {
        console.log(`Showing rejectPromise success: ${value}`);
    }).catch(err => {
        console.log(`Showing rejectPromise catch: ${err}`);
    });
}

doPromiseChain();

// Below is not supported in the REPL environment until node v10.0
// As of Feb, 2018 they still working on both the behavior and back
// porting to v9...
// https://github.com/nodejs/node/issues/13209
//
// function doAwait() {
//     console.log(`Calling rejectPromise()`);
//     try {
//         let value = await rejectPromise();
//         console.log(`Showing rejectPromise success: ${value}`);
//     } catch (err) {
//         console.log(`Showing rejectPromise failing: ${err}`);
//     }
// }
//
// doAwait();
