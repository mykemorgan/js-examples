// Example: thrown exceptions in callbacks can't be caught at the original level
//
try {
    console.log(`Before setting up timeout`);
    setTimeout(() => {
        console.log(`Timeout triggered in callback\n`);
        throw new Error(`My error in callback`);
    }, 1000);
    console.log(`After setting up timeout`);
} catch (err) {
    console.log(`\n*** Caught the error: ${err.message}\n`);
}

console.log(`Yay done with the setup`);
