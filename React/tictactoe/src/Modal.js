import React from 'react';
import './Modal.css';

// A Modal message dialog.
// Fade in animation when made visible.
// Opaque-in the main window when made visible.

// XXX/TODO Other things to look into for animating the modal:
// https://reactcommunity.org/react-transition-group/
// The above seems non-obvious for portals? But maybe with this new Portal around Modal scheme.
//
// Or, try this guy's example using react-motion:
// https://github.com/touqeerkhan11/react-portal-example
// Now in UIModal.js file

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
    //
    // Therefore if we set set an animation timeout it has to be:
    // in DidMount in GameOver, called after render().
    // in DidUpdate in Model, also called after render().
    componentDidUpdate() {
        console.group(`Modal::componentDidUpdate()`);
        // Don't do the open animation after the window closed.
        // XXX/mm Do a close animation instead in the WillUpdate?
        if (!this.props.open) {
            console.debug(`Closing Modal: skipping animation`);
            console.groupEnd(`Modal::componentDidUpdate()`);
            return;
        }

        console.log(`Modal animation timeout launched DidUpdate()`);
        // If we set set an animation timeout it has to be here.

        // XXX/mm Fine for a test but we can't be having the Modal hard code the animation...
        //        Should really call a callback to invoke to do the animation.
        // XXX/mm Also, should be setting a named set of properties from .css file, not hard coding it.
        //        Maybe this is where we need to use CSSTransition component?
        setTimeout(() => {
            console.log(`Modal timeout triggered after DidUpdate`);
            // document.getElementById('modal-dialog').style.add('.modal-dialog-open');
            // XXX/mm Getting dialog here with get by class feels like a hack. Probably should save it somehow?
            let dialogs = document.getElementsByClassName('modal-dialog');
            console.log(`Found ${dialogs.length} modal-dialogs`);
            if (dialogs && dialogs[0]) {
                dialogs[0].style.opacity = '1.0';
            }

            let backgrounds = document.getElementsByClassName('modal-background');
            console.log(`Found ${backgrounds.length} modal-backgrounds`);
            if (backgrounds && backgrounds[0]) {
                backgrounds[0].style.backgroundColor = 'rgba(33, 33, 33, 0.85)';
            }
        }, 1);
        console.groupEnd(`Modal::componentDidUpdate()`);
    }

    // Trying to divorce the styles of the content from the styles of the dialog,
    // to make the animation of the modal appearing more straightforward.
    // The only thing we're rendering directly here is:
    // - a "background" div to darken the main window behind the Modal.
    // - the actual modal dialog div, into which we stuff the children.
    render() {
        console.log(`Modal::render()`);
        return this.props.open ? (
                <div>
                <div className="modal-background" />
                <div role="dialog" className="modal-dialog">{this.props.children}</div>
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
