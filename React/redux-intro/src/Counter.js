import React from 'react';
import { connect } from 'react-redux';
import './Counter.css';


class Counter extends React.Component {
    state = {
        count: 0
    }

    increment = () => {
        // connect also passes us the dispatch function
        this.props.dispatch({ type: 'INCREMENT'});
    }

    decrement = () => {
        // connect also passes us the dispatch function
        this.props.dispatch({ type: 'DECREMENT'});
    }

    render() {
        return (
            <div>
                <h2>Counter</h2>
                <div>
                    <button className="decrement action" onClick={this.decrement}>-</button>
                    <span className="counter"> {this.props.count} </span>
                    <button className="increment action" onClick={this.increment}>+</button>                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { count: state.count }
}

export default connect(mapStateToProps)(Counter);
