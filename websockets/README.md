## Extreme Websockets
#### workshop with Derek Anderson

[https://websocket.org/echo.html](Example websocket echo app)

[https://github.paypal.com/gist/dereanderson/0c4573525c45d31fc30432d5d73b24a9](Workshop gist)

##### Setup

Wants everyone to use node v8 and npm v5 so we're on the same versions.

Install:
- npm v5.3.0
- node 8.2.1

Tip: Can use `nrm` to manage where npm points to.

Also will eventually use: webpack's `worker-loader` module: [https://github.com/webpack-contrib/worker-loader](webpack worker loader)

This is to offload all the websocket work into a separate browser
thread so that the main window thread is not the thing handling all
the message request processing.
