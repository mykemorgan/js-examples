import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import assert from 'assert';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);
});

it('renders the initial Game status properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);

    const status = div.getElementsByClassName('status');
    assert.equal(status.length, 1, `Found wrong number of status classes: ${status.length}`);
    Array.prototype.filter.call(status, stat => {
        assert.strictEqual(stat.innerHTML, 'Next player: X', `Initial status not correct`);
    });
});
