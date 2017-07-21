var grapnel = require('grapnel');
var router = new grapnel();
let numberSends = 0;

// Client Browser App
router.get('', (req) => {
    // default reply
    document.body.innerHTML = `welcome to the workshop myke `;

    let button = document.createElement('button');
    button.textContent = 'Press Me!';
    button.onclick = () => {
        console.log(`Sending fooClient! ${++numberSends}`);
        socket.emit('fooClient', {'fooClient': 'bar'});
    };
    document.body.appendChild(button);

    // Subscribe and listen to the web socket!
    const socket = require('socket.io-client')('http://localhost:3000');

    // Lifecycle hooks.
    socket.on('connect', function() {});
    socket.on('disconnect', function() {});

    // Listen for some object (event key) on the socket.
    socket.on('foo', (data) => {
        console.log(data);
        if (data.foo === 'baz') {
            alert('Got a baz!');
        }
    });
});
