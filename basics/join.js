// Run with node, and can see consol.log on the console.
// Avoid having to load in a browser.
// % node join.js
var currencies = ['USD', 'EUR', 'CNY'];

var joined = currencies.join('","USD');
console.log(joined);
var catjoined = 'USD' + currencies.join('","USD');
console.log(catjoined);

var PATTERN = 'in ("PAIRS")';
var replaced = PATTERN.replace('PAIRS', 'USD' + currencies.join('","USD'));
console.log(replaced);
