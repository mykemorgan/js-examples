import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Counter from './Counter';
import './App.css';

// Master reducer needs an initial state.
const initialState = { count: 0 };

// Remember: pure functional. Don't modify state but rather return the new one.
function reducer(state = initialState, action) {
    switch (action.type) {
    case 'INCREMENT':
        return {
            count: state.count + 1
        };
    case 'DECREMENT':
        return {
            count: state.count - 1
        };
    default:
        return state;
    }
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
