// Object examples and testing


function test_key_iteration()
{
    const obj = {
        pres: {
            p1: 'one',
            p2: 'two'
        },
        inputs: {
            in1: 'input1',
            in2: 'input2',
            in3: 'input3',
            in4: 'input4',
        },
        flow: {
            f1: 'flow'
        }
    };

    Object.defineProperty(obj, 'gimmie_first', {
        get: () => {
            return `${obj.pres.p1} + ${obj.inputs.in1} + ${obj.flow.f1}`;
        }
    });
    Object.defineProperty(obj, 'gimmie_second', {
        get: () => {
            return `${obj.pres.p2} + ${obj.inputs.in2}`;
        },
        enumerable: true
    });
    
    console.log(`Master obj has ${Object.keys(obj).length} keys:`);
    console.log(JSON.stringify(obj, null, '\t'));
    console.log(`Master obj has getter to get: "${obj.gimmie_first}"`);

    console.log('**** for (let key in Object.keys(obj)) ->');
    for (let key in Object.keys(obj)) {
        console.log(`Key ${key} value is ${Object.keys(obj)[key]}`);
        console.log(`obj[Object.keys(obj)[${key}]] is ${JSON.stringify(obj[Object.keys(obj)[key]])}`);
    }
    console.log('**** for (let key in obj) ->');
    for (let key in obj) {
        console.log(`Key ${key} - obj.${key} is ${JSON.stringify(obj[key])}`);
        if (typeof obj[key] === "object") {
            console.log(`obj.${key} itself has ${Object.keys(obj[key]).length} keys`);
            for (let subkey in obj[key]) {
                console.log(`   Subkey ${subkey} - obj.${key}.${subkey} is ${JSON.stringify(obj[key][subkey])}`);
                console.log(`   obj.${key}.${subkey} is ${obj[key][subkey]}`);
            }
        }
        else {
            console.log(`obj.${key} itself is not an object`);
        }
    }
}

test_key_iteration();

