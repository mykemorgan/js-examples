// Base64 decode and encode command line arguments.
// If asked to decode, cursory check if result looks like a
// querystring or JSON object, and if so, 
// unpack/display that in a more pretty was as well.
'use strict';

// ES6 modules and 'import' not supported yet in node...
// import { parse } from 'qs';
let qs = require('qs');

function base64_encode(data) {
    return new Buffer(data).toString('base64');
}

function base64_decode(data) {
    return new Buffer(data, 'base64').toString('utf8');
}

function test_encode() {
    let encoded = base64_encode("the quick brown fox jumped over the lazy dog!?!");
    let decoded = base64_decode(encoded);

    console.log(`Encoded string: [${encoded}]`);
    console.log(`Decoded string: [${decoded}]`);
}

function get_program_mode(args) {
    let mode = 'decode'; // default to decoding
    if (args[1].endsWith('encode')) {
        mode = 'encode';
    } else if (args[1].endsWith('decode')) {
        mode = 'decode';
    }
    return mode;
}

function attempt_pretty_display(decoded) {
    if (decoded[0] === '{') {
        let parsed = JSON.parse(decoded);
        console.log(`[32mJSON Object[0m = ${JSON.stringify(parsed, null, '\t')}`);
    }
    else if (decoded.includes('&')) {
        // Instead of parsing this ourselves, use 'qs' package:
        console.log(`[32mQuery Args[0m = ${JSON.stringify(qs.parse(decoded), null, '\t')}`);
    }
}

function do_decoding(index, data) {
    let decoded = decodeURIComponent(base64_decode(data));
    console.log(`[32mDecoding Arg${index-1}[0m: [${decoded}]`);
    attempt_pretty_display(decoded);
}

let mode = get_program_mode(process.argv);

if (mode === 'encode') {
    console.log('\nGlobal Encoding Mode -------------------------------------\n');
} else if (mode === 'decode') {
    console.log('\nGlobal Decoding Mode -------------------------------------\n');
}

process.argv.forEach((val, index) => {
    if (index < 2) { return; }

    switch (val) {
    case '--encode':
        mode = 'encode';
        return;
    case '--decode':
        mode = 'decode';
        return;
    } 

    if (mode === 'encode') {
        let encoded = base64_encode(val);
        console.log(`Encoding Arg${index-1}: [${encoded}]`);
    } else if (mode === 'decode') {
        do_decoding(index, val);
    } else {
        console.log(`Arg${index-1}: mode not set for arg [${val}]`);
    }
});
