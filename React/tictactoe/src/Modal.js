import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

// A Modal message dialog. When it is rendered:
// - Fade in animation.
// - Opaque-in the main window.

// The only thing we're rendering directly here is:
// - a "background" div to darken the main window behind the Modal.
// - the actual modal dialog div, into which we stuff the passed children.
//
// @prop bool {open} - true to show the modal, false to hide
class Modal extends React.Component {
    componentDidMount() {
        console.log(`Modal::componentDidMount()`);
    }
    // See note in GameOver Component about difference between componentDidUpdate() here
    // and componentDidMount() there.
    componentDidUpdate() {
        console.log(`Modal::componentDidUpdate()`);
    }

    // A note on <Transition>'s (the delegate of CSSTransition) prop's:
    // - "appear" property says to apply the "enter" lifecycle transition on mount
    // - "timeout" property governs how long between applying transitions "entering" and "entered"
    // Since what we want is to apply the initial state (which has a CSS transition with duration),
    // then immediately the end CSS state, we want the top level "timeout" property to be zero.
    //
    // <Transition> is thus just being used as a transparent state machine which we happen to want
    // to apply state 1 (CSS initial) then state 2 immediately (CSS endpoint) and let CSS do the animation.
    //
    // A note on <CSSTransition>'s props, and the timeout difference:
    // - Remember, the appear class is applied then the appear-active is applied NEXT TICK!
    // - "timeout" prop is when the applied tags (e.g. appear/appear-active) are REMOVED from the child!
    //   This means the component will REVERT back to its default state...
    //   Pass no "timeout" prop to keep the new tags forever (which is what we want in a Modal)
    //
    // - Sadly, "timeout" is a required property of CSSTransition and Transition, so can't omit it.
    //   A solution is to make the default CSS of the background and dialog be the end state, and apply the
    //   begin then end states together to trigger the transition. But then the "timeout" here has to be
    //   longer than transition timeout. Can we grab that timeout from the transition timeout somehow?
    //
    // <CSSTransition> thus is just being used to apply and remove class names to and from its children.
    render() {
        console.log(`Modal::render()`);
        return this.props.open ? (
            <div>
            <CSSTransition in={this.props.open} classNames="modal-background" appear={true} timeout={1000}>
            <div className="modal-background"/>
            </CSSTransition>
            <CSSTransition in={this.props.open} classNames="modal-dialog" appear={true} timeout={1000}>
                <div role="dialog" className="modal-dialog">
                    {this.props.children}
                </div>
            </CSSTransition>
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
