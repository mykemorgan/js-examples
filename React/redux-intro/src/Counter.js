import React from 'react';
import './Counter.css';


class Counter extends React.Component {
    state = {
        count: 0
    }

    increment = () => {
        this.setState({ count: this.state.count + 1 });
    }

    decrement = () => {
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        return (
            <div>
                <h2>Counter</h2>
                <div>
                    <button className="decrement action" onClick={this.decrement}>-</button>
                    <span className="counter"> {this.state.count} </span>
                    <button className="increment action" onClick={this.increment}>+</button>                    
                </div>
            </div>
        )
    }
}

export default Counter;
