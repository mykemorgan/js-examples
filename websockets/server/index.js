const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Server App
app.get('/', (req, res) => {
    res.send(`Hello, The Server is Up!`);
});

io.on('connection', (socket) => {
    var numberReceived = 0;
    console.log(`connected!`);
    // (Some advice on sending a message event key and an object with only one NVP I didn't catch)
    socket.emit('foo', {foo: 'bar'});

    // Only do a listen after got a connection: keeps connection overhead down.
    socket.on('fooClient', (data) => {
        console.log(`Received data #${++numberReceived} - ${JSON.stringify(data)}`);
        // Wait a little bit to simulate processing.
        setTimeout(() => {
            socket.emit('foo', {foo: 'baz'});
        }, 1000);
    });
});

http.listen(3000, () => {
    console.log(`Listening on *:3000`);
});

