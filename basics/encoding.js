// ********************************************************************************
// This file does not yet work / isn't finished.
// Checking in to save it.
// ********************************************************************************

// Base64 test and debugging of decode and encode
// If asked to decode, cursory check if result looks like a
// querystring or JSON object, and if so, 
// unpack/display that in a more pretty was as well.
'use strict';

// TODO get ES6 modules and 'import' to work with new node vesion
// import { parse } from 'qs';
let qs = require('qs');


function base64_encode(data) {
    return new Buffer(data).toString('base64');
}

function base64_decode(data) {
    return new Buffer(data, 'base64').toString('utf8');
}

function do_decoding(index, data) {
    try {
        let decoded = decodeURIComponent(base64_decode(data));
        console.log(`[32mDecoding Arg${index-1}[0m: [${decoded}]`);
        attempt_pretty_display(decoded);
    } catch (err) {
        console.log(`Looks like something went wrong decoding: ${err.name} - ${err.message}`);
        console.log(`Aborting...`);
    }
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


function do_test() {
    var encoded;
    var decoded;
    try {
        encoded = base64_decode(xclick_params);
        console.log(`Base64 Decoded:\n${encoded}\n`);

        decoded = decodeURIComponent(encoded);
        console.log(`URI Decoded:\n${decoded}\n`);
        
    } catch(err) {
        console.log(`Looks like something went wrong decoding entire object: ${err.name} - ${err.message}`);
        decodePieces(encoded);
    }
}

function decodePieces(encoded) {
    const sep = encodeURIComponent('&');
    console.log(`Splitting at separator: "${sep}"`);

    try {
        var pieces = encoded.split(sep);
        pieces.forEach((piece, index) => {
            console.log(`Piece [${index+1}] - "${piece}" ->`);

            var decoded_piece = decodeURIComponent(piece);
            console.log(`              ${decoded_piece}`);

            var nvp = decoded_piece.split('=');
            var decoded_val = decodeURIComponent(nvp[1]);
            console.log(`       value: ${decoded_val}`);
        });
    } catch(err) {
        console.log(`Looks like something went wrong decoding piece: ${err.name} - ${err.message}`);
        console.log(`Aborting`);
        throw new Error(err.message);
    }
}

//do_test();

// Looks like it's the dangling '%2' that's the problem.
// It's not a fully-formed HTML escaped chatacter... (needs 2 digits)
var last_bad_piece = 'item_number_16%3d175882%26item_name_16%3dSucre%2520en%2';
decodePieces(last_bad_piece);
