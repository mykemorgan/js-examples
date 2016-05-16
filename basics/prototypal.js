'use strict';

let animal = {
    type: 'animal',

    describe () {
        return `An ${this.type} with ${this.legs} legs.`;
    }
};

let mouse = {
    type: 'mouse',
    legs: 4,
    fur: 'brown'
};

let ninja = {
    type: 'ninja',
    legs: 2,
    weapon: 'dagger'
};


let mouse_animal = Object.assign(Object.create(animal),
                                 mouse);
let ninja_mouse_animal1 = Object.assign(Object.create(animal),
                                        mouse,
                                        ninja);
let ninja_mouse_animal2 = Object.assign(Object.create(mouse_animal),
                                        ninja);

console.log('----------');
console.log(animal);
console.log(animal.describe());

console.log('----------');
console.log(Object.assign(Object.create(animal)));
console.log(Object.assign(Object.create(animal)).describe());

console.log('----------');
console.log(Object.create(animal));
console.log(Object.create(animal).describe());

console.log('----------');
console.log(mouse_animal);
console.log(mouse_animal.describe());

console.log('----------');
console.log(Object.create(mouse_animal));
console.log(Object.create(mouse_animal).describe());

console.log('----------');
console.log(ninja_mouse_animal1);
console.log(ninja_mouse_animal1.describe());

console.log('----------');
console.log(ninja_mouse_animal2);
console.log(ninja_mouse_animal2.describe());

