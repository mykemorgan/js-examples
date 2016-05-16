// Base64 decode and encode command line arguments.
// If asked to decode, cursory check if result looks like a
// querystring or JSON object, and if so, 
// unpack/display that in a more pretty was as well.
'use strict';

let object = {
    amount: '10.00',
    tax_rate: '5.00',
    item_name: 'Sample Item',
    selections: [ 'red', 'blue' ],
    numbers: [ 1, 2, 3 ]
};

function box(message) {
    let length = message.length + 2;
    let boundary = `+${'-'.repeat(length)}+`;
    console.log(boundary);
    console.log(`| ${message} |`);
    console.log(boundary);
}

box('object');
console.log(object);

box('{ wps: object }');
console.log({ wps: object });

box('JSON.stringify(object)');
console.log(JSON.stringify(object));

box('{ wps: JSON.stringify(object) }');
console.log({ wps: JSON.stringify(object) });


// URI encoding/decoding
console.log(encodeURIComponent('abcdefghijklmnopqrstuvwxyz1234567890'));
console.log(encodeURIComponent('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
console.log(encodeURIComponent('_.-!*\'()<>{}[]@#$%^&+=\|;:"/?,'));
console.log(decodeURIComponent('This%20has%20spaces'));
console.log(decodeURIComponent('%20%21%22%23%24%25%26%27%28%29%2A%2B%2C%2D%2E%2F'));
console.log(decodeURIComponent('%30%31%32%33%34%35%36%37%38%39%3A%3B%3C%3D%3E%3F'));
console.log(decodeURIComponent('%40%41%42%43%44%45%46%47%48%49%4A%4B%4C%4D%4E%4F'));
console.log(decodeURIComponent('%50%51%52%53%54%55%56%57%58%59%5A%5B%5C%5D%5E%5F'));
