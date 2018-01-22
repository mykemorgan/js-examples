import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Counter from './Counter';
import './App.css';

function reducer() {
    return {
        count: 42
    };
}

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <div className="App">
            <Counter />
        </div>
    </Provider>
);

export default App;
