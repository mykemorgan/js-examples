import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Tooltip.css';

// A Tooltip message dialog Component. When it is rendered:
// - Fade in animation.
// - Opaque-in the main window.
// This is simply a "different type of window" to test out Portal (alongside Modal)
// with different Components to render.
// XXX - This is not really a "tooltip" :)

// The only thing we're rendering directly here is:
// - a "background" div to darken the main window behind the Tooltip.
// - the actual Tooltip dialog div, into which we stuff the passed children.
//
// @prop bool {open} - true to show the Tooltip, false to hide
class Tooltip extends React.Component {
    componentDidMount() {
        console.log(`Tooltip::componentDidMount()`);
    }
    // See note in GameOver Component about difference between componentDidUpdate() here
    // and componentDidMount() there.
    componentDidUpdate() {
        console.log(`Tooltip::componentDidUpdate()`);
    }

    render() {
        console.log(`Tooltip::render()`);
        return this.props.open ? (
            <div>
            <CSSTransition in={this.props.open} classNames="tooltip-background" appear={true} timeout={1000}>
            <div className="tooltip-background"/>
            </CSSTransition>
            <CSSTransition in={this.props.open} classNames="tooltip" appear={true} timeout={1000}>
                <div role="dialog" className="tooltip-dialog">
                    {this.props.children}
                </div>
            </CSSTransition>
            </div>
        ) : null;
    }

    componentWillUpdate() {
        console.debug(`Tooltip::componentWillUpdate()`);
    }
    componentWillMount() {
        console.debug(`Tooltip::componentWillMount()`);
    }
    componentWillUnmount() {
        console.debug(`Tooltip::componentWillUnmount()`);
    }
}

export default Tooltip;
