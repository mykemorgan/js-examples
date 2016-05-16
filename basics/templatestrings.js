let x = 1;
let y = 2;
let fooTemplate = `x + y = ${x+y} yay`;
let fooOldStyle = 'x + y = ' + x+y + ' yay';

let obj = {
    a: x,
    b: y
};

console.log(fooTemplate);
console.log(fooOldStyle);

