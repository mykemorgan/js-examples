'use strict';

const mapAndRedirect = () => (req, res) => {
    console.log('entering middleware');
    res.foo = req.foo;
};

console.log('begin test');
var middle = mapAndRedirect();

console.log('got the middleware:');
console.log(middle);

var req = { foo: 'my foo', bar: 'my bar' };
var res = {};

console.log('about to invoke middleware. req/res:');
console.log(req);
console.log(res);
middle(req,res);
console.log('invoked middleware. req/res:');
console.log(req);
console.log(res);

