import React from 'react';
import Transition from 'react-transition-group/Transition';
import './Modal.css';

// A Modal message dialog.
// Fade in animation when made visible.
// Opaque-in the main window when made visible.

// Another animation example using react-motion:
// https://github.com/touqeerkhan11/react-portal-example
// Now in UIModal.js file


// ----------------------------------------------------------------------
// Transition definitions for using react transition groups from:
// https://reactcommunity.org/react-transition-group/
// XXX/TODO this should really be part of the component definition.
const transitionDuration = 300;
const defaultStyleModal = {
    transitionDuration: `${transitionDuration}ms`,
    transitionProperty: `opacity`,
};
const transitionStylesModal = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
};

const defaultStyleBackground = {
    transitionDuration: `${transitionDuration}ms`,
    transitionProperty: `background-color`,
};
const transitionStylesBackground = {
    entering: { backgroundColor: `rgba(250, 250, 250, 0.85)` },
    entered: { backgroundColor: `rgba(33, 33, 33, 0.85)` },
};

// Trying to divorce the styles of the content from the styles of the dialog,
// to make the animation of the modal appearing more straightforward.
// The only thing we're rendering directly here is:
// - a "background" div to darken the main window behind the Modal.
// - the actual modal dialog div, into which we stuff the children.
//
// @prop bool {open} - true to show the modal, false to hide
// @prop string {header} - header text to show in the modal
// @prop string {onClose} - callback to call when close() button pressed.
// @prop string {closeMsg} - close button text
class Modal extends React.Component {
    componentDidMount() {
        console.log(`Modal::componentDidMount()`);
    }
    // See note in GameOver Component about difference between componentDidUpdate() here
    // and componentDidMount() there.
    componentDidUpdate() {
        console.log(`Modal::componentDidUpdate()`);
    }

    // A note on <Transition>'s prop's:
    // the "appear" property says to apply the "enter" lifecycle transition on mount
    // the "timeout" property governs how long between applying transitions "entering" and "entered"
    // Since what we want is to apply the initial state (which has a CSS transition with duration),
    // then immediately the end CSS state, we want the top level "timeout" property to be zero.
    //
    // <Transition> is thus just being used as a transparent state machine which we happen to want
    // to apply state 1 (CSS initial) then state 2 immediately (CSS endpoint) and let CSS do the animation.
    //
    // XXX/TODO - Apply CSS styles via class names or something instead of constants in the code...
    render() {
        console.log(`Modal::render()`);
        return this.props.open ? (
            <div>
            <Transition in={this.props.open} timeout={0} appear={true}>
            {(state) => {
                console.log(`Applying background transition state "${state}"`);
                return (
                    <div className="modal-background"
                         style={{...defaultStyleBackground,
                                 ...transitionStylesBackground[state]}}
                    />
                )}
            }
            </Transition>
            <Transition in={this.props.open} timeout={0} appear={true}>
            {(state) => {
                console.log(`Applying modal transition state "${state}"`);
                return (
                    <div role="dialog"
                         className="modal-dialog"
                         style={{...defaultStyleModal,
                                 ...transitionStylesModal[state]}}
                    >
                    {this.props.children}
                    </div>
                )}
            }
            </Transition>
            </div>
        ) : null;
    }

    componentWillUpdate() {
        console.debug(`Modal::componentWillUpdate()`);
    }
    componentWillMount() {
        console.debug(`Modal::componentWillMount()`);
    }
    componentWillUnmount() {
        console.debug(`Modal::componentWillUnmount()`);
    }
}

export default Modal;
